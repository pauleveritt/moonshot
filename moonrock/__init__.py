from pyramid.config import Configurator
from pyramid.authorization import ACLAuthorizationPolicy
from .security import groupfinder
from .models.sqltraversal import root_factory


def main(global_config, **settings):
    from .security import JWTAuthenticationPolicy

    config = Configurator(settings=settings,
                          root_factory=root_factory)
    config.set_authentication_policy(
        JWTAuthenticationPolicy(settings['TOKEN_SECRET'],
                                callback=groupfinder)
    )
    config.set_authorization_policy(ACLAuthorizationPolicy())
    config.include('.views')
    config.include('.auth')
    config.include('.subscribers')

    config.include('pyramid_tm')
    config.include('pyramid_sqlalchemy')

    config.add_static_view(name='/', path='moonrock:../dist')

    return config.make_wsgi_app()
