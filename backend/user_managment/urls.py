from django.urls import path

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from .api import RegisterAPI
from .views import user_managment_root_view

urlpatterns = [
    path('',user_managment_root_view,name='base_urls'),
    path('register', RegisterAPI.as_view(), name="register"),
    path('auth', TokenObtainPairView.as_view(),name="token_obtain_pair"),
    path('auth/refresh', TokenRefreshView.as_view(),name="token_refresh")
]
