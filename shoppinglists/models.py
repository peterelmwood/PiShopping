from django.db import models


class Store(models.Model):
    # name of the store
    name = models.CharField(max_length=50, blank=False)


class ShoppingList(models.Model):
    # this will automatically get set when the list is created
    created = models.DateTimeField(auto_now_add=True)

    # this will automatically get set when the list is updated
    # Note: the list does not get 'updated' when items are added
    #       or removed
    updated = models.DateTimeField(auto_now=True)

    # the list needs a name
    name = models.CharField(max_length=50, blank=False, null=False)

    # date the list was closed
    closed = models.BooleanField(default=False)

    # this attribute relates the shopping list to a specific store
    store = models.ForeignKey(
        Store, related_name="lists", null=False, on_delete=models.CASCADE
    )

    # we override the save to automatically capture
    # the date the list is closed
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)


class ListItem(models.Model):
    # each item should have a name
    name = models.CharField(max_length=100, blank=False)

    # each item should have a quantity which needs to be purchased
    quantity = models.PositiveIntegerField(default=1)

    # this attribute relates the list item to a specific shopping list
    shopping_list = models.ForeignKey(
        ShoppingList, related_name="listitems", null=False, on_delete=models.CASCADE
    )
