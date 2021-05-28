import React from 'react';

import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';
import Header from '../Header/Header';
import Button from '@material-ui/core/Button';

function RegisterPage() {
  const history = useHistory();

  return (
    <div>
      <Header />
      <RegisterForm />

      <center>
        <p>Already a member?</p>
        <Button
          variant="outlined"
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/login');
          }}
        >
          Login
        </Button>
      </center>
    </div>
  );
}

export default RegisterPage;
