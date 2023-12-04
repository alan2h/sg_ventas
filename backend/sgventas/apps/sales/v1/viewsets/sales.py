from rest_framework import viewsets, permissions, status
from rest_framework.response import Response

from apps.sales.v1.serializers import SaleSerializer, DetailSaleSerializer
from apps.sales.models import Sale, DetailSale


class SaleViewSet(viewsets.ModelViewSet):

    model = Sale
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = SaleSerializer

    def create(self, request):
        print(request.data)
        content = {'please move along': 'nothing to see here'}
        return Response(content, status=status.HTTP_201_CREATED)
