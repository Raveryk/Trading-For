import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import Header from '../Header/Header'
import { useHistory } from 'react-router-dom';

import {Typography} from '@material-ui/core'

import Button from '@material-ui/core/Button'

function LoginPage() {
  const history = useHistory();

  return (
    <div>
      <Header />
      <LoginForm />

      <center>
      <Typography><p>Want to join?</p></Typography>
        <Button
          variant="outlined"
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/registration');
          }}
        >
          Register
        </Button>
      </center>
    </div>
  );
}

export default LoginPage;
