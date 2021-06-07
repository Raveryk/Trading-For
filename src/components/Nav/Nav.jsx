import React, { useState, useEffect } from "react";
import "./Nav.css";
import { useSelector } from "react-redux";
import Logo from "../Nav/TF_Logo_4.png";
import { useTheme } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";

import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  makeStyles,
  Typography,
} from "@material-ui/core";

import DrawerList from "../Drawer/DrawerList";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    marginBottom: 20,
  },
  title: {
    marginRight: "auto",
    marginLeft: "auto",
    fontFamily: "sans-serif",
    letterSpacing: "10px",
    fontSize: "",
  },
  icon: {
    maxWidth: "40px",
    maxHeight: "40px",
    borderRadius: "50%",
  },
}));

function Nav() {
  useEffect(() => {
    setDrawer(false);
  }, []);

  // const theme = useTheme();
  const classes = useStyles();

  const user = useSelector((store) => store.user);

  const [drawer, setDrawer] = useState(false);

  // function to toggle drawer being open or closed
  const toggleDrawer = () => {
    setDrawer(!drawer);
    console.log("in toggle drawer", drawer);
  };

  return (
    <div className={classes.toolbar}>
      <AppBar>
        <Toolbar>
          {/* {user.id && (
            <> */}
          <IconButton onClick={toggleDrawer}>
            <MenuIcon className={classes.icon} />
          </IconButton>
          <Drawer
            className={classes.navBar}
            open={drawer}
            onClose={toggleDrawer}
          >
            <DrawerList toggleDrawer={toggleDrawer} />
          </Drawer>
          {/* </>
          )} */}
          {/* <div className={classes.title}>
            <Typography className={classes.title} variant="h5">TRADINGFOR</Typography>
          </div> */}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Nav;
