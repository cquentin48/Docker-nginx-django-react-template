from django.http import HttpResponse
from django.test import SimpleTestCase
from django.urls import reverse

class TestView(SimpleTestCase):
    """Test view file for the user
    managment class

    """
    def test_get_all_routes_returns_every_routes(self):
        # Given
        url = "auth_routes"
        expected_body_result = [
            '/api/token',
            '/api/token/refresh',
            '/api/register',
        ]
        expected_status_code_result = 200

        # Acts
        result:HttpResponse = self.client.get(reverse(url))

        # Asserts
        self.assertTrue(result.status_code,expected_status_code_result)
        self.assertTrue(result.content,expected_body_result)
