
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        try:

            # Add custom claims
            token['username'] = user.username
            token['email'] = user.email
            token['id_branch'] = user.branch.id
            # ...

        except Exception:
            raise serializers.ValidationError(
                {"username": "This user, don't have a branch, please select a branch for them"})
        return token
