from django.urls import path

from rest_framework_simplejwt import views as jwt_views

from .api import RegisterAPI
from .views import user_managment_root_view

urlpatterns = [
    path('',user_managment_root_view,name='base_urls'),
    path('register', RegisterAPI.as_view(), name="register"),
    path('auth',jwt_views.TokenObtainPairView.as_view(),name="token_obtain_pair"),
    path('auth/refresh',jwt_views.TokenRefreshView.as_view(),name="token_refresh")
]
