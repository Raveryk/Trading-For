import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import {useSelector} from 'react-redux';
import Looks4Icon from '@material-ui/icons/Looks4';

import {AppBar, Toolbar, IconButton, Typography, Hidden, Drawer, Divider, Button} from '@material-ui/core';


function Nav() {
  const user = useSelector((store) => store.user);

  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  if (user.id != null) {
    loginLinkData.path = '/user';
    loginLinkData.text = 'Home';
  }

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
    console.log('You clicked me!', drawer)
    if (event.type === 'keydown') {
      return;
    }
    setDrawer(!drawer);
  };



  return (
    <div>
    <div className="nav">
    <Looks4Icon 
    onClick={toggleDrawer}/>
      <Link to="/home">
        <h2 className="nav-title">Trading For</h2>
      </Link>
      <div>
        <Link className="navLink" to={loginLinkData.path}>
          {loginLinkData.text}
        </Link>

        {user.id && (
          <>
            <Link className="navLink" to="/info">
              Info Page
            </Link>
            <LogOutButton className="navLink" />
          </>
        )}

        <Link className="navLink" to="/about">
          About
        </Link>
      </div>
    </div>
  </div>
  );
}

export default Nav;
