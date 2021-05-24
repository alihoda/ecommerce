from django.contrib.auth.models import User
from django.db import models


class Product(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    image = models.ImageField(null=True, blank=True)
    brand = models.CharField(max_length=100, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    price = models.DecimalField(max_digits=7, decimal_places=2, default=0)
    rating = models.DecimalField(max_digits=7, decimal_places=2, default=0)
    numReviews = models.IntegerField(null=True, blank=True, default=0)
    countInStock = models.IntegerField(null=True, blank=True, default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self) -> str:
        return self.name


class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    rating = models.IntegerField(null=True, blank=True, default=0)
    comment = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self) -> str:
        return str(self.rating)


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    payment_method = models.CharField(max_length=100, null=True, blank=True)
    tax_price = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    shipping_price = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    total_price = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    is_paid = models.BooleanField(default=False)
    is_delivered = models.BooleanField(default=False)
    paid_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    delivered_at = models.DateTimeField(
        auto_now_add=True, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return str(self. created_at)


class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    qty = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(max_digits=7, decimal_places=2, default=0)
    image = models.CharField(max_length=200, null=True, blank=True)

    def __str__(self) -> str:
        return self.name


class ShippingAddress(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE)
    address = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    shipping_price = models.DecimalField(
        max_digits=7, decimal_places=2, default=0)

    def __str__(self) -> str:
        return self.address
