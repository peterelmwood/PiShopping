# django and drf
from django.urls import path, include
from rest_framework import routers

# local
from shoppinglists.views import ListItemViewSet, ShoppingListViewSet, StoreViewSet


router = routers.DefaultRouter()
router.register(r"list-items", ListItemViewSet)
router.register(r"shopping-lists", ShoppingListViewSet)
router.register(r"stores", StoreViewSet)


urlpatterns = [
    path("", include(router.urls))
]
