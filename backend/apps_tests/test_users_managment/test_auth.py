from django.test import TestCase
from user_managment.models import User

class AuthTestCase(TestCase):
    def setUp(self):
        self.u = User.objects.create_user('root', 'root@root.com', 'root')
        self.u.save()

    def testLogin(self):
        self.client.login(username='root@root.com', password='root')
