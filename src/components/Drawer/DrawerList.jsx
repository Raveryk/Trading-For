import React, { useState } from "react";
import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector } from "react-redux";

import "../Nav/Nav.css";

import { List, ListItem, Typography} from "@material-ui/core";
import Looks4Icon from '@material-ui/icons/Looks4';


function DrawerList() {
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
    <div>
      
      <List>
        <Looks4Icon />
        <Typography>
        Welcome back, {user.username}!
      </Typography>
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
