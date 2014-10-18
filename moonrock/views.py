from pyramid.security import Authenticated

from rest_toolkit import resource

from pyramid_sqlalchemy import Session
from .models.users import User


@resource('/api/me')
class ProfileResource(object):
    __acl__ = (('Allow', Authenticated, 'view'),)

    def __init__(self, request):
        pass


@ProfileResource.GET(permission='view')
def profile_view(resource, request):
    userid = request.authenticated_userid
    user = Session.query(User).filter(User.id == userid).one()
    return dict(user=user)


@resource('/api/users')
class UsersResource(object):
    __acl__ = (('Allow', Authenticated, 'view'),)

    def __init__(self, request):
        pass


@UsersResource.GET(permission='view')
def users_view(resource, request):
    users = Session.query(User).all()
    def dictify(elem):
        return dict(id = elem.id,
                    username = elem.username,
                    email = elem.email,
                    first_name = elem.first_name,
                    last_name = elem.last_name,
                    twitter = elem.twitter,
                    password = elem.password,
                   )
    return dict(data=[dictify(user) for user in users])


@resource('/api/users/{id:\d+}')
class UserResource(object):
    __acl__ = (('Allow', Authenticated, 'view'),)

    def __init__(self, request):
        user_id = request.matchdict['id']
        if user_id:
            self.user = Session.query(User).filter(User.id == int(user_id)).one()
        if self.user is None:
            raise KeyError('Unknown user id')


@UserResource.GET(permission='view')
def user_view(resource, request):
    return dict(data=resource.user)


def includeme(config):
    config.scan('.views')
