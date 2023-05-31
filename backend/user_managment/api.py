from rest_framework import serializers
from rest_framework import generics, status
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated

from rest_framework_simplejwt.tokens import RefreshToken

from user_managment.views import format_http_prefix

from .models import User
from .serializer import ProfileSerializer, RegisterSerializer,\
UserProfileSerializer, UserSerializer, UserStaffProfileSerializer

class RegisterAPI(generics.GenericAPIView):
    """API View for registering a user
    """
    serializer_class = RegisterSerializer

    def post(self, request, *_, **__)->Response:
        """Post route managment

        Args:
            request (_type_): request sent by the user

        Returns:
            Response: Response sent by the server to the user
            201 : User created
            400 : Bad inputs entered
            409 : Conflict in username and/or email
        """
        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            user = serializer.create(serializer.validated_data)

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

    def get(self,request, *_, **kwargs)->Response:
        """Get method for this route

        Args:
            request (_type_): _description_

        Returns:
            Response: _description_
        """
        user = request.user
        username_entered = kwargs['username']
        try:
            user = ProfileSerializer.get(username_entered,user)
            if user.is_admin or user.is_staff:
                profile = UserStaffProfileSerializer(
                    user,
                    context=self.get_serializer_context()).data
            else:
                profile = UserProfileSerializer(
                    user,
                    context=self.get_serializer_context()).data
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
        except PermissionDenied as exception:
            return Response({
                "message":str(exception)
            },status=exception.status_code)
