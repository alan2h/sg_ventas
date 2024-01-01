from django.db import transaction

from rest_framework import viewsets, permissions, status
from rest_framework.response import Response

from apps.sales.v1.serializers import SaleSerializer, DetailSaleSerializer
from apps.sales.models import Sale, DetailSale
from apps.branches.models import Branch
from apps.products.models import Product


class SaleViewSet(viewsets.ModelViewSet):

    model = Sale
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = SaleSerializer

    @transaction.atomic
    def create(self, request):
        '''
        {'pay_method': 'money',
        'products': [
        {'id': 2, 'name':
        'asdasdsad', 'barcode': 'zzzzzzzzzzz',
        'description': 'coffe drink malt',
        'photo': None, 'brand':
         {'id': 1, 'name': 'Brands_1', 'description': 'Brands 1'},
         'category': None, 'sub_category': None, 'price_sale': '23.00',
         'price_buy': '12.00', 'observation': None,
         'stock': 23, 'stock_min': 23, 'mount': 1, 'total_price': 23},
           }
        '''
        user = request.user

        branch = user.branch
        pay_method = 'CASH'
        if request.data.get('pay_method') == 'money':
            pay_method = 'CASH'
        sale = Sale.objects.create(
            type_payment=pay_method,
            branch=branch
        )
        for detail in request.data.get('products'):
            product = Product.objects.get(id=detail['id'])
            DetailSale.objects.create(
                sale=sale,
                product=product,
                amount=detail.get('mount')
            )
        content = {'201': 'sale is saved with success'}
        return Response(content, status=status.HTTP_201_CREATED)
