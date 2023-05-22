from django.test import TestCase

from user_managment.manager import UserManager

class UserManagerTest(TestCase):
    """User manager test case
    """

    def test_validate_input_ok(self):
        """Nothing should be raised when the input
        is correctly put
        """
        # Given
        test_object = UserManager()
        input = "My input!"
        locale_key_error="USER_REGISTER_PASSWORD_IS_EMPTY"

        # Acts & Assert
        test_object.validate_input(input,locale_key_error)

    def test_validate_input_empty(self):
        """A ValueError should be raised when the input
        is empty
        """
        # Given
        test_object = UserManager()
        input = ""
        locale_key_error="USER_REGISTER_PASSWORD_IS_EMPTY"

        # Acts & Assert
        self.assertRaises(ValueError,test_object.validate_input,input,locale_key_error)

    def test_validate_input_none(self):
        """A ValueError should be raised when the input
        is set to None
        """
        # Given
        test_object = UserManager()
        input = None
        locale_key_error="USER_REGISTER_PASSWORD_IS_EMPTY"

        # Acts & Assert
        self.assertRaises(ValueError,test_object.validate_input,input,locale_key_error)