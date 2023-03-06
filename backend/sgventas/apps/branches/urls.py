
from apps.branches.v1.viewsets import BranchViewSet
from django.urls import include, path
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'', BranchViewSet)


urlpatterns = [
    path('api/v1/', include(router.urls))    
]
