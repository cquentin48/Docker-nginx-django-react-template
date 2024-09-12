from django.test import TestCase

from user_managment.views import format_http_prefix


class ViewsTest(TestCase):
    """Model unit test class
    """

    def test_format_http_prefix_unsecure(self):
        """Test the method `format_http_prefix` in
        the unsecure mode
        """
        # Given
        is_secure = False
        excepted_result = "http://"

        # Acts
        operation_result = format_http_prefix(is_secure)

        # Asserts
        self.assertEqual(operation_result,excepted_result)

    def test_format_http_prefix_secure(self):
        """Test the method `format_http_prefix` in
        the secure mode
        """
        # Given
        is_secure = True
        excepted_result = "https://"

        # Acts
        operation_result = format_http_prefix(is_secure)

        # Asserts
        self.assertEqual(operation_result,excepted_result)
