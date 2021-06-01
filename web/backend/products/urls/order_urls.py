from django.urls import path

from products.views import order_views as views

urlpatterns = [
    path('add/', views.OrderAddView.as_view(), name='add_order'),
]
