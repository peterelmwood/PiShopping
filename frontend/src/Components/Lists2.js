import React, { useState, useEffect, forwardRef } from "react";
import ReactDOM from "react-dom";
import MaterialTable from "material-table";

import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

import { del, get, post, update } from "../Utils/Crud";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const Lists2 = () => {
  const [shoppingLists, setShoppingLists] = useState([]);
  const [stores, setStores] = useState([]);
  const [refresh, setRefresh] = useState(true);

  const columns = [
    { title: 'Name', field: 'name' },
    { title: "Store", field: 'store', lookup: stores},
    { title: 'Closed', field: 'closed', lookup: { true: "Yes", false: "No" } },
    { title: 'Created', field: 'created', editable: "never" },
    { title: 'Updated', field: 'updated', editable: "never" },
  ];

  const urlShoppingLists = '/api/shopping-lists/';
  const urlStores = '/api/stores/';

  const shoppingListsCallback = (response) => {
    console.log(response);
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

  useEffect(() => {
    if (refresh){
      get(urlShoppingLists, shoppingListsCallback);
      get(urlStores, storesCallback);
    }
  }, [refresh])

  const printShoppingLists = () => {
    if (shoppingLists.length) {
      return shoppingLists[0].name;
    }
  }

  const postCallback = (response) => {
    console.log(response);
    setRefresh(true);
  }

  const patchCallback = (response) => {
    console.log(response);
    setRefresh(true);
  }

  const deleteCallback = (response) => {
    console.log(response);
    setRefresh(true);
  }

  return (
    <MaterialTable
      icons={tableIcons}
      title="Shopping Lists"
      columns={columns}
      data={shoppingLists}
      editable={{
        onRowAdd: newData =>
          post(newData, urlShoppingLists, postCallback),
        onRowUpdate: (newData, oldData) =>
          update(newData.id, 'PATCH', newData, urlShoppingLists, patchCallback)
        ,
        onRowDelete: oldData =>
          del(urlShoppingLists, oldData.id, deleteCallback)
        ,
      }}
    />
  )

}

export default Lists2;