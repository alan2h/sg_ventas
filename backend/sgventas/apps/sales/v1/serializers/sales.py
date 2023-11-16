from rest_framework import serializers

from apps.sales.models import Sale, DetailSale


class SaleSerializer(serializers.ModelSerializer):

    class Meta:
        fields = '__all__'
        model = Sale


class DetailSaleSerializer(serializers.ModelSerializer):

    sale = SaleSerializer()

    class Meta:
        fields = '__all__'
        model = DetailSale
