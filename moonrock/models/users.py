from sqlalchemy.schema import Column
from sqlalchemy.types import (
    Integer,
    String,
)
from sqlalchemy import Sequence
from pyramid_sqlalchemy import BaseObject

from . import ArrayType

groups = ['moonrock.Users']

USERS = [
    # Twitter usernames
    dict(
        id=1,
        username='pauleveritt',
        email='p@x.com',
        first_name='Firstie',
        last_name='Lastie',
        twitter='paulweveritt',
        password='password',
        groups=groups
    ),
    dict(
        id=2,
        username='stormfburg',
        email='p@x.com',
        first_name='STORM',
        last_name='Fburg',
        twitter='stormfburg',
        password='password',
        groups=groups
    ),
    dict(
        id=3,
        username='chrismcdonough',
        email='p2@x.com',
        first_name='Firstie',
        last_name='Lastie',
        twitter='chrismcdonough',
        password='password',
        groups=groups
    ),
    dict(
        id=4,
        username='blaflamme',
        email='p2@x.com',
        first_name='Firstie',
        last_name='Lastie',
        twitter='blaiselaflamme',
        password='password',
        groups=groups
    ),
    dict(
        id=5,
        username='davidemoro',
        email='p2@x.com',
        first_name='Firstie',
        last_name='Lastie',
        twitter='davidemoro',
        password='password',
        groups=groups
    )
]


class User(BaseObject):
    __tablename__ = 'users'

    id = Column(Integer,
                Sequence('user_id_seq'),
                primary_key=True)
    userid = Column(String(20), unique=True)
    username = Column(String(120), unique=True)
    email = Column(String(120))
    first_name = Column(String(120))
    last_name = Column(String(120))
    twitter = Column(String(120))
    password = Column(String(120))
    groups = Column(ArrayType)

    def __repr__(self):
        return "<User(id=%d, username='%s')>" % (self.id, self.username)

    def __json__(self, request):
        return dict(
            id=self.id,
            userid=self.userid,
            first_name=self.first_name,
            last_name=self.last_name,
            twitter=self.twitter,
            email=self.email
        )

