import React, { useState } from 'react';
import List from '@material-ui/core/List';

import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import { useEffect } from 'react';

// CUSTOM COMPONENTS

function Home() {

  const dispatch = useDispatch();
  const [heading, setHeading] = useState('Welcome');

  useEffect(() => (
    dispatch({ type:'FETCH_POSTS'})
  ), [])

  const posts = useSelector( (store) => store.posts )
  console.log(posts)

  

  return (
    <div className="container">
      <h2>{heading}</h2>

      <div className="grid">
        <div className="grid-col grid-col_8">
          <p>
            Home Page Component
          </p>

        </div>
        
      </div>
    </div>
  );
}

export default Home;
