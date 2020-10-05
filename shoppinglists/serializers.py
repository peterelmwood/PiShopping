# third party
from rest_framework import serializers

# local Django
from shoppinglists.models import ShoppingList, ListItem, Store


class StoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Store
        fields = "__all__"


class ShoppingListListSerializer(serializers.ModelSerializer):

    class Meta:
        model = ShoppingList
        fields = "__all__"
        read_only_fields = ["created", "updated"]


class ListItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListItem
        fields = "__all__"


class ShoppingListDetailSerializer(serializers.ModelSerializer):
    listitems = ListItemSerializer(many=True)

    class Meta:
        model = ShoppingList
        fields = "__all__"
        read_only_fields = ["created", "updated"]
