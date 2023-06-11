
# models
from apps.branches.models import Branch
from apps.products.models import Brand, Category, Product, StockBranch
from apps.products.v1.serializers import (BrandSerializer, CategorySerializer,
                                          ProductReadSerializer, ProductWriteSerializer)
from apps.utils.paginations import StandardResultsSetPagination
from apps.products.filtersets import ProductFilter

from django_filters.rest_framework import DjangoFilterBackend

from rest_framework import permissions, viewsets, status
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser

from django.contrib.auth.models import User
from django.db import transaction


class BrandViewSet(viewsets.ModelViewSet):

    queryset = Brand.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = BrandSerializer


class CategoryViewSet(viewsets.ModelViewSet):

    queryset = Category.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CategorySerializer


class ProductViewSet(viewsets.ModelViewSet):

    queryset = Product.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ProductReadSerializer
    pagination_class = StandardResultsSetPagination
    parser_classes = [MultiPartParser]
    filter_backends = [DjangoFilterBackend]
    filterset_class = ProductFilter

    def get_serializer(self, *args, **kwargs):
        if self.action == 'list':
            return super().get_serializer(*args, **kwargs)
        kwargs.setdefault('context', self.get_serializer_context())
        return ProductWriteSerializer(*args, **kwargs)
    
    def create(self, request, *args, **kwargs):
        if self.request.user.branch is None:
            return Response({'error': 'this user dont have a branch'}, status=status.HTTP_400_BAD_REQUEST)
        serializer = self.get_serializer(data=self.request.data)
        serializer.is_valid(raise_exception=True)
        if not self.request.data.get('stock', False) and not self.request.data.get('stock_min', False):
            return Response({'error': 'stock and stock minimo is required'}, status=status.HTTP_400_BAD_REQUEST)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    @transaction.atomic
    def perform_create(self, serializer):
        stock = self.request.data.get('stock', 1)
        stock_min = self.request.data.get('stock_min', 1)
        branch = self.request.user.branch
        product = serializer.save()
        product.active=True
        product.save()
        StockBranch.objects.create(
            branch=branch,
            product=product,
            stock=stock,
            stock_min=stock_min
        )

    def perform_destroy(self, instance):
        instance.active = False
        instance.save()
