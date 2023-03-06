from .base import *

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(days=12),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    "TOKEN_OBTAIN_SERIALIZER": "apps.users.serializers.MyTokenObtainPairSerializer"
}