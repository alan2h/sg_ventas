# Generated by Django 4.1.6 on 2024-02-03 16:35

from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Branch",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("active", models.BooleanField(db_index=True, default=True)),
                ("deleted", models.DateTimeField(default=None, null=True)),
                ("name", models.CharField(max_length=30, unique=True)),
                (
                    "description",
                    models.CharField(blank=True, max_length=150, null=True),
                ),
            ],
            options={
                "abstract": False,
            },
        ),
    ]
