from drf_yasg.utils import swagger_auto_schema

from rest_framework import generics, serializers, status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from server.settings import LOCALE

from user_managment.views import format_http_prefix

from ..models import User

class UserProfileSerializer(serializers.ModelSerializer):
    """Serializer class for the profile view
    """
    class Meta:
        """Meta subclass
        """
        model = User
        fields = [
            'username',
            'email',
            'registration_date',
            'last_login',
            'is_currently_logged_in'
        ]

class StaffProfileSerializer(serializers.ModelSerializer):
    """Serializer class for the profile view
    """
    class Meta:
        model = User
        fields = [
            'username',
            'email',
            'is_active',
            'staff',
            'admin',
            'registration_date',
            'last_login',
            'is_currently_logged_in'
        ]

class ProfileAPI(generics.GenericAPIView):
    """Profile view API
    """
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def is_super_user(self, user:User) -> bool:
        """
        Check if the user is super admin user or not
        Args:
            user (User): Selected user

        Returns:
            bool: `True` yes | `False` no
        """
        return user.is_staff or user.is_admin

    def fetch_profile(self, username:str, serializer_context:dict[str]) ->\
        UserProfileSerializer|StaffProfileSerializer:
        """Fetch the profile and returns it in a serializer form

        Args:
            user (User): current logged in user
            serializer_context (dict[str]): context of the serializer, in this format :
            ```python
            [
                'request'
                'format'
                'view'
            ]
            ```

        Returns:
            UserProfileSerializer|UserStaffProfileSerializer:
                Profile serialized for the http response
        """
        user = User.objects.get(username=username)
        if self.is_super_user(user):
            return StaffProfileSerializer(
                user,
                context=serializer_context).data
        return UserProfileSerializer(
            user,
            context=serializer_context).data

    def generate_profile_index_array(
                               self,
                               host:str,
                               is_secure: bool,
                               username_entered:str,
                               profile) -> dict[str]:
        """Generate the response array for the profile index

        Args:
            - `host` (`str`) : server host address
            - `is_secure` (`bool`) : does the server the https protocol or not
            - `username_entered` (`str`) : username entered in the request
            - `profile` (`UserProfileSerializer` | `UserStaffProfileSerializer`) :
                current user profile

        Returns:
            `dict[str]`: Response array for the profile url index
        """
        prefix_path = format_http_prefix(is_secure)+\
            host+\
            "/api/v1/user/"+username_entered+"/"
        return {
                "user":profile,
                "url_managment_list":{
                    "delete":prefix_path+"delete",
                    "update":prefix_path+"update",
                    "profile":prefix_path+"profile"
                }
            }

    @swagger_auto_schema(operation_description="User profile")
    def get(self,request:Request, *_, **kwargs)->Response:
        """Get method for this route

        Args:
            `request` (_type_): Request sent by the client

        Returns:
            Response: HTTP Response sent by the server
            - `200` : User logged in with data retrieved
            - `401` : User not authenticated
            - `403` : Unsufficient authorization to retrieve profile
        """
        try:
            username = kwargs['username']
            profile = self.fetch_profile(
                username,
                self.get_serializer_context()
            )
            response_object = self.generate_profile_index_array(
                request.get_host(),
                request.is_secure(),
                username,
                profile
            )
            return Response(
                response_object,
                status=status.HTTP_200_OK)
        except User.DoesNotExist as _:
            return Response(
                {
                    'message':LOCALE.load_localised_text("PROFILE_UNKOWN_USER")
                },
                status=status.HTTP_404_NOT_FOUND
            )
