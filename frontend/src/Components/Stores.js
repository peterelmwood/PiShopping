import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from "@material-ui/core/TextField";
import Modal from "@material-ui/core/Modal";
import Grid from '@material-ui/core/Grid';

import { del, get, post } from '../Utils/Crud';
import { StyledTableCell } from "./StyledTableCell";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function Stores() {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [stores, setStores] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [newName, setNewName] = useState('');

  const urlStores = '/api/stores/';

  useEffect(() => {
    if (refresh) {
      get(urlStores, setStores);
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

  function postStore() {
    const body = {
      name: newName,
    }
    if (newName !== "")
      post(body, urlStores, handleAfterPost);
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  }

  function GetForm() {
    return (
      <form>
        <Grid container spacing={3}>
          <Grid item xs="3" />
          <Grid item xs="6">
            <TextField label="Name" onChange={handleNameChange}></TextField>
          </Grid>
        </Grid>
        <Button type="button" onClick={postStore}>Submit</Button>
      </form>
    )
  }

  const deleteThis = (id) => {
    del(urlStores, id);
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
              <StyledTableCell>Store Name</StyledTableCell>
              <StyledTableCell>Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stores.map((store) => (
              <TableRow key={store.id}>
                <TableCell component="th" scope="row">
                  <Link href={`/stores/${store.id}/`}>{store.name}</Link>
                </TableCell>
                <TableCell>
                  <Link onClick={() => deleteThis(store.id)}>
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
