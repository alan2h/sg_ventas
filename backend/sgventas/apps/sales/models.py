from django.db import models

from apps.products.models import Product
from apps.clients.models import Client
from apps.branches.models import Branch


class Sale(models.Model):

    class TypePayment(models.TextChoices):

        DEBIT = 'DEBIT', 'Debit'
        CREDIT = 'CREDIT', 'Credit'
        CASH = 'CASH', 'Cash'

    date_sale = models.DateField(auto_now_add=True)
    hour_sale = models.TimeField(auto_now_add=True)
    client = models.ForeignKey(
        Client,
        null=True,
        blank=True,
        on_delete=models.SET_NULL
    )
    type_payment = models.CharField(
        max_length=30,
        choices=TypePayment.choices,
        default=TypePayment.CASH
    )
    branch = models.ForeignKey(
        Branch,
        on_delete=models.CASCADE
    )

    def __str__(self):
        return f"{self.client} - {self.type_payment} - {self.date_sale}"


class DetailSale(models.Model):

    sale = models.ForeignKey(
        Sale,
        on_delete=models.CASCADE
    )
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE
    )
    amount = models.PositiveBigIntegerField(
        default=1
    )

    def __str__(self):
        return f"{str(self.sale)} - {self.product.name}"
