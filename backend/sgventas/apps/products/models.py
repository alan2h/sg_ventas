from django.db import models

# models thirds
from apps.branches.models import Branch

# Utilities
from apps.utils.models import SaleModel


class Brand(SaleModel):

    name = models.CharField(
        max_length=20,
        help_text='name of brand in product'
    )
    description = models.TextField(
        max_length=300,
        null=True,
        blank=True
    )

    def __str__(self) -> str:
        return str(self.name)


class Category(SaleModel):

    name = models.CharField(
        max_length=20,
        help_text='name of category in product'
    )
    description = models.TextField(
        max_length=300,
        null=True,
        blank=True
    )

    def __str__(self) -> str:
        return str(self.name)
    
    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'


class SubCategory(SaleModel):

    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE
    )

    name = models.CharField(
        max_length=30
    )

    def __str__(self):
        return str(self.name)


class Product(SaleModel):

    name = models.CharField(
        max_length=30
    )

    description = models.TextField(
        max_length=300,
        null=True,
        blank=True
    )

    barcode = models.CharField(
        max_length=200,
        null=True,
        blank=True
    )

    photo = models.ImageField(upload_to='media/products',
                              null=True,
                              blank=True)

    brand = models.ForeignKey(
        Brand,
        null=True,
        blank=True,
        on_delete=models.SET_NULL)

    category = models.ForeignKey(
        Category,
        null=True,
        blank=True,
        on_delete=models.SET_NULL)

    sub_category = models.ForeignKey(
        SubCategory,
        null=True,
        blank=True,
        on_delete=models.SET_NULL
    )

    price_sale = models.DecimalField(
        decimal_places=2,
        max_digits=12
    )

    price_buy = models.DecimalField(
        decimal_places=2,
        max_digits=12
    )

    observation = models.TextField(
        null=True,
        blank=True
    )

    active = models.BooleanField(
        default=True
    )

    iva = models.IntegerField(
        default=21,
        help_text='no is required, but default is 21%'
    )


class StockBranch(SaleModel):

    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE
    )

    branch = models.ForeignKey(
        Branch,
        on_delete=models.CASCADE
    )

    stock = models.PositiveBigIntegerField(
        default=2
    )

    stock_min = models.PositiveBigIntegerField(
        default=1
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(
                'product',
                'branch',
                name='product_branch_unique'
            )
        ]

    def __str__(self):
        return f"{self.product.name} {self.branch.name}"
