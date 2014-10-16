from pyramid.events import NewRequest


class LoggerTweenFactory(object):
    def __init__(self, handler, registry):
        self.handler = handler
        self.registry = registry

    def __call__(self, request):
        response = self.handler(request)
        if 'static' not in request.url and '?oauth_token' in request.url:
            print("####\n", request.url, "\n####", response)

        return response


def add_cors_headers_response_callback(event):
    def cors_headers(request, response):
        response.headers.update({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST,GET,DELETE,PUT,OPTIONS',
            'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Authorization',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Max-Age': '1728000',
        })

    event.request.add_response_callback(cors_headers)


def includeme(config):
    config.add_tween('.subscribers.LoggerTweenFactory')
    config.add_subscriber(add_cors_headers_response_callback, NewRequest)

