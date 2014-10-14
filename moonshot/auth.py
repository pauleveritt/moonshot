"""
Authentication schemes for Moonshot:

- Username/password
- Twitter
"""

import requests
from requests_oauthlib import OAuth1

from pyramid.httpexceptions import HTTPFound
from pyramid.view import view_config


from urllib.parse import parse_qsl
from urllib.parse import urlencode

from .users import get_user
from .security import create_jwt_token


class TwitterAuth:
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

    @view_config(route_name='auth_twitter', renderer='json')
    def twitter_get_url(self):
        """Step 1 of OAuth1 dance"""

        oauth = OAuth1(self.consumer_key,
                       client_secret=self.client_secret,
                       callback_uri=self.callback_uri)
        r = requests.post(self.request_token_url, auth=oauth)
        oauth_token = dict(parse_qsl(r.text))
        qs = urlencode(dict(oauth_token=oauth_token['oauth_token']))
        url = self.authenticate_url + '?' + qs
        return HTTPFound(location=url)

    @view_config(route_name='auth_twitter', renderer='json',
                 request_param=['oauth_token', 'oauth_verifier'])
    def twitter_process_params(self):
        """Step 2 of OAuth1 dance"""
        request = self.request

        auth = OAuth1(self.consumer_key,
                      client_secret=self.client_secret,
                      resource_owner_key=request.params.get(
                          'oauth_token'),
                      verifier=request.params.get('oauth_verifier'))
        r = requests.post(self.access_token_url, auth=auth)
        profile = dict(parse_qsl(r.text))

        user = get_user('twitter', profile['screen_name'])

        token = create_jwt_token(user, self.token_secret)
        return dict(token=token)


def includeme(config):
    config.add_route('auth_twitter', '/api/auth/twitter')
    config.scan('.auth')