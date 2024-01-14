from rest_framework import serializers

from apps.branches.v1.serializers import BranchSerializer
from apps.sales.models import Sale, DetailSale


class SaleSerializer(serializers.ModelSerializer):

    class Meta:
        fields = '__all__'
        model = Sale


class SaleSerializerList(serializers.ModelSerializer):

    details = serializers.SerializerMethodField('details_sale')
    branch = BranchSerializer()

    def details_sale(self, obj):
        details = DetailSale.objects.filter(sale__id=obj.id)
        print(details)
        return DetailSaleSerializer(details, many=True).data

    class Meta:
        fields = '__all__'
        model = Sale


class DetailSaleSerializer(serializers.ModelSerializer):

    sale = SaleSerializer()

    class Meta:
        fields = '__all__'
        model = DetailSale
