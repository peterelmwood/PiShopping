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
import { Link } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function ListItems(props) {
  const classes = useStyles();

  const [listItems, setListItems] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const urlShoppingList = '/api/shopping-lists/{props.id}/';

  useEffect(() => {

    get(urlShoppingList, setListItems);

  }, [refresh])

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
                <Link href={"/lists/" + item.id + "/"}>{item.name}</Link>
              </TableCell>
              <TableCell align="right">{item.store}</TableCell>
              <TableCell align="right">{item.closed ? "Yes" : "No"}</TableCell>
              <TableCell align="right">{item.created}</TableCell>
              <TableCell align="right">{item.updated}</TableCell>
              {/* <TableCell align="right">{list.fat}</TableCell>
              <TableCell align="right">{list.carbs}</TableCell>
              <TableCell align="right">{list.protein}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}