from pyramid.security import Authenticated

from rest_toolkit import resource
from rest_toolkit.abc import ViewableResource

from pyramid_sqlalchemy import Session
from .models.users import User


@resource('/api/me', read_permission='view')
class ProfileResource(ViewableResource):
    __acl__ = (('Allow', Authenticated, 'view'),)

    def __init__(self, request):
        userid = request.authenticated_userid
        self.user = Session.query(User).filter(User.id == userid).one()

    def to_dict(self):
        return dict(user=self.user)


@resource('/api/users', read_permission='view')
class UsersResource(ViewableResource):
    __acl__ = (('Allow', Authenticated, 'view'),)

    def __init__(self, request):
        self.users = Session.query(User).all()

    def to_dict(self):
        def dictify(elem):
            return dict(id=elem.id,
                        username=elem.username,
                        email=elem.email,
                        first_name=elem.first_name,
                        last_name=elem.last_name,
                        twitter=elem.twitter,
                        password=elem.password,
            )

        return dict(data=[dictify(user) for user in self.users])


@resource('/api/users/{id:\d+}', read_permission='view')
class UserResource(ViewableResource):
    __acl__ = (('Allow', Authenticated, 'view'),)

    def __init__(self, request):
        user_id = request.matchdict['id']
        if user_id:
            self.user = Session.query(User).filter(
                User.id == int(user_id)).one()
        if self.user is None:
            raise KeyError('Unknown user id')

    def to_dict(self):
        return dict(data=self.user)


def includeme(config):
    config.scan('.views')
