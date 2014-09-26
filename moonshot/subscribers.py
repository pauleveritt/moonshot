class logger_tween_factory(object):
    def __init__(self, handler, registry):
        self.handler = handler
        self.registry = registry

    def __call__(self, request):
        response = self.handler(request)
        if 'static' not in request.url and '?oauth_token' in request.url:
            print "####\n", request.url, "\n####", response

        return response


def includeme(config):
    config.add_tween('.subscribers.logger_tween_factory')

