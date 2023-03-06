
import factory
from apps.products.models import Brand


class BrandFactory(factory.Factory):

    class Meta:
        model = Brand
