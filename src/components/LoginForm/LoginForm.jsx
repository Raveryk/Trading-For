import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';

import {Card, Grid, Button, TextField, Typography, makeStyles, ThemeProvider} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  form: {
    padding: '2px',
  },
  formCard: {
    justifyContent: 'center',
    padding: '2%',
    textAlign: 'center',
    backgroundColor: '#c8e6c9',
    width: '250px',
    height: '150px',
    marginRight: 'auto',
    marginLeft: 'auto'

  },
  formGrid: {
    marginRight: '10%',
    marginLeft: '10%',
    direction: 'column',
    marginBottom: '10px',
    marginTop: '10%',

  },
  btn: {
    margin: '5px',
    backgroundColor: theme.palette.secondary.main,
  },
}))

function LoginForm() {

  // --- LOCAL STATE --- //
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // grabs error messages from errors reducer
  const errors = useSelector(store => store.errors);

  const dispatch = useDispatch();

  const classes = useStyles()

  const login = (event) => {
    event.preventDefault();
    //conditional to login or send error message
    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    
    <Grid className={classes.formGrid} item xs={12} lg={12}>
    <Card className={classes.formCard} elevation={6}>
    <form  onSubmit={login}>
      <Typography variant="h5">Log In</Typography>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
      <div>
          <TextField
            className={classes.form}
            placeholder="username"
            type="text"
            name="username"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
      </div>
      <div>
          <TextField
            className={classes.form}
            placeholder="password"
            type="password"
            name="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
      </div>
      <div>
        <Button variant="outlined" className={classes.btn} type="submit" name="submit" value="Log In">Sign In</Button>
      </div>
    </form>
    </Card>
    </Grid>
    
  );
}

export default LoginForm;
