from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from rest_framework import generics, permissions
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

from .serializers import UserSerializer


class UserProfileView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def retrieve(self, request, *args, **kwargs):
        user = Token.objects.get(key=request.auth.key).user
        serializer = UserSerializer(user)

        return Response(serializer.data)


class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAdminUser, )


class UserRegister(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
