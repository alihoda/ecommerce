from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.authtoken.models import Token


class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'name', 'username', 'email', 'isAdmin', 'token']

    def get_name(self, obj):
        name = obj.first_name
        if not name:
            name = obj.username

        return name

    def get_isAdmin(self, obj):
        return obj.is_staff

    def get_token(self, obj):
        token, created = Token.objects.get_or_create(user=obj)
        return token.key
