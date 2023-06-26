from django.contrib.auth import logout

from rest_framework import serializers
from rest_framework import generics, status
from rest_framework.exceptions import PermissionDenied, NotAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated

from user_managment.views import format_http_prefix

from .models import User
from .serializers.profile_serializer import \
    UserProfileSerializer, UserSerializer, UserStaffProfileSerializer
from .serializers.register_serializer import RegisterSerializer


class RegisterAPI(generics.GenericAPIView):
    """API View for registering a user
    """
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def post(self, request, *_, **__)->Response:
        """Post route managment

        Args:
            request (_type_): request sent by the user

        Returns:
            Response: Response sent by the server to the user
            - 201 : User created
            - 400 : Bad inputs entered
            - 409 : Conflict in username and/or email
        """
        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            user:User = serializer.create(serializer.validated_data)

            return Response(
            {
                "user": UserSerializer(
                    user,
                    context=self.get_serializer_context()).data,
                    "message":"User Created Successfully. Please perform "+
                    "login."
            },
            status=status.HTTP_201_CREATED,
            headers={
                "Location":"http://0.0.0.0:8000/api/v1/user/"+user.username+"/profile"
            }
            )
        except serializers.ValidationError as error:
            return Response(
                {
                    "message":str(error)
                },
                status=error.status_code
            )
        except User.AlreadyExist as error:
            return Response(
                {
                    "message":str(error)
                },
                status=error.status_code,
            )

class ProfileViewAPI(generics.GenericAPIView):
    """Profile view API
    """
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

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
        UserProfileSerializer|UserStaffProfileSerializer:
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
            return UserStaffProfileSerializer(
                user,
                context=serializer_context).data
        return UserProfileSerializer(
            user,
            context=serializer_context).data


    def get(self,request, *_, **kwargs)->Response:
        """Get method for this route

        Args:
            request (_type_): _description_

        Returns:
            Response: _description_
        """
        username_entered = kwargs['username']
        try:
            profile = self.fetch_profile(request.user,self.get_serializer_context())
            prefix_path = format_http_prefix(request.is_secure())+\
            request.get_host()+\
            "/api/v1/user/"+username_entered+"/"
            response_object = {
                "user":profile,
                "url_managment_list":{
                    "delete":prefix_path+"delete",
                    "update":prefix_path+"update",
                    "profile":prefix_path+"profile"
                }
            }
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

class LogoutViewAPI(generics.GenericAPIView):
    """Logout API view
    """
    permission_classes = [IsAuthenticated]

    def post(self,request, *_, **kwargs):
        """Logout method with the post verb

        Args:
            request (_type_): _description_
        """
        is_tokened = Token.objects.filter(user=request.user).exists()
        if is_tokened:
            logout(request)
            return Response({
                "message":"Successfull logout!"
            }, status=status.HTTP_200_OK)
        return Response({
            "message": "No user logged in found with this session!"
        }, status=status.HTTP_401_UNAUTHORIZED)
