import json
import pytest

from faker import Faker
from apps.users.models import User
from apps.products.models import Brand

fake = Faker()


@pytest.mark.django_db
def test_list_brand(client):
    endpoint = '/products/api/v1/brand/api/get_no_paginated/'
    user = User.objects.create(
        username='admin',
        password='poc123',
        email='admin@admin.com')
    Brand.objects.create(
        description='fake_2',
        name='fake_2'
    )
    Brand.objects.create(
        description='fake_1',
        name='fake_2'
    )
    client.force_authenticate(user=user)
    response = client.get(endpoint)
    assert response.status_code == 200
    assert len(response.data) == 2


@pytest.mark.django_db
def test_create_brand(client):
    endpoint = '/products/api/v1/brand/api/'
    user = User.objects.create(
        username='admin',
        password='poc123',
        email='admin@admin.com')
    header_info = {'content-type': 'application/json'}
    data = {
        'name': 'brand_1',
        'description': fake.company()
    }

    client.force_authenticate(user=user)
    response = client.post(endpoint, data=data)
    json_response = response.json()
    assert response.status_code == 201
    assert json_response['name'] == 'brand_1'
