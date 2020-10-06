import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useParams } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from "@material-ui/core/TextField";
import Modal from "@material-ui/core/Modal";
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { StyledTableCell } from './StyledTableCell';
import { get, del, post } from '../Utils/Crud';
import { Link } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function ListItems(props) {
  let { id } = useParams();

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const [listItems, setListItems] = useState([]);
  // Form Fields
  const [newName, setNewName] = useState('');
  const [quantity, setQuantity] = useState(0);

  const urlShoppingList = `/api/shopping-lists/${id}/`;
  const urlListItem = `/api/list-items/`;

  function populateTheList(response) {
    // setShoppingList(response);
    setListItems(response.listitems);
  }

  useEffect(() => {
    if (refresh) {
      get(urlShoppingList, populateTheList);
      setRefresh(false);
    }
  }, [refresh]);

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

  function postItem() {
    const body = {
      name: newName,
      shopping_list: id,
      quantity: quantity,
    }
    if (newName !== "")
      post(body, urlListItem, handleAfterPost);
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  }
  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  }

  function GetForm() {
    return (
      <form>
        <Grid container spacing={3}>
          <Grid item xs="3" />
          <Grid item xs="6">
            <TextField label="Name" onChange={handleNameChange}></TextField>
            <TextField type="number" label="Quantity" onChange={handleQuantityChange}></TextField>
          </Grid>
        </Grid>
        <Button type="button" onClick={postItem}>Submit</Button>
      </form>
    )
  }

  const deleteThis = (id) => {
    del(urlListItem, id)
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
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Quantity</StyledTableCell>
              <StyledTableCell>Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listItems.map((item) => (
              <>
                <TableRow key={item.id} onClick={() => { console.log(item.id + " was clicked") }}>
                  <TableCell component="th" scope="row">
                    {item.name}
                  </TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>
                    <Link onClick={() => deleteThis(item.id)}>
                      <DeleteIcon></DeleteIcon>
                    </Link>
                  </TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}