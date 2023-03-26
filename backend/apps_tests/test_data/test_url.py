from django.http import HttpResponse
from django.test import SimpleTestCase
from django.urls import reverse

class TestDataUrl(SimpleTestCase):
    """Data Unit test Class
    """

    def test_hello_world(self):
        """Check if the message "Hello world!" is
        displayed
        """
        # Given
        url = "index"

        expected_result = "Hello world!"

        # Acts
        result:HttpResponse = self.client.get(reverse(url))
        body_result = result.content.decode('UTF-8')

        # Asserts
        self.assertEqual(body_result,expected_result)
