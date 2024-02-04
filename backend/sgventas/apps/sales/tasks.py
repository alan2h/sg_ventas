
# Django
from django.core.mail import send_mail
from django.conf import settings

# Celery
from celery import shared_task

# Apps
from apps.users.models import User


@shared_task()
def send_information_sale_email(date_sale, hour_sale, total_amount):

    users_admin = User.objects.filter(is_superuser=True).values('email')
    list_admin = []
    for admin in users_admin:
        list_admin.append(admin.email)
    print(list_admin)
    send_mail(
        f'Se ha realizado una venta {date_sale}-{hour_sale}',
        f'Detalle de la venta: total --> ${total_amount}',
        settings.EMAIL_HOST_USER,
        list_admin,
        fail_silently=False
    )
