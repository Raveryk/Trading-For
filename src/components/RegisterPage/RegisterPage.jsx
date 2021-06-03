import React from 'react';

import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';
import Header from '../Header/Header';
import {Button, makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  body: {
    // backgroundColor: theme.palette.secondary.sand,
    // padding: '5%',
    // paddingBottom: '100%',
    // border: '2px solid',
    // borderColor: theme.palette.primary.main
  },
  btn: {
    backgroundColor: theme.palette.primary.main,
  }

}))

function RegisterPage() {
  const history = useHistory();
  const classes = useStyles();

  return (
    <div className={classes.body}>
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
