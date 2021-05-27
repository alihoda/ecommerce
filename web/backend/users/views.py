from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from rest_framework import generics, permissions, status
from rest_framework.authentication import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView

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


class UserRegister(APIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def post(self, request, format='json'):

        name, username, email, password = request.data.values()
        user = User.objects.create(
            username=username,
            first_name=name,
            email=email,
            password=make_password(password)
        )

        serializer = UserSerializer(user)

        return Response(serializer.data)


class UserLoginView(APIView):
    def post(self, request, format='json'):
        username, password = request.data.values()

        user = authenticate(request, username=username, password=password)
        if user:
            # Delete exitsting token
            token = Token.objects.filter(user=user)
            if token:
                token.delete()
            # Serialize user and create token if it doesn't have
            serializer = UserSerializer(user)
            return Response(serializer.data)
        return Response(data={'detail': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
