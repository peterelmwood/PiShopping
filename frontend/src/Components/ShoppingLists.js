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
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from "@material-ui/core/TextField";
import Modal from "@material-ui/core/Modal";
import Grid from '@material-ui/core/Grid';

import { get, post, del } from '../Utils/Crud';
import { StyledTableCell } from './StyledTableCell';
import { MenuItem, Select } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function ShoppingLists() {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [shoppingLists, setShoppingLists] = useState([]);
  const [stores, setStores] = useState([]);
  const [refresh, setRefresh] = useState(true);

  // Form Fields
  const [newName, setNewName] = useState('');
  const [store, setStore] = useState(0);


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
      setStores(response)
    }

    get(urlShoppingLists, shoppingListsCallback);
    get(urlStores, storesCallback);

  }, [refresh])

  const handleClose = () => {
    setOpen(false);
  }

  const handleOpen = () => {
    setOpen(true);
  }

  const handleAfterPost = () => {
    handleClose();
    setRefresh(true);
  }

  function postList() {
    const body = {
      name: newName,
      store: store
    }
    if (newName !== "" && store !== 0)
      post(body, urlShoppingLists, handleAfterPost);
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  }
  const handleStoreChange = (e) => {
    setStore(e.target.value);
  }

  function GetForm() {
    return (
      <form>
        <Grid container spacing={3}>
          <Grid item xs="3" />
          <Grid item xs="6">
            <TextField label="Name" onChange={handleNameChange}></TextField>
            <Select label="Store" onChange={handleStoreChange}>
              {stores.map((store) => (
                <MenuItem value={store.id} key={store.name} >
                  {store.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
        <Button type="button" onClick={postList}>Submit</Button>
      </form>
    )
  }

  const deleteThis = (id) => {
    del(urlShoppingLists, id)
    setRefresh(true);
  }

  return (
    <>
      <Button type="button" onClick={handleOpen}>
        <AddIcon></AddIcon>
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        {GetForm()}
      </Modal>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <StyledTableCell>List Name</StyledTableCell>
              <StyledTableCell align="right">Store</StyledTableCell>
              <StyledTableCell align="right">Closed?</StyledTableCell>
              <StyledTableCell align="right">Created</StyledTableCell>
              <StyledTableCell align="right">Updated</StyledTableCell>
              <StyledTableCell align="right">Delete</StyledTableCell>
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
                <TableCell>
                  <Link onClick={() => deleteThis(list.id)}>
                    <DeleteIcon></DeleteIcon>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}