from sqlalchemy.orm import Query
from pyramid.security import Authenticated
from pyramid.view import (
    view_config,
    view_defaults
)

from rest_toolkit import resource
from rest_toolkit.abc import ViewableResource

from pyramid_sqlalchemy import Session

from .models.users import User

# Don't delete this...we have some kind of eager loading on
# polymorphic identity tht causes an error if Folder is not imported.
from .models.site import Folder, Document

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


#
# Traversal
#
@view_defaults(route_name='traverse', renderer='json', context=Folder)
class FolderViews:
    def __init__(self, context, request):
        self.context = context
        self.request = request

    @view_config()
    def default_view(self):
        parents = ['a', 'b']
        response = dict(
            schema='some_schema',
            data=dict(
                context=self.context,
                viewName='default',
                parents=parents
            )
        )
        print('\n ## Response', response)
        return response

    @view_config(name='history')
    def history_view(self):
        history = [1, 2, 3]
        parents = ['a', 'b']
        response = dict(
            schema='some_schema',
            data=dict(
                context=self.context,
                parents=parents,
                view=dict(
                    history=history
                )
            )
        )
        return response


def includeme(config):
    config.add_route('traverse', '/api/root/*traverse')
    config.scan('.views')