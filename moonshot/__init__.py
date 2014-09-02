from pyramid.config import Configurator

import logging

def main(global_config, **settings):
    config = Configurator(settings=settings)
    config.include('pyramid_sqlalchemy')
    config.include('pyramid_jinja2')
    config.add_route('auth_twitter', '/auth/twitter')
    config.add_route('api_me', '/api/me')
    config.add_static_view(name='/', path='../dist')
    config.scan('.')

    logging.config.fileConfig(settings['logging.config'],
                              disable_existing_loggers=False)

    return config.make_wsgi_app()


