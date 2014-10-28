"""
Fork of rest_toolkit.ext.sql to change some of the defaults
"""
import abc

from rest_toolkit.ext.sql import SQLResource


class MoonSQLResource(SQLResource):
    """Base class for resources based on SQLAlchemy ORM models.
    """

    @abc.abstractproperty
    def toplevel_key(self):
        """JSON key name to put the data in
        """
        raise NotImplemented()

    @property
    def userid(self):
        return int(self.request.authenticated_userid)

    def to_dict(self):
        data = super(MoonSQLResource, self).to_dict()
        return {self.toplevel_key: data}