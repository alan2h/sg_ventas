from rest_framework import serializers

from apps.branches.v1.serializers import BranchSerializer
from apps.products.v1.serializers import ProductReadSerializer
from apps.sales.models import Sale, DetailSale


class SaleSerializer(serializers.ModelSerializer):

    class Meta:
        fields = '__all__'
        model = Sale


class SaleSerializerList(serializers.ModelSerializer):

    details = serializers.SerializerMethodField('details_sale')
    total = serializers.SerializerMethodField('total_sale')
    branch = BranchSerializer()

    def details_sale(self, obj):
        details = DetailSale.objects.filter(sale__id=obj.id)
        return DetailSaleSerializer(details, many=True).data

    def total_sale(self, obj):
        total_ = 0
        details = DetailSale.objects.filter(sale__id=obj.id)
        for detail in details:
            total_ += detail.product.price_sale
        return total_

    class Meta:
        fields = '__all__'
        model = Sale


class DetailSaleSerializer(serializers.ModelSerializer):

    sale = SaleSerializer()
    product = ProductReadSerializer()

    class Meta:
        fields = '__all__'
        model = DetailSale
