from pyramid.config import Configurator
from pyramid.authorization import ACLAuthorizationPolicy


def main(global_config, **settings):
    from .security import JWTAuthenticationPolicy
    config = Configurator(settings=settings)
    config.set_authentication_policy(
        JWTAuthenticationPolicy(settings['TOKEN_SECRET'])
        )
    config.set_authorization_policy(ACLAuthorizationPolicy())
    config.include('.views')
    config.include('.auth')

    config.include('.subscribers')

    config.add_static_view(name='/', path='moonshot:../dist')

    return config.make_wsgi_app()
