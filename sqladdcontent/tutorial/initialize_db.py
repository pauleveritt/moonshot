import os
import sys
import transaction

from sqlalchemy import engine_from_config
from pyramid.config import Configurator
from pyramid_sqlalchemy import Session
from pyramid.paster import (
    get_appsettings,
    setup_logging,
    )

from .models.sqltraversal import BaseObject

from .models.site import (
    Document,
    Folder,
    )


def usage(argv):
    cmd = os.path.basename(argv[0])
    print('usage: %s <config_uri>\n'
          '(example: "%s development.ini")' % (cmd, cmd))
    sys.exit(1)



def main(argv=sys.argv):
    if len(argv) != 2:
        usage(argv)
    config_uri = argv[1]
    setup_logging(config_uri)
    settings = get_appsettings(config_uri)
    config = Configurator(settings=settings)
    config.include('pyramid_sqlalchemy')
    config.include('pyramid_tm')

    engine = engine_from_config(settings, 'sqlalchemy.')
    BaseObject.metadata.create_all(engine)

    with transaction.manager:
        root = Folder(name='', title='My SQLTraversal Root')
        Session.add(root)
        f1 = root['f1'] = Folder(title='Folder 1')
        f1['da'] = Document(title='Document A')
