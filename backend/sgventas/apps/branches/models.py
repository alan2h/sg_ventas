from django.db import models


class Branch(models.Model):

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
