from django.db import models


class Person(models.Model):

    name = models.CharField(
        max_length=30
    )

    last_name = models.CharField(
        max_length=30
    )

    class Meta:
        abstract = True
