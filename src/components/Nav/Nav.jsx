import React, { useState } from "react";
import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import "./Nav.css";
import { useSelector } from "react-redux";
import Looks4Icon from "@material-ui/icons/Looks4";
import Logo from "../Nav/TF_Logo_4.png";
import { useTheme } from "@material-ui/core/styles";

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Hidden,
  Drawer,
  Divider,
  Button,
  List,
  ListItem,
  makeStyles,
} from "@material-ui/core";

import DrawerList from "../Drawer/DrawerList";
import userReducer from "../../redux/reducers/user.reducer";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    marginBottom: 20,
  },
  title: {
    marginRight: "auto",
    marginLeft: "auto",
  },
  icon: {
    maxWidth: "30px",
    maxHeight: "30px",
    borderRadius: "50%",
  },
  
}));

function Nav() {
  const theme = useTheme();
  const classes = useStyles();
  const user = useSelector((store) => store.user);

  // let loginLinkData = {
  //   path: '/login',
  //   text: 'Login / Register',
  // };

  // if (user.id != null) {
  //   loginLinkData.path = '/user';
  //   loginLinkData.text = 'Home';
  // }

  // export default function TemporaryDrawer() {
  //   const [state, setState] = React.useState({
  //     top: false,
  //     left: false,
  //     bottom: false,
  //     right: false,
  //   });

  const [drawer, setDrawer] = useState(false);

  // function to toggle drawer being open or closed
  const toggleDrawer = (event) => {
    console.log("You clicked me!", drawer);
    if (event.type === "keydown") {
      return;
    }
    setDrawer(!drawer);
  };

  return (
    <div className={classes.toolbar}>
      <AppBar>
        <Toolbar>
          {user.id && (
            <>
            <IconButton>
              <img src={Logo} className={classes.icon} onClick={toggleDrawer} />
            </IconButton>
              <Drawer className={classes.navBar} variant="temporary" open={drawer} onClose={toggleDrawer}>
                <DrawerList />
              </Drawer>
            </>
          )}
          <div className={classes.title}>
            <h2 className={classes.title}>Trading For</h2>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Nav;
