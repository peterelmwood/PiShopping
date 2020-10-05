from django.test import TestCase

from rest_framework.test import APIClient

from shoppinglists.models import ListItem, ShoppingList, Store


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

        self.assertEqual(response.status_code, 200)
