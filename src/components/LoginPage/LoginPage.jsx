import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button'

function LoginPage() {
  const history = useHistory();

  return (
    <div>
      <LoginForm />

      <center>
      <p>Want to join?</p>
        <Button
          variant="outlined"
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/registration');
          }}
        >
          Join the Band
        </Button>
      </center>
    </div>
  );
}

export default LoginPage;
