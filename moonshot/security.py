import jwt

from pyramid.authentication import CallbackAuthenticationPolicy
from pyramid.interfaces import IAuthenticationPolicy
from zope.interface import implementer

@implementer(IAuthenticationPolicy)
class JWTAuthenticationPolicy(CallbackAuthenticationPolicy):
    def __init__(self, token_secret):
        self.token_secret = token_secret

    def remember(self, request, principal, **kw):
        """ A no-op. JWT authentication does not provide a protocol for
        remembering the user. Credentials are sent on every request.
        """
        return []

    def forget(self, request):
        """ Returns challenge headers. This should be attached to a response
        to indicate that credentials are required."""
        raise NotImplementedError

    def callback(self, username, request):
        return ['moonshot.Users']

    def unauthenticated_userid(self, request):
        authorization = request.headers.get('Authorization')
        if not authorization:
            return None
        try:
            authmeth, token = authorization.split(' ', 1)
        except ValueError: # not enough values to unpack
            return None
        if authmeth.lower() != 'bearer':
            return None

        try:
            payload = jwt.decode(token, self.token_secret)
        except jwt.DecodeError: # can't decode
            return None

        try:
            return payload['user']['id']
        except KeyError:
            return None
