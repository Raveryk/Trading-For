import React, { useState } from 'react';
import {List, ListItem} from '@material-ui/core';

import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import { useEffect } from 'react';

import '../Home/Home.css'

// CUSTOM COMPONENTS

function Home() {

  const dispatch = useDispatch();
  const [heading, setHeading] = useState('Welcome');

  useEffect(() => {
    dispatch({ type:'FETCH_POSTS'})
}, [])

  const posts = useSelector( (store) => store.posts )
  console.log(posts)

  

  return (
    <div className="container">
      <h2>Market Place Feed</h2>
      <div className="grid">
        <div className="grid-col grid-col_8">
          <List>
            {posts.map((post, i) => {
              return <ListItem key={i}><img className="browserImage" src={post.image_url}/>{post.username} traded a {post.title}</ListItem>
            })}
          </List>

        </div>
        
      </div>
    </div>
  );
}

export default Home;
