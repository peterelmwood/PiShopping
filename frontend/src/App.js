import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { Drawer, AppBar, Divider, List, ListItem, ListItemIcon, makeStyles, Toolbar, Typography } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import ListItemText from '@material-ui/core/ListItemText';
import StoreIcon from "@material-ui/icons/Store";
import ListIcon from '@material-ui/icons/List';

import './App.css';
import ShoppingLists from "./Components/ShoppingLists";
import Stores from './Components/Stores';

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

function ListItemLink(props) {
  const { icon, primary, to } = props;

  const CustomLink = React.useMemo(
    () =>
      React.forwardRef((linkProps, ref) => (
        <Link ref={ref} to={to} {...linkProps} />
      )),
    [to],
  );

  return (
    <li>
      <ListItem button component={CustomLink}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

function App() {
  const classes = useStyles();
  return (
    <div className="App">
      <Router>
        <div>

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
                  <List component="nav">
                    <ListItemLink to={'/stores'} icon={<StoreIcon></StoreIcon>} primary="Stores"></ListItemLink>
                    <ListItemLink to={'/shoppinglists'} icon={<ListIcon />} primary="Shopping Lists"></ListItemLink>
                  </List>
                </div>
              </Drawer>
              <main className={classes.content}>
                <Toolbar />
                <Switch>
                  <Route path="/stores">
                    <Stores />
                  </Route>
                  <Route path="/shoppinglists">
                    <ShoppingLists />
                  </Route>
                  <Route>
                    <ShoppingLists />
                  </Route>
                </Switch>
              </main>
            </div>
          </body>
        </div>
      </Router>
    </div>
  );
}

export default App;
