from django.contrib import admin

# models
from .models import (
    Brand,
    Category,
    Product,
    StockBranch
)


@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
    pass


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    pass


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    pass


@admin.register(StockBranch)
class StockBranchAdmin(admin.ModelAdmin):
    pass
