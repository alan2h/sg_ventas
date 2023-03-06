
from apps.branches.models import Branch
from apps.branches.v1.serializers import BranchSerializer
from rest_framework.permissions import AllowAny
from rest_framework.viewsets import ModelViewSet


class BranchViewSet(ModelViewSet):

    queryset = Branch.objects.all()
    permission_classes = [AllowAny]
    serializer_class = BranchSerializer
