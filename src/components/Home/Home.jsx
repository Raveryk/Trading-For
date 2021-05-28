import React, { useState } from 'react';
import {List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider, makeStyles} from '@material-ui/core';

import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    // overflow: 'auto',
    width: 225,
    height: '75%',
    backgroundColor: "#81ac8d",
    border: "2px solid #000",
    padding: "5%",
    borderRadius: 16,
  },
  image: {
    display: 'block',
    maxWidth: '75px',
    maxHeight: '75px', 
    marginLeft: 'auto',
    marginRight: 'auto',
       
  },
  list: {
    width: '100%',
    maxWidth: 360,
  },
  avatars: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginRight: theme.spacing(1)
  },
  title: {
    textAlign: 'center'
  },
  divider: {
    marginBottom: '5px'
  },
  contact: {
    backgroundColor: "whitesmoke",
  },
  modal: {
    margin: '0 auto', 
    display: "flex"
  },
  button: {
    margin: '0 auto', 
    display: "flex"
  },
  info: {
    overflow: 'auto', 
    maxHeight: 100,
    height: 100,
  },
  modalPic: {
    overflow: 'auto', 
    minHeight: 75,
    height: 75,
  },
  browse: {
    marginTop: 200,
  },
  title: {
    textAlign: 'center'
  }
}));

function Home() {

  const classes = useStyles();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type:'FETCH_POSTS'})
}, [])

  const posts = useSelector( (store) => store.posts )
  console.log(posts)

  const feedText = (post) => {
    return (
      <>
      
        {post.username} traded a {post.title}.
     
      </>
    )
  }

  

  return (
    <div className={classes.browse}>
      <h2 className={classes.title}>Market Place Feed</h2>
      <div className="grid">
        <div className="grid-col grid-col_8">
        <List className={classes.list}>
            {posts.map((post, i) => {
              return (
                  <>
                <ListItem key={i} >
                    <ListItemAvatar>
                        <Avatar variant="square" className={classes.avatars} src={post.image_url} />
                    </ListItemAvatar>
                  <ListItemText
                    primary={feedText(post)}
                    
                  />
                </ListItem>
                <Divider />
                </>
              );
            })}
          </List>

        </div>
        
      </div>
    </div>
  );
}

export default Home;

