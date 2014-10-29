from sqlalchemy.orm import Query
from pyramid.security import Authenticated

from rest_toolkit import resource
from rest_toolkit.abc import ViewableResource

from pyramid_sqlalchemy import Session

from .models.users import User
from moonrock.models.site import (
    Folder,
    Document
)

from .rest_ext import MoonSQLResource


@resource('/api/me', read_permission='view')
class ProfileResource(MoonSQLResource, ViewableResource):
    __acl__ = (('Allow', Authenticated, 'view'),)

    @property
    def context_query(self):
        return Query(User).filter(User.id == self.userid)


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
class UserResource(MoonSQLResource, ViewableResource):
    __acl__ = (('Allow', Authenticated, 'view'),)

    @property
    def context_query(self):
        return Query(User).filter(User.id == self.userid)

from pyramid.response import Response
from pyramid.view import view_config

@view_config(name='foo')
def foo_view(context, request):
    return Response(body='<h1>Response</h1>')

# def includeme(config):
#     config.scan('.views')
