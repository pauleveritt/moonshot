import jwt
from sqlalchemy.orm.exc import NoResultFound
from datetime import datetime, timedelta

from pyramid.authentication import CallbackAuthenticationPolicy
from pyramid.interfaces import IAuthenticationPolicy
from pyramid_sqlalchemy import Session
from zope.interface import implementer

from .models.users import User


# Helper Functions
def create_jwt_token(user, token_secret):
    payload = dict(
        iat=datetime.now(),
        exp=datetime.now() + timedelta(days=14),
        user=dict(
            _id=user.id,
            username=user.username,
            first_name=user.first_name,
            last_name=user.last_name,
            twitter=user.twitter))
    bytes_token = jwt.encode(payload, token_secret)
    token = bytes_token.decode('utf-8')
    return token


@implementer(IAuthenticationPolicy)
class JWTAuthenticationPolicy(CallbackAuthenticationPolicy):
    def __init__(self, token_secret, callback=None):
        self.token_secret = token_secret
        self.callback = callback

    def remember(self, request, principal, **kw):
        """ A no-op. JWT authentication does not provide a protocol for
        remembering the user. Credentials are sent on every request.
        """
        return []

    def forget(self, request):
        """ A no-op. JWT authentication does not provide a protocol for
        forgetting the token. Client is responsible for that..
        """
        return []

    def unauthenticated_userid(self, request):
        authorization = request.headers.get('Authorization')
        if not authorization:
            return None
        try:
            authmeth, encoded_token = authorization.split(' ', 1)
        except ValueError: # not enough values to unpack
            return None
        if authmeth.lower() != 'bearer':
            return None

        token = encoded_token
        try:
            payload = jwt.decode(token, self.token_secret)
        except jwt.DecodeError: # can't decode
            return None

        try:
            return payload['user']['_id']
        except KeyError:
            return None


def groupfinder(username, request):
    groups = []
    try:
        user = Session.query(User).filter(User.username == username).one()
    except NoResultFound:
        pass
    else:
        groups = user.groups
    return groups
