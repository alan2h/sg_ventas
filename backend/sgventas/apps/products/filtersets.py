
from apps.products.models import Product
from django_filters import CharFilter, FilterSet


class ProductFilter(FilterSet):

    name = CharFilter(lookup_expr='icontains')
    description = CharFilter(lookup_expr='icontains')

    class Meta:
        model = Product
        fields = ['name', 'description']
