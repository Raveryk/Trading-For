import React, { useState } from "react";
import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector } from "react-redux";

import "../Nav/Nav.css";

import { List, ListItem, Typography} from "@material-ui/core";

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
        <ListItem>
          <Link to="/home">
            <h2 className="nav-title">Trading For</h2>
          </Link>
        </ListItem>
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
            {user.id && (
              <>
                <Link className="navLink" to="/info">
                  Info Page
                </Link>
              </>
            )}
          </ListItem>
        </div>
        <div>
          <ListItem>
            <Link className="navLink" to="/about">
              About
            </Link>
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
