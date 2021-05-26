from django.urls import path

from .views import UserListView, UserProfileView, UserRegister

app_name = 'users'

urlpatterns = [
    path('', UserListView.as_view(), name='user_list'),
    path('profile/', UserProfileView.as_view(), name='user_profile'),
    path('register/', UserRegister.as_view(), name='user_register'),
]
