from django.db import transaction


from rest_framework import viewsets, permissions, status
from rest_framework.response import Response

from apps.sales.v1.serializers import (
    SaleSerializer,
    SaleSerializerList
)
from apps.sales.constants import PaymentMethod
from apps.sales.models import Sale, DetailSale
from apps.products.models import Product

# Tasks
from apps.sales.tasks import send_information_sale_email


class SaleViewSet(viewsets.ModelViewSet):

    permission_classes = [permissions.IsAuthenticated]
    serializer_class = SaleSerializer
    queryset = Sale.objects.all()

    def get_serializer(self, *args, **kwargs):

        if self.action == 'retrieve':
            return SaleSerializerList(*args, **kwargs)
        return super().get_serializer(*args, **kwargs)

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
        total_amount = 0
        user = request.user
        branch = user.branch
        pay_method = PaymentMethod.DEBIT
        if request.data.get('pay_method') == 'money':
            pay_method = PaymentMethod.CASH
        if request.data.get('pay_method') == 'credit':
            pay_method = PaymentMethod.CREDIT
        if request.data.get('pay_method') == 'transfer':
            pay_method = PaymentMethod.TRANSFER
        sale = Sale.objects.create(
            type_payment=pay_method,
            branch=branch
        )
        for detail in request.data.get('products'):
            product = Product.objects.get(id=detail['id'])
            total_amount += product.price_sale
            DetailSale.objects.create(
                sale=sale,
                product=product,
                amount=detail.get('mount')
            )
        content = {
            'id': sale.id,
            "date_sale": sale.date_sale,
            "hour_sale": sale.hour_sale
        }
        send_information_sale_email.delay(
            sale.hour_sale,
            sale.date_sale,
            total_amount
        )
        print('here no coming')
        return Response(content, status=status.HTTP_201_CREATED)
