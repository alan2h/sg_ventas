from django.contrib import admin

from .models import (
    Sale,
    DetailSale
)


@admin.register(Sale)
class SaleAdmin(admin.ModelAdmin):

    pass


@admin.register(DetailSale)
class DetailSaleAdmin(admin.ModelAdmin):

    pass
