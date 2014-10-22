from pyramid.security import (
    Allow,
    Everyone,
    )

class RootFactory(object):
    # TODO: make __acl__ dynamic 
    __acl__ = [ (Allow, Everyone, 'view'),
                (Allow, 'group:editors', 'edit') ]

    def __init__(self, request):
        pass
