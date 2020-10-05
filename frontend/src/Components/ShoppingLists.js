import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link } from "react-router-dom";

import { get } from '../Utils/Crud';
import { StyledTableCell } from './StyledTableCell';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function ShoppingLists() {
  const classes = useStyles();

  const [shoppingLists, setShoppingLists] = useState([]);
  const [stores, setStores] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const urlShoppingLists = '/api/shopping-lists/';
  const urlStores = '/api/stores/';

  useEffect(() => {
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

  }, [refresh])

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <StyledTableCell>List Name</StyledTableCell>
            <StyledTableCell align="right">Store</StyledTableCell>
            <StyledTableCell align="right">Closed?</StyledTableCell>
            <StyledTableCell align="right">Created</StyledTableCell>
            <StyledTableCell align="right">Updated</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {shoppingLists.map((list) => (
            <TableRow key={list.id}>
              <TableCell component="th" scope="row">
                <Link to={`/shoppinglists/${list.id}/`}>{list.name}</Link>
              </TableCell>
              <TableCell align="right">{list.store}</TableCell>
              <TableCell align="right">{list.closed ? "Yes" : "No"}</TableCell>
              <TableCell align="right">{list.created}</TableCell>
              <TableCell align="right">{list.updated}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}