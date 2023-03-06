import pytest

from apps.users.models import User
from apps.products.models import Brand


@pytest.mark.django_db
def test_list_brand(client):
    endpoint = '/products/v1/brand/'
    Brand.objects.create(
        description='poc 1',
        name='poc 1'
    )
    user = User.objects.create(
        username='admin',
        password='poc123',
        email='admin@admin.com')
    client.force_authenticate(user=user)
    response = client.get(endpoint)
    assert response.status_code == 200
    assert len(response.data) == 1
