from datetime import datetime, timedelta
# from urllib.parse import (
# parse_qsl,
#     urlencode
# )

from urlparse import parse_qsl
from urllib import urlencode

import jwt
import requests
from requests_oauthlib import OAuth1

from pyramid.view import view_config
from pyramid.httpexceptions import (
    HTTPUnauthorized,
    HTTPFound
)
from pyramid_sqlalchemy import Session

from .models import User

import logging

log = logging.getLogger(__name__)

DEBUG = True
TOKEN_SECRET = 'keyboard cat'
TWITTER_CONSUMER_KEY = 'eAhM1uRJ0beGYohmqSeMntoH9'
TWITTER_CONSUMER_SECRET = '8WASpTKIJILtEpboiHLd4c3NaKufcl5pWMLvKu7jKHqCcTkl6i'
TWITTER_CALLBACK_URL = 'http://127.0.0.1:3000'
SQLALCHEMY_DATABASE_URI = 'sqlite:///app.db'


def create_jwt_token(user):
    payload = dict(
        iat=datetime.now(),
        exp=datetime.now() + timedelta(days=7),
        user=dict(
            id=user.id,
            email=user.email,
            first_name=user.first_name,
            last_name=user.last_name,
            twitter=user.twitter))
    token = jwt.encode(payload, TOKEN_SECRET)
    return token


class MyViews:
    def __init__(self, request):
        self.request = request
        self.user = None
        self.User = Session.query(User)

        if request.matched_route.name != 'auth_twitter':
            # Enforce the authentication and collect some information

            if not request.headers.get('Authorization'):
                raise HTTPUnauthorized(
                    detail='Missing authorization header')

            auth = request.headers.get('Authorization')
            token = auth.split()[1]
            payload = jwt.decode(token, TOKEN_SECRET)
            if datetime.fromtimestamp(payload['exp']) < datetime.now():
                raise HTTPUnauthorized(detail='Token has expired')
            self.user = payload['user']

    @view_config(route_name='auth_twitter', renderer='json')
    def twitter(self):
        log.debug('In /auth/twitter')
        request = self.request
        request_token_url = 'https://api.twitter.com/oauth/request_token'
        access_token_url = 'https://api.twitter.com/oauth/access_token'
        authenticate_url = 'https://api.twitter.com/oauth/authenticate'

        if request.params.get('oauth_token') and request.params.get(
                'oauth_verifier'):
            auth = OAuth1(TWITTER_CONSUMER_KEY,
                          client_secret=TWITTER_CONSUMER_SECRET,
                          resource_owner_key=request.params.get(
                              'oauth_token'),
                          verifier=request.params.get('oauth_verifier'))
            r = requests.post(access_token_url, auth=auth)
            profile = dict(parse_qsl(r.text))
            profile_id = profile['user_id']

            user = self.User.filter_by(twitter=profile['user_id']).first()
            print ("User", profile_id, user)
            if user:
                token = create_jwt_token(user)
                return dict(token=token)
            u = User(twitter=profile['user_id'],
                     first_name=profile['screen_name'])
            Session.add(u)
            token = create_jwt_token(u)
            return dict(token=token)
        else:
            oauth = OAuth1(TWITTER_CONSUMER_KEY,
                           client_secret=TWITTER_CONSUMER_SECRET,
                           callback_uri=TWITTER_CALLBACK_URL)
            r = requests.post(request_token_url, auth=oauth)
            oauth_token = dict(parse_qsl(r.text))
            qs = urlencode(dict(oauth_token=oauth_token['oauth_token']))
            raise HTTPFound(location=authenticate_url + '?' + qs)

    @view_config(route_name='api_me', renderer='json')
    def api_me(self):
        print ("self.user", self.user)
        return self.user

    @view_config(route_name='users', renderer='json')
    def users(self):
        users = [
            dict(id='i1', title='Milk'),
            dict(id='i2', title='Another'),
            dict(id='i3', title='Go to work'),
            dict(id='i4', title='Call home'),
            dict(id='i5', title='Mow grass'),
            dict(id='i6', title='Be lazy'),
            dict(id='i7', title='Ditt'),
        ]
        return users
