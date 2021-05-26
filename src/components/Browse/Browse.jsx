import React, { useState } from 'react';
import {List, ListItem} from '@material-ui/core';

import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import { useEffect } from 'react';

import '../Home/Home.css'

// CUSTOM COMPONENTS

function Browse() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type:'FETCH_BROWSER'})
}, [])

  const browser = useSelector( (store) => store.browser )
  console.log(browser)

  

  return (
    <div className="container">
      <h2>Browse Trades</h2>
      <div className="grid">
        <div className="grid-col grid-col_8">
          <List>
            {browser.map((post, i) => {
                return <ListItem key={i}>{post.username}
               <img className="browserImage" src={post.image_url}/>{post.title}<p>{post.condition}</p></ListItem>
            })}
          </List>

        </div>
        
      </div>
    </div>
  );
}

export default Browse;
