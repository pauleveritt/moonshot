import os
import sys
import transaction

from pyramid.paster import get_appsettings
from pyramid.config import Configurator
from pyramid_sqlalchemy import Session
from sqlalchemy import engine_from_config

from moonrock.models.users import (
    BaseObject,
    User,
    USERS
)
from ..models.folder import Folder


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
        root = Folder(name='', title='My SQLTraversal Root')
        Session.add(root)
        for user in USERS:
            model = User(id=user['id'],
                         username=user['username'],
                         email=user['email'],
                         first_name=user['first_name'],
                         last_name=user['last_name'],
                         twitter=user['twitter'],
                         password=user['password'],
                         groups=user['groups'])
            Session.add(model)


