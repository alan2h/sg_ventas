from django.db import models

# utilities
from apps.utils.models import SaleModel


class Branch(SaleModel):

    name = models.CharField(
        max_length=30,
        unique=True
    )

    description = models.CharField(
        max_length=150,
        null=True,
        blank=True
    )

    def __str__(self):
        return str(self.name)
