import unittest

from cli.tag_managment import are_every_information_been_set

class TestTagManagment(unittest.TestCase):

    def test_are_every_information_been_set_ok_here(self):
        """Check in this test if the method
        are_every_information_been_set with correct args sets
        the returns value as True
        """
        # Given
        message_title = "[Release]my release"
        first_line = "Version:New version number"
        rest_of_commit="Changelog:\n"+\
            "-> My changelog"
        # Test
        operation_result = \
            are_every_information_been_set(message_title,first_line,rest_of_commit)

        # Asserts
        self.assertEquals(operation_result,True)

if __name__ == '__main__':
    unittest.main()