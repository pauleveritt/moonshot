from pyramid.events import NewRequest


def add_cors_callback(event):
    headers = "Origin, Content-Type, Accept, Authorization"

    def cors_headers(request, response):
        # if 'static' not in request.url:
        #     print "CORS", request.url, request.client_addr
        response.headers.update({
            # In production you would be careful with this
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": headers
        })

    event.request.add_response_callback(cors_headers)


class logger_tween_factory(object):
    def __init__(self, handler, registry):
        self.handler = handler
        self.registry = registry

    def __call__(self, request):
        response = self.handler(request)
        if 'static' not in request.url and '?oauth_token' in request.url:
            print "####\n", request.url, "\n####", response

        return response

def cache_callback(request, response):
    """Set the cache_control max_age for the response"""
    if request.exception is not None:
        response.cache_control.max_age = 360


def includeme(config):
    config.add_subscriber(add_cors_callback, NewRequest)
    # request.add_response_callback(cache_callback)
    config.add_tween('.subscribers.logger_tween_factory')

