# Generated by Django 4.1.6 on 2024-02-04 05:26

from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Client",
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
                ("deleted", models.DateTimeField(blank=True, default=None, null=True)),
                ("name", models.CharField(max_length=30)),
                ("last_name", models.CharField(max_length=30)),
            ],
            options={
                "abstract": False,
            },
        ),
    ]