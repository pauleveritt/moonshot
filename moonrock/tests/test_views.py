import unittest
from pyramid import testing

class UserViewTests(unittest.TestCase):

    def setUp(self):
        self.config = testing.setUp()

    def tearDown(self):
        testing.tearDown()

    def test_user_view(self):
        """ For a given resource and request,
            it should return a dict with the user
            specified on the resource item.
        """
        from ..views import user_view
        request = testing.DummyRequest()

        class MockResource:
            def __init__(self, user):
                self.user = user
        mock_resource = MockResource('test')

        info = user_view(mock_resource, request)
        self.assertEqual(info['data'], 'test')
