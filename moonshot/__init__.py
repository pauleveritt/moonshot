from pyramid.config import Configurator
from pyramid.security import Authenticated
from pyramid.authorization import ACLAuthorizationPolicy

class MyRoot(object):
    def __init__(self, request):
        self.request = request

    __acl__ = (('Allow', Authenticated, 'view'),)

def main(global_config, **settings):
    from .security import JWTAuthenticationPolicy
    config = Configurator(settings=settings, root_factory=MyRoot)
    config.set_authentication_policy(
        JWTAuthenticationPolicy(settings['TOKEN_SECRET'])
        )
    config.set_authorization_policy(ACLAuthorizationPolicy())
    config.include('.auth')

    config.add_route('profile', '/api/me')
    config.add_route('ok', '/api/ok')
    config.scan('.views')
    config.include('.subscribers')

    config.add_static_view(name='/', path='moonshot:../dist')

    return config.make_wsgi_app()
