from django.urls import path

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from user_managment.api.delete_account import AccountDelete

from .api.logout import Logout
from .api.register import RegisterAPI

from .api.profile import (
    ProfileAPI,
)

from .api.authenticate import UserManagmentTokenObtainPairView

from .views import user_managment_root_view


urlpatterns = [
    path('',user_managment_root_view,name='base_urls'),
    path('register', RegisterAPI.as_view(), name="register"),
    path('auth', UserManagmentTokenObtainPairView.as_view(),name="authentication"),
    path('auth/refresh', TokenRefreshView.as_view(),name="token_refresh"),
    path('<str:username>/profile',ProfileAPI.as_view(),name="profile_view"),
    path('logout', Logout.as_view(), name="logout"),
    path('delete', AccountDelete.as_view(), name="account_delete")
]
