from pyramid.view import view_config

from .users import USERS


class MySite:
    def __init__(self, request):
        self.request = request

    # Routes
    @view_config(route_name='profile', renderer='json', permission='view')
    def profile(self):
        twitter_name = self.request.authenticated_userid
        user = USERS.get(twitter_name)
        return dict(user=user)


    @view_config(route_name='ok', renderer='json')
    def ok_view(self):
        return dict(ok='OK')

