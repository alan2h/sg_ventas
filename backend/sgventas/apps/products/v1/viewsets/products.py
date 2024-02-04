
# models
from apps.branches.models import Branch
from apps.products.models import Brand, Category, Product, StockBranch, SubCategory
from apps.products.v1.serializers import (BrandSerializer, CategorySerializer,
                                          ProductReadSerializer, ProductWriteSerializer,
                                          SubCategoryReadSerializer, SubCategoryWriteSerializer)
from apps.utils.paginations import StandardResultsSetPagination
from apps.products.filtersets import ProductFilter

from rest_framework.filters import OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend

from rest_framework import permissions, viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser

from django.contrib.auth.models import User
from django.db import transaction


class BrandViewSet(viewsets.ModelViewSet):

    queryset = Brand.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = BrandSerializer
    pagination_class = StandardResultsSetPagination

    @action(detail=False, methods=['get'])
    def get_no_paginated(self, request):

        brands = Brand.objects.all()
        serializer = self.get_serializer(brands, many=True)
        return Response(serializer.data)


class CategoryViewSet(viewsets.ModelViewSet):

    queryset = Category.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CategorySerializer
    pagination_class = StandardResultsSetPagination

    @action(detail=False, methods=['get'])
    def get_no_paginated(self, request):

        categories = Category.objects.all()
        serializer = self.get_serializer(categories, many=True)
        return Response(serializer.data)


class SubCategoryViewSet(viewsets.ModelViewSet):

    queryset = SubCategory.objects.all()
    serializer_class = SubCategoryReadSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer(self, *args, **kwargs):
        if self.action == 'list':
            return super().get_serializer(*args, **kwargs)
        if self.action == 'retrieve':
            return super().get_serializer(*args, **kwargs)
        kwargs.setdefault('context', self.get_serializer_context())
        return SubCategoryWriteSerializer(*args, **kwargs)


class ProductViewSet(viewsets.ModelViewSet):

    queryset = Product.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ProductReadSerializer
    pagination_class = StandardResultsSetPagination
    parser_classes = [MultiPartParser]
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_class = ProductFilter
    ordering_fields = '__all__'

    def get_serializer(self, *args, **kwargs):
        if self.action == 'list':
            return super().get_serializer(*args, **kwargs)
        if self.action == 'retrieve':
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
    
    def perform_update(self, serializer):
        product = serializer.save()
        product.active = True
        product.save()

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
