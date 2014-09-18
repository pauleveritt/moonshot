from pyramid.view import view_config

from pyramid_sqlalchemy import Session

from .security import User


class MyViews:
    def __init__(self, request):
        self.request = request

    @view_config(route_name='api_me', renderer='json')
    def api_me(self):
        userid = self.request.unauthenticated_userid
        user = Session.query(User).filter(User.userid == userid).first()
        return dict(user=user)


def includeme(config):
    config.add_route('api_me', '/api/me')
    config.scan()