import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import {useSelector} from 'react-redux';
import Looks4Icon from '@material-ui/icons/Looks4';

import {AppBar, Toolbar, IconButton, Typography, Hidden, Drawer, Divider, Button, List, ListItem} from '@material-ui/core';
import { SettingsInputAntennaTwoTone } from '@material-ui/icons';

import DrawerList from '../Drawer/DrawerList'


function Nav() {
  // const user = useSelector((store) => store.user);

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
      </div>
    <Drawer 
    variant="temporary"
    open={drawer}
    onClose={toggleDrawer}
    >
      <DrawerList />
    </Drawer>
    </div>
  );
}

export default Nav;
