import React from 'react';

import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';
import Header from '../Header/Header';
import {Button, makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  btn: {
    backgroundColor: theme.palette.primary.main,
  }

}))

function RegisterPage() {
  const history = useHistory();
  const classes = useStyles();

  return (
    <div >
      <Header />
      <RegisterForm />

      <center>
        <p>Already a member?</p>
        <Button
          variant="outlined"
          type="button"
          className={classes.btn}
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
