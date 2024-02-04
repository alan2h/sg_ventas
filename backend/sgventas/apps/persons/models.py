from django.db import models

# Utilities
from apps.utils.models import SaleModel


class Person(SaleModel):

    name = models.CharField(
        max_length=30
    )

    last_name = models.CharField(
        max_length=30
    )

    class Meta:
        abstract = True
