
from apps.products.models import Brand, Category, Product, StockBranch

from crum import get_current_request
from rest_framework import serializers


class BrandSerializer(serializers.ModelSerializer):

    class Meta:
        model = Brand
        fields = (
            'id',
            'name',
            'description'
        )


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = (
            'id',
            'name',
            'description'
        )


class ProductWriteSerializer(serializers.ModelSerializer):

    barcode = serializers.CharField(
        max_length=200,
        required=True
    )

    class Meta:
        model = Product
        fields = '__all__'


class StockBranchSerializer(serializers.ModelSerializer):

    class Meta:
        model = StockBranch
        fields = (
            'id',
            'product',
            'branch',
            'stock',
            'stock_min'
        )


class ProductReadSerializer(serializers.ModelSerializer):

    brand = BrandSerializer()
    category = CategorySerializer()
    stock = serializers.SerializerMethodField()
    stock_min = serializers.SerializerMethodField()

    @staticmethod
    def get_stock(instance):
        request = get_current_request()
        stock_branch = StockBranch.objects.filter(branch=request.user.branch)
        if stock_branch.exists():
            return stock_branch.first().stock
        return 0
    
    @staticmethod
    def get_stock_min(instance):
        request = get_current_request()
        stock_branch = StockBranch.objects.filter(branch=request.user.branch)
        if stock_branch.exists():
            return stock_branch.first().stock_min
        return 0

    class Meta:
        model = Product
        fields = (
            'id',
            'name',
            'barcode',
            'description',
            'photo',
            'brand',
            'category',
            'price_sale',
            'price_buy',
            'observation',
            'stock',
            'stock_min'
        )
