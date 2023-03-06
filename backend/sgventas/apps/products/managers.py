
from django.db import models


class ProductActiveManager(models.Manager):

    def get_queryset(self):
        return super().get_queryset().filter(active=True)


class ProductInactiveManager(models.Manager):

    def get_queryset(self):
        return super().get_queryset().filter(active=False)
