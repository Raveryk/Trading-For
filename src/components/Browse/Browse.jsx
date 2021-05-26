import React, { useState } from 'react';
import {List, ListItem, Modal, Card, makeStyles, Fade} from '@material-ui/core';

import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import { useEffect } from 'react';

import BrowseDetail from '../BrowseDetail/BrowseDetail'
// import '../Home/Home.css'

function rand() {
    return Math.round(Math.random() * 20) - 10;
  }

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  const useStyles = makeStyles(() => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: 'white',
      border: '2px solid #000',
      padding: '25%',
    },
  }));

function Browse() {

  const dispatch = useDispatch();
  const history = useHistory();


  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const [open, setOpen] = useState(false)

  const detail = useSelector( (store) => store.browser.detail )
  console.log('Detail item:', detail)

  const toDetail = (post) => {
      console.log(post.id)
      dispatch({ type: 'FETCH_DETAILS', payload: post.id })
      modalToggle();
    // history.push(`/browse/detail/${post.id}`)
  }

  const modalToggle = () => {
    setOpen(!open);
}

  useEffect(() => {
    dispatch({ type:'FETCH_BROWSER'})
}, [])

  const browser = useSelector( (store) => store.browser.browser )
  console.log(browser)

  const body = (
    <div style={modalStyle} className={classes.paper}>
    {detail.map((item, i) => {
        return (
    <Card > 
            <h3>{item.username}</h3>
            <p></p>
            <h3>{item.title}</h3>
            <img src={item.image_url}/>
            <p>{item.condition}</p>
            <p>{item.description}</p>
            <p>{item.wants}</p>      
    </Card> )
    })} 
</div>
  )


  

  return (
    <div className="container">
      <h2>Browse Trades</h2>
      <div className="grid">
        <div className="grid-col grid-col_8">
          <List>
            {browser.map((post, i) => {
                return <ListItem key={i} onClick={() => toDetail(post)}>{post.username}
               <img className="browserImage" src={post.image_url}/>{post.title}<p>{post.condition}</p></ListItem>
            })}
          </List>
        </div>
        <div>
            <Modal
            open={open}
            onClose={modalToggle}
            closeAfterTransition
            > 
            <Fade in={open}>
            {body}
            </Fade>        
            </Modal>
        </div>
      </div>
    </div>
  );
}

export default Browse;


