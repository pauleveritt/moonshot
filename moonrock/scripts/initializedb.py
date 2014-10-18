import os
import sys
import transaction

from pyramid.paster import get_appsettings
from pyramid.config import Configurator
from pyramid_sqlalchemy import Session
from sqlalchemy import engine_from_config

from ..models.users import (
    BaseObject,
    User
    )

USERS = [
    # Twitter usernames
    dict(
        id=1,
        username='pauleveritt',
        email='p@x.com',
        first_name='Firstie',
        last_name='Lastie',
        twitter='paulweveritt',
        password='password'
    ),
    dict(
        id=2,
        username='stormfburg',
        email='p@x.com',
        first_name='STORM',
        last_name='Fburg',
        twitter='stormfburg',
        password='password'
    ),
    dict(
        id=3,
        username='chrismcdonough',
        email='p2@x.com',
        first_name='Firstie',
        last_name='Lastie',
        twitter='chrismcdonough',
        password='password'
    ),
    dict(
        id=4,
        username='blaflamme',
        email='p2@x.com',
        first_name='Firstie',
        last_name='Lastie',
        twitter='blaiselaflamme',
        password='password'
    ),
    dict(
        id=5,
        username='davidemoro',
        email='p2@x.com',
        first_name='Firstie',
        last_name='Lastie',
        twitter='davidemoro',
        password='password'
    )
]

def usage(argv):
    cmd = os.path.basename(argv[0])
    print('usage: %s <config_uri>\n'
          '(example: "%s development.ini")' % (cmd, cmd))
    sys.exit(1)


def main(argv=sys.argv):
    config_uri = argv[1]
    settings = get_appsettings(config_uri)
    config = Configurator(settings=settings)
    config.include('pyramid_sqlalchemy')
    engine = engine_from_config(settings, 'sqlalchemy.')
    BaseObject.metadata.create_all(engine)
    with transaction.manager:
        for user in USERS:
            model = User(id = user['id'],
                         username=user['username'],
                         email=user['email'],
                         first_name=user['first_name'],
                         twitter=user['twitter'],
                         password=user['password'])
            Session.add(model)


