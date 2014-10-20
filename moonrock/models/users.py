from sqlalchemy.schema import Column
from sqlalchemy.types import (
    Integer,
    String,
    TypeDecorator,
    )
from sqlalchemy import Sequence
from pyramid_sqlalchemy import BaseObject
import json

class ArrayType(TypeDecorator):
    """ Sqlite-like does not support arrays.
        Let's use a custom type decorator.

        See http://docs.sqlalchemy.org/en/latest/core/types.html#sqlalchemy.types.TypeDecorator
    """
    impl = String

    def process_result_value(self, value, dialect):
        return json.loads(value)

    def copy(self):
        return ArrayType(self.impl.length)

class User(BaseObject):
    __tablename__ = 'users'

    id = Column(Integer(),
                Sequence('user_id_seq'),
                primary_key = True)
    userid = Column(String(20), unique=True)
    username = Column(String(120), unique=True)
    email = Column(String(120))
    first_name = Column(String(120))
    last_name = Column(String(120))
    twitter = Column(String(120))
    password = Column(String(120))
    groups = Column(ArrayType())

    def __repr__(self):
        return "<User(id=%d, username='%s')>" % (self.id, self.username)

    def __json__(self, request):
        return dict(
                    id = self.id,
                    userid=self.userid,
                    first_name=self.first_name,
                    last_name=self.last_name,
                    twitter=self.twitter,
                    email=self.email
                   )

