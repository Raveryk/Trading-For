import React, { useState } from 'react';
import List from '@material-ui/core/List';

import { useHistory } from 'react-router-dom';

// CUSTOM COMPONENTS

function Home() {
  const [heading, setHeading] = useState('Welcome');

  

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
