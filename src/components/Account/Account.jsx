import React from 'react';

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function Account() {
  return (
    <div className="container">
      <p>This will be my Account Component</p>
    </div>
  );
}

export default Account;
