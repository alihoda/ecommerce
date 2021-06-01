from rest_framework import permissions, status
from rest_framework import generics
from rest_framework.response import Response

from products.models import Order, OrderItem, Product, ShippingAddress
from products.serializers import OrderSerializer


class OrderAddView(generics.CreateAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated, ]

    class Meta:
        model = Order

    def create(self, request, *args, **kwargs):
        user = request.user

        orderItems = request.data['orderItems']
        shippingAddr = request.data['shippingAddress']

        if not orderItems:
            return Response({'detail': 'No order item found'}, status=status.HTTP_400_BAD_REQUEST)
        # Create order
        order = Order.objects.create(
            user=user,
            payment_method=orderItems['paymentMethod'],
            tax_price=orderItems['taxPrice'],
            shipping_price=orderItems['shippingPrice'],
            total_price=orderItems['totalPrice'],
        )
        # Create shipping address
        shipping = ShippingAddress.objects.create(
            order=order,
            address=shippingAddr['address'],
            city=shippingAddr['city'],
            country=shippingAddr['country'],
            postal_code=shippingAddr['postalCode'],
        )
        # Create order items and set them to Order relation
        for obj in orderItems:
            product = Product.objects.get(id=obj['product'])

            item = OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                qty=obj['qty'],
                price=obj['price'],
                image=product.image.url
            )
        # Update item's countInStock
            product.countInStock -= item.qty
            product.save()

        serializer = self.get_serializer(order, many=False)
        return Response(serializer.data)
