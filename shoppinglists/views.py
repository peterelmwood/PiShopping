from shoppinglists.models import ListItem, ShoppingList, Store
from django.shortcuts import render

from rest_framework import viewsets

from shoppinglists.serializers import ShoppingListSerializer, ListItemSerializer, StoreSerializer


class ShoppingListViewSet(viewsets.ModelViewSet):
    queryset = ShoppingList.objects.all()
    serializer_class = ShoppingListSerializer


class ListItemViewSet(viewsets.ModelViewSet):
    queryset = ListItem.objects.all()
    serializer_class = ListItemSerializer


class StoreViewSet(viewsets.ModelViewSet):
    queryset = Store.objects.all()
    serializer_class = StoreSerializer
