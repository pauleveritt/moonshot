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
    userid = Column(String(20), unique=True)
    username = Column(String(120), unique=True)
    email = Column(String(120))
    first_name = Column(String(120))
    last_name = Column(String(120))
    twitter = Column(String(120))
    password = Column(String(120))

    def __repr__(self):
        return "<User(id=%d, username='%s')>" % (self.id, self.username)
