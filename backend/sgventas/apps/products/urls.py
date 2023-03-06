
from apps.products.v1.viewsets.products import (BrandViewSet, CategoryViewSet,
                                                ProductViewSet)
from django.urls import include, path
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'', ProductViewSet)
router.register(r'brand', BrandViewSet)
router.register(r'categories', CategoryViewSet)

urlpatterns = [
    path('api/v1/', include(router.urls))
]
