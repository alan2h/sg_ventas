from apps.sales.v1.viewsets.sales import SaleViewSet
from django.urls import include, path
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'', SaleViewSet, basename='SaleViewSet')

urlpatterns = [
    path('api/v1/', include(router.urls))
]
