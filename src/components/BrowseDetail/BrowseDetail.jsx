import React, { useState } from 'react';
import {Card} from '@material-ui/core';

import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import { useEffect } from 'react';


function BrowseDetail() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type:'FETCH_DETAILS'})
}, [])

  const detail = useSelector( (store) => store.browser.detail )
  console.log(detail)

  

  return (
    <div className="container">
        <Card>
            <p>Detail Here</p>
        </Card>
    </div>
  );
}

export default BrowseDetail;
