import React from 'react';
import { Drawer, AppBar, Divider, List, ListItem, ListItemIcon, makeStyles, Toolbar, Typography } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import StoreIcon from "@material-ui/icons/Store";
import ListIcon from '@material-ui/icons/List';

import Lists2 from "./Components/Lists2";
import './App.css';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function App() {
  const classes = useStyles();
  return (
    <div className="App">
      <body>
        <div className={classes.root}>
          <CssBaseline />
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" noWrap>
                Shopping with Pi
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <Toolbar />
            <div className={classes.drawerContainer}>
              <List>
                <ListItem button key="Stores">
                  <ListItemIcon><StoreIcon /></ListItemIcon>
                  <ListItemText primary="Stores" />
                </ListItem>
                <ListItem button key="Shopping Lists">
                  <ListItemIcon><ListIcon /></ListItemIcon>
                  <ListItemText primary="Shopping Lists" />
                </ListItem>
              </List>
            </div>
          </Drawer>
          <main className={classes.content}>
            <Toolbar />
            <Lists2></Lists2>
          </main>
        </div>
      </body>
    </div>
  );
}

export default App;
