import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link } from '@material-ui/core';

import { get } from '../Utils/Crud';
import { StyledTableCell } from "./StyledTableCell";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function Stores() {
  const classes = useStyles();

  const [stores, setStores] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const urlShoppingLists = '/api/shopping-lists/';
  const urlStores = '/api/stores/';

  useEffect(() => {

    get(urlStores, setStores);

  }, [refresh])

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stores.map((store) => (
            <TableRow key={store.id}>
              <TableCell component="th" scope="row">
                <Link href={`/stores/${store.id}/`}>{store.name}</Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}