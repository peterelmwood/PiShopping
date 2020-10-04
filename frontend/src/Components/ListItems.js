import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { get } from '../Utils/Crud';
import { useParams, Link, useRouteMatch } from 'react-router-dom';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function ListItems(props) {
  let { id } = useParams();

  const classes = useStyles();

  const [listItems, setListItems] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const urlShoppingList = `/api/shopping-lists/${id}/`;

  useEffect(() => {
    console.log(id);
    get(urlShoppingList, setListItems);
    console.log(listItems);
  }, [refresh]);

  const Result = () => {

    if (listItems.length) {
      return (
        <TableContainer component={Paper}>
          <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell component="th" scope="row">
                    {item.name}
                  </TableCell>
                  <TableCell align="right">{item.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )
    }
    return <p>There are no list items defined.</p>
  }

  return Result;
}