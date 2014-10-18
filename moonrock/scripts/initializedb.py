import os
import sys
import transaction

from pyramid.paster import get_appsettings
from pyramid.config import Configurator
from pyramid_sqlalchemy import Session
from sqlalchemy import engine_from_config

from ..users import USERS
from ..models.users import (
    BaseObject,
    User
    )

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
            model = User(username=user['username'],
                         email=user['email'],
                         first_name=user['first_name'],
                         twitter=user['twitter'],
                         password=user['password'])
            Session.add(model)


