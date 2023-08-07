from rest_framework import viewsets, permissions

from apps.sales.v1.serializers import SaleSerializer, DetailSaleSerializer
from apps.sales.models import Sale, DetailSale


class SaleViewSet(viewsets.ModelViewSet):

    model = Sale
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = SaleSerializer
