from pyramid.view import view_config

from rest_toolkit import resource

from .users import get_user, USERS


class MySite:
    def __init__(self, request):
        self.request = request

    # Routes
    @view_config(route_name='profile', renderer='json', permission='view')
    def profile(self):
        userid = self.request.authenticated_userid
        user = get_user('_id', userid)
        return dict(user=user)


    # @view_config(route_name='users', renderer='json', permission='view')
    # def users_view(self):
    # return dict(data=USERS)


@resource('/api/users')
class UsersResource(object):
    def __init__(self, request):
        pass


@UsersResource.GET()
def users_view(resource, request):
    return dict(data=USERS)

#
# @resource('/api/users/{id:\d+}')
# class UserResource(object):
#     def __init__(self, request):
#         user_id = request.matchdict['id']
#         if user_id:
#             self.user = get_user('_id', int(user_id))
#         if self.user is None:
#             raise KeyError('Unknown user id')
#
#
# @UserResource.GET(permission='view')
# def user_view(resource, request):
#     return dict(data=resource.user)


def includeme(config):
    config.scan('.views')