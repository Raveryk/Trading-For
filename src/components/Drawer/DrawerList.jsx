import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';

import {List, ListItem} from '@material-ui/core';


function DrawerList() {

    const user = useSelector((store) => store.user);

  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  if (user.id != null) {
    loginLinkData.path = '/user';
    loginLinkData.text = 'Home';
  }

    return(
    <div>
      <List>
        <ListItem>
    <Link to="/home">
        <h2 className="nav-title">Trading For</h2>
      </Link>
      </ListItem>
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
            <LogOutButton className="navLink" />
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
        </List>
        </div>
    )
}

export default DrawerList;
