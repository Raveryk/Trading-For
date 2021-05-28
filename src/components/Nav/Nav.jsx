import React, { useState } from "react";
import "./Nav.css";
import { useSelector } from "react-redux";
import Logo from "../Nav/TF_Logo_4.png";
import { useTheme } from "@material-ui/core/styles";

import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  makeStyles,
} from "@material-ui/core";

import DrawerList from "../Drawer/DrawerList";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    marginBottom: 20,
  },
  title: {
    marginRight: "auto",
    marginLeft: 'auto',
  },
  icon: {
    maxWidth: "40px",
    maxHeight: "40px",
    borderRadius: "50%",
  },
  
}));

function Nav() {
  // const theme = useTheme();
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

  const [drawer, setDrawer] = useState(false);

  // function to toggle drawer being open or closed
  const toggleDrawer = (event) => {
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
                <DrawerList toggleDrawer={toggleDrawer}/>
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
