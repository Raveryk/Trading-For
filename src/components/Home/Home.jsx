import React, { useState } from 'react';
import {List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider, makeStyles, Typography} from '@material-ui/core';
import Header from '../Header/Header';

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
    marginRight: theme.spacing(1),
    border:  "1px solid",
    borderColor: theme.palette.primary.main,
  },
  title: {
    textAlign: 'center',
    fontFamily: 'sans-serif',
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
  
  feedText: {
    fontSize: '12px'
  },
  nameText: {
    fontSize: '15px'
  },
  titleText: {
    textTransform: 'uppercase',
  }
}));

function Home({drawer, setDrawer}) {

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
      
        <b className={classes.nameText}>{post.username}</b><a className={classes.feedText}> traded a </a><div className={classes.titleText}>{post.title}</div>
     
      </>
    )
  }

  

  return (
    <div>
      <Header />
      <Typography className={classes.title} variant="h5">Marketplace Feed</Typography>
      <div className="grid">
        <div className="grid-col grid-col_8">
          <Divider />
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

