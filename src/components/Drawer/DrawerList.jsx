import React, { useState } from "react";
import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector } from "react-redux";

import "../Nav/Nav.css";

import { List, ListItem, ListItemAvatar, Avatar, Typography, Divider, makeStyles } from "@material-ui/core";
import HomeIcon from '@material-ui/icons/Home';
import ViewListIcon from '@material-ui/icons/ViewList';
import PostAddIcon from '@material-ui/icons/PostAdd';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import Logo from "../Nav/TF_Logo_4.png";

const useStyles = makeStyles((theme) => ({
  icon: {
    maxWidth: "60px",
    maxHeight: "60px",
    borderRadius: "50%",
  },
  list: {
      width: 175,
  },
  welcome: {
    margin: 10,
  }
  
}));


function DrawerList({toggleDrawer}) {
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
        <Typography className={classes.welcome}>
        Welcome back, 
        <br/><b>{user.username}!</b>
      </Typography>
      </div>
      <Divider />
      <List>
        <div>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <HomeIcon />
              </Avatar>
            </ListItemAvatar>
            <Link className="navLink" to={loginLinkData.path} onClick={toggleDrawer}>
              {loginLinkData.text}
            </Link>
          </ListItem>
        </div>
        <div>
          <ListItem>
          <ListItemAvatar>
              <Avatar>
                <ViewListIcon />
              </Avatar>
            </ListItemAvatar>
            <Link className="navLink" to="/browse" onClick={toggleDrawer}>
              Browse
            </Link>
          </ListItem>
        </div>
        <div>
          <ListItem>
          <ListItemAvatar>
              <Avatar>
                <PostAddIcon />
              </Avatar>
            </ListItemAvatar>
            <Link className="navLink" to="/post" onClick={toggleDrawer}>
              Post
            </Link>
          </ListItem>
        </div>
        <div>
          <ListItem>
            {user.id && (
              <>
              <ListItemAvatar>
              <Avatar>
                <AccountCircleIcon />
              </Avatar>
            </ListItemAvatar>
                <Link className="navLink" to="/account" onClick={toggleDrawer}>
                  Account
                </Link>
              </>
            )}
          </ListItem>
        </div>
        <div>
          <ListItem>
          <ListItemAvatar>
              <Avatar>
                <ExitToAppIcon />
              </Avatar>
            </ListItemAvatar>
            {user.id && (
              <>
                <LogOutButton className="navLink" onClick={toggleDrawer}/>
              </>
            )}
          </ListItem>
        </div>
        
      </List>
    </div>
  );
}

export default DrawerList;
