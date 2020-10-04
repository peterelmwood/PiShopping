from django.shortcuts import get_object_or_404, render

from rest_framework import viewsets
from rest_framework.response import Response

from shoppinglists.models import ListItem, ShoppingList, Store
from shoppinglists.serializers import ShoppingListListSerializer, ListItemSerializer, StoreSerializer


class ShoppingListViewSet(viewsets.ModelViewSet):
    queryset = ShoppingList.objects.all()
    serializer_class = ShoppingListListSerializer

    def retrieve(self, request, pk=None):
        queryset = ShoppingList.objects.all()
        shopping_list = get_object_or_404(queryset, pk=pk)
        serializer = ShoppingListListSerializer(shopping_list)
        return Response(serializer.data)


class ListItemViewSet(viewsets.ModelViewSet):
    queryset = ListItem.objects.all()
    serializer_class = ListItemSerializer


class StoreViewSet(viewsets.ModelViewSet):
    queryset = Store.objects.all()
    serializer_class = StoreSerializer
