from sqlalchemy.schema import Column
from sqlalchemy.types import (
    Integer,
    String,
    )
from sqlalchemy import Sequence
from pyramid_sqlalchemy import BaseObject

class User(BaseObject):
    __tablename__ = 'users'

    id = Column(Integer(),
                Sequence('user_id_seq'),
                primary_key = True)
    username = Column(String(255))
    email = Column(String(255))
    first_name = Column(String(255))
    last_name = Column(String(255))
    twitter = Column(String(255))
    password = Column(String(255))

    def __repr__(self):
        return "<User(id=%d, username='%s')>" % (self.id, self.username)
