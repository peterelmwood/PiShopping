from shoppinglists.models import ListItem, ShoppingList, Store
from django.test import TestCase

from rest_framework.test import APIClient

# Create your tests here.

class ListTest(TestCase):
    
    def setUp(self) -> None:
        
        # create stores
        self.store = Store.objects.create(
            name="Dorignac's"
        )

        # create shopping list
        self.shopping_list = ShoppingList.objects.create(
            name="October",
            store=self.store
        )

        # create item
        self.item = ListItem.objects.create(
            name="Fudge",
            quantity=1,
            shopping_list=self.shopping_list
        )



    def test_something_can_happen(self):
        api_client = APIClient()

        response = api_client.get(f"/api/shopping-lists/{self.shopping_list.id}/")

        print("response: ", response)
        print("response.data: ", response.data)