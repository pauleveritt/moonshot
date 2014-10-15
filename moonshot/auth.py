"""
Authentication schemes for Moonshot:

- Username/password
- Twitter
"""

import requests
from requests_oauthlib import OAuth1

from pyramid.httpexceptions import HTTPFound, HTTPUnauthorized

from urllib.parse import parse_qsl
from urllib.parse import urlencode

from .users import get_user
from .security import create_jwt_token

from rest_toolkit import resource


@resource('/api/auth/login')
class LoginResource:
    def __init__(self, request):
        pass


@LoginResource.POST()
def login_resource(resource, request):
    settings = request.registry.settings
    token_secret = settings.get('TOKEN_SECRET')
    username = request.json_body.get('username')
    password = request.json_body.get('password')
    user = get_user('id', username)
    if user:
        user_password = user.get('password')
        if user_password and user_password == password:
            token = create_jwt_token(user, token_secret)
            return dict(token=token)

    # Otherwise bail out with an HTTP exception
    raise HTTPUnauthorized(detail='Invalid username or password')


@resource('/api/auth/twitter')
class TwitterResource:
    request_token_url = 'https://api.twitter.com/oauth/request_token'
    access_token_url = 'https://api.twitter.com/oauth/access_token'
    authenticate_url = 'https://api.twitter.com/oauth/authenticate'

    def __init__(self, request):
        self.request = request
        settings = request.registry.settings
        self.consumer_key = settings.get('TWITTER_CONSUMER_KEY')
        self.client_secret = settings.get('TWITTER_CONSUMER_SECRET')
        self.callback_uri = settings.get('TWITTER_CALLBACK_URL')
        self.token_secret = settings.get('TOKEN_SECRET')


@TwitterResource.GET()
def twitter_get_url(resource, request):
    """Step 1 of OAuth1 dance"""

    oauth = OAuth1(resource.consumer_key,
                   client_secret=resource.client_secret,
                   callback_uri=resource.callback_uri)
    r = requests.post(resource.request_token_url, auth=oauth)
    oauth_token = dict(parse_qsl(r.text))
    qs = urlencode(dict(oauth_token=oauth_token['oauth_token']))
    url = resource.authenticate_url + '?' + qs
    return HTTPFound(location=url)


@TwitterResource.GET(request_param=['oauth_token', 'oauth_verifier'])
def twitter_process_params(resource, request):
    """Step 2 of OAuth1 dance"""

    auth = OAuth1(resource.consumer_key,
                  client_secret=resource.client_secret,
                  resource_owner_key=request.params.get(
                      'oauth_token'),
                  verifier=request.params.get('oauth_verifier'))
    r = requests.post(resource.access_token_url, auth=auth)
    profile = dict(parse_qsl(r.text))

    user = get_user('twitter', profile['screen_name'])

    token = create_jwt_token(user, resource.token_secret)
    return dict(token=token)


def includeme(config):
    config.scan('.auth')