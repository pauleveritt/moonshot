from pyramid.security import Authenticated

from rest_toolkit import resource

from .users import get_user, USERS


@resource('/api/me')
class ProfileResource(object):
    __acl__ = (('Allow', Authenticated, 'view'),)

    def __init__(self, request):
        pass


@ProfileResource.GET(permission='view')
def profile_view(resource, request):
    userid = request.authenticated_userid
    user = get_user('_id', userid)
    return dict(user=user)


@resource('/api/users')
class UsersResource(object):
    __acl__ = (('Allow', Authenticated, 'view'),)

    def __init__(self, request):
        pass


@UsersResource.GET(permission='view')
def users_view(resource, request):
    return dict(data=USERS)


@resource('/api/users/{id:\d+}')
class UserResource(object):
    __acl__ = (('Allow', Authenticated, 'view'),)

    def __init__(self, request):
        user_id = request.matchdict['id']
        if user_id:
            self.user = get_user('_id', int(user_id))
        if self.user is None:
            raise KeyError('Unknown user id')


@UserResource.GET(permission='view')
def user_view(resource, request):
    return dict(data=resource.user)


def includeme(config):
    config.scan('.views')