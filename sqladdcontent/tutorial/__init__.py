from pyramid.config import Configurator

from moonrock.models.sqltraversal import (
    root_factory
)


def main(global_config, **settings):
    config = Configurator(settings=settings,
                          root_factory=root_factory)
    config.include('pyramid_tm')
    config.include('pyramid_sqlalchemy')
    config.include('pyramid_jinja2')

    config.scan('.views')
    return config.make_wsgi_app()
