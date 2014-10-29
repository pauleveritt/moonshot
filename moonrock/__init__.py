from pyramid.config import Configurator
from pyramid.authorization import ACLAuthorizationPolicy

from .models.sqltraversal import root_factory
from .security import groupfinder


def main(global_config, **settings):
    config = Configurator(settings=settings,
                          root_factory=root_factory)
    config.include('pyramid_tm')
    config.include('pyramid_sqlalchemy')
    config.include('pyramid_jinja2')

    # Wire up security policy
    from moonrock.security import JWTAuthenticationPolicy

    config.set_authentication_policy(
        JWTAuthenticationPolicy(settings['TOKEN_SECRET'],
                                callback=groupfinder)
    )
    config.set_authorization_policy(ACLAuthorizationPolicy())
    config.include('.auth')
    config.include('.subscribers')

    config.scan('.views')
    config.add_static_view(name='/', path='moonrock:../dist')

    return config.make_wsgi_app()
