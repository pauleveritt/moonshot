import os
import sys
import transaction

from pyramid.paster import get_appsettings
from pyramid.config import Configurator
from pyramid_sqlalchemy import Session
from sqlalchemy import engine_from_config

from .security import (
    BaseObject,
    User
)


def usage(argv):
    cmd = os.path.basename(argv[0])
    print('usage: %s <config_uri>\n'
          '(example: "%s development.ini")' % (cmd, cmd))
    sys.exit(1)


sample_users = [
    ('paulweveritt', 'Paul', 'Everitt', 'paul@x.com', 'paulweveritt',
     'editor'),
    ('stormfburg', 'STORM', 'Fredericksburg', 'storm@x.com',
     'stormfburg', 'viewer')
]


def main(argv=sys.argv):
    config_uri = argv[1]
    settings = get_appsettings(config_uri)
    config = Configurator(settings=settings)
    config.include('pyramid_sqlalchemy')
    engine = engine_from_config(settings, 'sqlalchemy.')
    BaseObject.metadata.create_all(engine)
    with transaction.manager:
        for user in sample_users:
            model = User(userid=user[0], first_name=user[1],
                         last_name=user[2], email=user[3],
                         twitter=user[4], group=user[5])
            Session.add(model)
