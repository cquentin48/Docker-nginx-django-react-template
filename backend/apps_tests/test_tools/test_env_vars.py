
import os
from django.test import TestCase

from tools.env_vars import load_env_var_list


class TestEnvVars(TestCase):
    """Environment vars test class
    """

    def test_load_env_var_list_default_value(self):
        """This should display the output for the default value
        """
        # Given
        env_var_name="JLKFDJSFLJS"
        default_value='["jlj"]'
        expected_result = ["jlj"]

        # Acts
        operation_test_result = load_env_var_list(env_var_name,default_value)

        # Asserts
        self.assertEqual(operation_test_result,expected_result)

    def test_load_env_var_list_env_var_value(self):
        """This should display the output for the default value
        """
        # Given
        env_var_name="JLKFDJSFLJS"
        env_var_value='["j"]'
        default_value='["jlj"]'
        expected_result = ["j"]
        os.environ[env_var_name] = env_var_value

        # Acts
        operation_test_result = load_env_var_list(env_var_name,default_value)

        # Asserts
        self.assertEqual(operation_test_result,expected_result)

        # After
        del os.environ[env_var_name]
