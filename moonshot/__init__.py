from pyramid.config import Configurator


def main(global_config, **settings):
    config = Configurator(settings=settings)

    config.add_route('auth_twitter', '/auth/twitter')
    config.add_route('profile', '/api/me')
    config.scan('.views')
    config.include('.subscribers')

    config.add_static_view(name='/', path='moonshot:../dist')

    return config.make_wsgi_app()

