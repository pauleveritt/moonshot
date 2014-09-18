from pyramid.config import Configurator
from pyramid.events import NewRequest

import logging


log = logging.getLogger(__name__)


def add_cors_callback(event):
    headers = 'Origin, Content-Type, Accept, Authorization'

    def cors_headers(request, response):
        response.headers.update({
            # In production you would be careful with this
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': headers
        })

    event.request.add_response_callback(cors_headers)


def main(global_config, **settings):
    config = Configurator(settings=settings,
                          root_factory='.resources.Root')
    config.include('pyramid_sqlalchemy')
    config.include('.security')
    config.include('.views')
    config.include('.resources')

    config.add_subscriber(add_cors_callback, NewRequest)
    config.add_static_view(name='/', path='moonshot:../_build')

    logging.config.fileConfig(settings['logging.config'],
                              disable_existing_loggers=False)

    return config.make_wsgi_app()

