
import datetime
# django
from django.db import models


class SaleQuerySet(models.query.QuerySet):

    def delete(self):

        self.deactivate()

    def deactivate(self):
        deleted = datetime.datetime.now()
        self.update(active=False, deleted=deleted)


class SaleManager(models.Manager):

    def get_queryset(self):

        return super().get_queryset().filter(active=True)


class SaleInactiveManager(models.Manager):

    def get_queryset(self):

        return super().get_queryset().filter(active=False)


class SaleModel(models.Model):

    active = models.BooleanField(default=True, db_index=True)
    deleted = models.DateTimeField(
        default=None,
        null=True,
        blank=True
    )

    objects = SaleManager()
    inactive_objects = SaleInactiveManager()

    class Meta:

        abstract = True
