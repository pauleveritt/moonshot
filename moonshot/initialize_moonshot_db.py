import os
import sys
import transaction

from pyramid.paster import get_appsettings
from .models import (
    BaseObject,
    User
)

def usage(argv):
    cmd = os.path.basename(argv[0])
    print('usage: %s <config_uri>\n'
          '(example: "%s development.ini")' % (cmd, cmd))
    sys.exit(1)


from pyramid.config import Configurator
from pyramid_sqlalchemy import Session
from sqlalchemy import engine_from_config


def main(argv=sys.argv):
    config_uri = argv[1]
    settings = get_appsettings(config_uri)
    config = Configurator(settings=settings)
    config.include('pyramid_sqlalchemy')
    engine = engine_from_config(settings, 'sqlalchemy.')
    BaseObject.metadata.create_all(engine)
    with transaction.manager:
        model = User(first_name='Root', last_name='User')
        Session.add(model)
