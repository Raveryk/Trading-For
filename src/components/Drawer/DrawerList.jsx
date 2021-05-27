import React, { useState } from "react";
import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector } from "react-redux";

import "../Nav/Nav.css";

import { List, ListItem, Typography, Divider, makeStyles } from "@material-ui/core";
import Logo from "../Nav/TF_Logo_4.png";

const useStyles = makeStyles((theme) => ({
  icon: {
    maxWidth: "30px",
    maxHeight: "30px",
    borderRadius: "50%",
  },
  list: {
      width: 200,
  }
  
}));


function DrawerList() {
  const classes = useStyles();
  const user = useSelector((store) => store.user);
  console.log(user);

  let loginLinkData = {
    path: "/login",
    text: "Login / Register",
  };

  if (user.id != null) {
    loginLinkData.path = "/user";
    loginLinkData.text = "Home";
  }

  return (
    <div className={classes.list}>
      <div >
        <img src={Logo} className={classes.icon}/>
        <Typography>
        Welcome back, 
        <br/>{user.username}!
      </Typography>
      </div>
      <Divider />
      <List>
        <div>
          <ListItem>
            <Link className="navLink" to={loginLinkData.path}>
              {loginLinkData.text}
            </Link>
          </ListItem>
        </div>
        <div>
          <ListItem>
            <Link className="navLink" to="/browse">
              Browse
            </Link>
          </ListItem>
        </div>
        <div>
          <ListItem>
            <Link className="navLink" to="/post">
              Post
            </Link>
          </ListItem>
        </div>
        <div>
          <ListItem>
            {user.id && (
              <>
                <Link className="navLink" to="/account">
                  Account
                </Link>
              </>
            )}
          </ListItem>
        </div>
        <div>
          <ListItem>
            {user.id && (
              <>
                <LogOutButton className="navLink" />
              </>
            )}
          </ListItem>
        </div>
        
      </List>
    </div>
  );
}

export default DrawerList;
