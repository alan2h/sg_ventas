from .base import *

INSTALLED_APPS = DJANGO_APPS + THIRDS_APPS + MY_APPS

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(hours=8),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    "TOKEN_OBTAIN_SERIALIZER": "apps.users.serializers.MyTokenObtainPairSerializer"
}