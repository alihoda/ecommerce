from rest_framework import generics

from products.models import Product
from products.serializers import ProductSerializer


class ProductListView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(user=user)


class ProductView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
