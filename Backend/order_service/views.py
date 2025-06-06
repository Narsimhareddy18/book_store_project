

# Create your views here.

from rest_framework import viewsets
from .models import Order
from .serializers import OrderSerializer
from rest_framework.permissions import IsAuthenticated  # ✅ Add this



class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

