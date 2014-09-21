from pyramid.events import NewRequest


def add_cors_callback(event):
    headers = "Origin, Content-Type, Accept, Authorization"

    def cors_headers(request, response):
        if 'static' not in request.url:
            print "CORS", request.url, request.client_addr
        response.headers.update({
            # In production you would be careful with this
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": headers
        })

    event.request.add_response_callback(cors_headers)


def includeme(config):
    config.add_subscriber(add_cors_callback, NewRequest)

