from django.test import Client, SimpleTestCase

class ViewsTest(SimpleTestCase):
    """Schema test class from
    """

    databases = '__all__'

    def test_api(self):
        """Sample api response test for the hello-world
        get endpoint
        """
        # Given
        endpoint_url = "/api/v1/data/hello-world/"
        client = Client()

        # Acts
        result = client.get(endpoint_url)

        # Asserts
        self.assertEqual(result.status_code,200)
        self.assertEqual(result.content.decode("utf-8"),"Hello world!")
