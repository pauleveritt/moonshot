from urlparse import parse_qsl
from urllib import urlencode

from pyramid.httpexceptions import HTTPFound
from pyramid.interfaces import IAuthenticationPolicy

from sqlalchemy import (
    Column,
    Integer,
    String,
)
from pyramid_sqlalchemy import (
    BaseObject,
    Session
)

import requests
from requests_oauthlib import OAuth1

request_token_url = 'https://api.twitter.com/oauth/request_token'
access_token_url = 'https://api.twitter.com/oauth/access_token'
authenticate_url = 'https://api.twitter.com/oauth/authenticate'


class User(BaseObject):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    userid = Column(String(20), unique=True)
    email = Column(String(120), unique=True)
    password = Column(String(120))
    first_name = Column(String(120))
    last_name = Column(String(120))
    twitter = Column(String(20))
    group = Column(String(40))

    def __init__(self, userid=None, email=None, first_name=None,
                 last_name=None, twitter=None, group=None):
        self.userid = userid
        self.first_name = first_name
        self.last_name = last_name
        self.twitter = twitter
        self.group = group
        if email:
            self.email = email.lower()

    def __json__(self, request):
        return dict(
            userid=self.userid,
            first_name=self.first_name,
            last_name=self.last_name
        )

def groupfinder(userid, request):
    user = Session.query(User).filter(User.userid == userid)
    if user:
        return user.group


def get_policy(registry):
    return registry.queryUtility(IAuthenticationPolicy)


def auth_twitter_start(request):
    registry = request.registry
    settings = registry.settings
    policy = get_policy(registry)

    if request.params.get('oauth_token') and request.params.get(
            'oauth_verifier'):
        auth = OAuth1(settings['TWITTER_CONSUMER_KEY'],
                      client_secret=settings['TWITTER_CONSUMER_SECRET'],
                      resource_owner_key=request.params.get(
                          'oauth_token'),
                      verifier=request.params.get('oauth_verifier'))
        r = requests.post(access_token_url, auth=auth)
        profile = dict(parse_qsl(r.text))
        screen_name = profile['screen_name']
        claim = dict(sub=screen_name)
        token = policy.encode_jwt(registry, claim)
        return dict(token=token)
    else:
        oauth = OAuth1(settings['TWITTER_CONSUMER_KEY'],
                       client_secret=settings['TWITTER_CONSUMER_SECRET'],
                       callback_uri=settings['TWITTER_CALLBACK_URL'])
        r = requests.post(request_token_url, auth=oauth)
        oauth_token = dict(parse_qsl(r.text))
        qs = urlencode(dict(oauth_token=oauth_token['oauth_token']))
        raise HTTPFound(location=authenticate_url + '?' + qs)


def includeme(config):
    config.include('pyramid_jwtauth')
    config.add_route('auth_twitter', '/auth/twitter')
    config.add_view(auth_twitter_start, route_name='auth_twitter',
                    renderer='json')
