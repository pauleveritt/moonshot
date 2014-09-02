from sqlalchemy import (
    Column,
    Integer,
    String,
)
from pyramid_sqlalchemy import BaseObject


class User(BaseObject):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    email = Column(String(120), unique=True)
    password = Column(String(120))
    first_name = Column(String(120))
    last_name = Column(String(120))
    twitter = Column(String(120))

    def __init__(self, email=None, first_name=None, last_name=None,
                 twitter=None):
        if email:
            self.email = email.lower()
        if first_name:
            self.first_name = first_name
        if last_name:
            self.last_name = last_name
        if twitter:
            self.twitter = twitter
