from rest_framework import generics, serializers, status
from rest_framework.authentication import SessionAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.exceptions import NotAuthenticated, PermissionDenied
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from rest_framework_simplejwt.authentication import JWTAuthentication

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
    authentication_classes = (JWTAuthentication, SessionAuthentication)

    def is_logged_in(self, user:User):
        """Check if the user has a correct login token

        Args:
            user (User): current logged-in? user

        Raises:
            NotAuthenticated: when the user is not authenticated
        """
        correct_usertoken = Token.objects.filter(user=user).exists()
        if not correct_usertoken:
            raise NotAuthenticated("User not authenticated for this action!")

    def fetch_profile(self, user:User, serializer_context:dict[str]) ->\
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
        if user.is_admin or user.is_staff:
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
            response_object = self.generate_profile_index_array(
                request.get_host(),
                request.is_secure(),
                kwargs['username'],
                self.fetch_profile(request.user,self.get_serializer_context())
            )
            return Response(
                response_object
                ,status=status.HTTP_200_OK)
        except NotAuthenticated as exception:
            return Response({
                "message":str(exception)
            }, status=exception.status_code)
        except PermissionDenied as exception:
            return Response({
                "message":str(exception)
            },status=exception.status_code)
