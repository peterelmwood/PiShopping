# third party
from rest_framework import serializers

# local Django
from shoppinglists.models import ShoppingList, ListItem, Store

class ShoppingListSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShoppingList
        fields = "__all__"
        
class ListItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListItem
        fields = "__all__"
        
        
class StoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Store
        fields = "__all__"
