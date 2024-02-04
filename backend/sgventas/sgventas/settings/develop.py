from .base import *

INSTALLED_APPS = DJANGO_APPS + THIRDS_APPS + MY_APPS

GRAPH_MODELS = {
  'all_applications': True,
  'group_models': True,
}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(days=12),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    "TOKEN_OBTAIN_SERIALIZER": "apps.users.serializers.MyTokenObtainPairSerializer"
}
