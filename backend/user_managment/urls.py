from django.urls import path

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

from .api import (
    LogoutViewAPI,
    RegisterAPI,
    ProfileViewAPI,
)

from .token import UserManagmentTokenObtainPairView

from .views import user_managment_root_view

urlpatterns = [
    path('',user_managment_root_view,name='base_urls'),
    path('register', RegisterAPI.as_view(), name="register"),
    path('auth', UserManagmentTokenObtainPairView.as_view(),name="token_obtain_pair"),
    path('auth/refresh', TokenRefreshView.as_view(),name="token_refresh"),
    path('<str:username>/profile',ProfileViewAPI.as_view(),name="profile_view"),
    path('logout', LogoutViewAPI.as_view(), name="logout_view")
]
