from pyramid.view import view_config

from .users import get_user, USERS


class MySite:
    def __init__(self, request):
        self.request = request

    # Routes
    @view_config(route_name='profile', renderer='json', permission='view')
    def profile(self):
        userid = self.request.authenticated_userid
        user = get_user('id', userid)
        return dict(user=user)


    @view_config(route_name='users', renderer='json', permission='view')
    def users_view(self):
        return dict(data=USERS)

    @view_config(route_name='ok', renderer='json')
    def ok_view(self):
        return dict(ok='OK')

