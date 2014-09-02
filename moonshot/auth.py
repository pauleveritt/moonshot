"""
Views and helpers for JWT+Twitter.
"""

from datetime import (
    datetime,
    timedelta
)

from pyramid.httpexceptions import HTTPUnauthorized
import jwt

TOKEN_SECRET = 'keyboard cat'


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


def decode_header(auth):
    token = auth.split()[1]
    payload = jwt.decode(token, TOKEN_SECRET)
    if datetime.fromtimestamp(payload['exp']) < datetime.now():
        raise HTTPUnauthorized(detail='Token has expired')
    return