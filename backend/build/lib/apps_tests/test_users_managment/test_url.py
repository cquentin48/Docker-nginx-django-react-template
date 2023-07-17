
from django.http import JsonResponse
from django.test import Client, SimpleTestCase


class URLTest(SimpleTestCase):
    """User managment URL unit test class
    """
    def build_expected_result(self, result:JsonResponse):
        """Generates the expected answer for the method `test_api`

        Returns:
            `dict[string,string]`: expected answer
        """
        base_url = result.request.get("wsgi.url_scheme")+\
            "://"+result.wsgi_request.get_host()+\
            "/api/v1/user/"
        return {
            'register':base_url+"register",
            'auth':base_url+"auth",
            'refresh_token':base_url+"auth/refresh"
        }

    def test_api(self):
        """API Unit test case for the entrypoint of
        user managment
        """

        # Given
        endpoint_url = "/api/v1/user/"
        client = Client()
        expected_result = {}

        # Acts
        result:JsonResponse = client.get(endpoint_url)
        expected_result = self.build_expected_result(result)

        # Asserts
        self.assertEqual(result.status_code,200)
        self.assertEqual(result.json(),expected_result)
