import React from 'react';
import {useSelector} from 'react-redux';
import Home from '../Home/Home';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <Home />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
