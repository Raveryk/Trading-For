import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  form: {
    padding: '2%',
  },
  formCard: {
    justifyContent: 'center',
    padding: '2%',
    textAlign: 'center',
    backgroundColor: '#c8e6c9'

  },
  formGrid: {
    marginRight: '20px',
    marginLeft: '20px',
    direction: 'column',
    marginBottom: '10px',
  },
  btn: {
    margin: '5px'
  }
})

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const classes = useStyles()

  const login = (event) => {
    event.preventDefault();

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
    <Grid container >
    <Grid className={classes.formGrid} item xs={12} >
    <Card elevation={6} >
    <form className={classes.formCard} onSubmit={login}>
      <h2>Backstage Pass</h2>
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
    </Grid>
  );
}

export default LoginForm;
