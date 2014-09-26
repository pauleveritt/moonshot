from os.path import join
from pyramid.config import Configurator
from pyramid.compat import configparser

from wsgicors import CORS


def main(global_config, **settings):
    # Load up custom settings from the twitter.ini file
    fn = join(global_config['here'], 'twitter.ini')
    parser = configparser.ConfigParser()
    parser.read(fn)
    for k, v in parser.items('twitter:settings'):
        settings['twitter:settings:' + k] = v

    config = Configurator(settings=settings)

    config.add_route('auth_twitter', '/auth/twitter')
    config.add_route('profile', '/api/me')
    config.scan('.views')
    config.include('.subscribers')

    config.add_static_view(name='/', path='moonshot:../dist')

    return CORS(config.make_wsgi_app(), headers="*", methods="*",
                maxage="180", origin="copy")
