import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';

import { get } from "../Utils/Crud";

const columns = [
  { field: 'id', headerName: 'List Name', hide: true },
  { field: 'name', headerName: 'List Name', width: 130 },
  { field: 'store', headerName: 'Store', width: 130 },
  { field: 'closed', headerName: 'Closed?', width: 130 },
];

export default function ShoppingLists2() {

  const [shoppingLists, setShoppingLists] = React.useState([]);
  const [stores, setStores] = React.useState([]);
  const [refresh, setRefresh] = React.useState(false);

  const urlShoppingLists = '/api/shopping-lists/';
  const urlStores = '/api/stores/';

  React.useEffect(() => {
    const shoppingListsCallback = (response) => {
      setShoppingLists(response);
      if (refresh) {
        setRefresh(false)
      }
    }

    const storesCallback = (response) => {
      console.log(response);
      const stores = response.map((store) => {
        let rObj = {};
        rObj[store.id] = store.name;
        return rObj;
      });
      console.log("stores: ", stores);
      setStores(stores);
      if (refresh) {
        setRefresh(false)
      }
    }
    get(urlShoppingLists, shoppingListsCallback);
    get(urlStores, storesCallback);

  }, [refresh]);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={shoppingLists} columns={columns} pageSize={5} checkboxSelection />
    </div>
  );
}
