import React, { useState } from 'react';
import {Card, CardContent, CardMedia} from '@material-ui/core';

import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import { useEffect } from 'react';


function BrowseDetail() {
  // grabbing dynamic part of Url
  let { id } = useParams();
  console.log(id);

  // using id to call the same id on page load.
  useEffect(() => {
    dispatch({ type: 'FETCH_DETAILS', payload: id });
  }, []);

  const dispatch = useDispatch();


  // grabbing details from reducer
  const detail = useSelector( (store) => store.browser.detail )
  console.log(detail)

  

  return (
    <div >
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
  );
}

export default BrowseDetail;
