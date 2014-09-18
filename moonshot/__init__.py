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
    config = Configurator(settings=settings)
    config.include('pyramid_sqlalchemy')
    config.add_route('auth_twitter', '/auth/twitter')
    config.add_route('api_me', '/api/me')
    config.add_route('users', '/api/users')
    config.add_static_view(name='/', path='../_build')
    config.add_subscriber(add_cors_callback, NewRequest)
    config.scan('.')

    logging.config.fileConfig(settings['logging.config'],
                              disable_existing_loggers=False)

    return config.make_wsgi_app()


