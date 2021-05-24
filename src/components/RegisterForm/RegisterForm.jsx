import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  form: {
    padding: '2%',
    alignContent: 'center',
    justifyContent: 'center',
  },
  btn: {
    alignContent: 'center',
    justifyContent: 'center',

  },
  formCard: {
    justifyContent: 'center',
    padding: '2%',

  }
})

function RegisterForm() {

  

  
  const [username, setUsername] = useState('');
  // console.log('username:', username)
  const [password, setPassword] = useState('');
  // console.log('password:', password)
  const [email, setEmail] = useState('');
  // console.log('email:', email)
  const [phoneNum, setPhoneNum] = useState('');
  // console.log('phoneNum:', phoneNum)


  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const classes= useStyles();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
        email: email,
        phoneNum: phoneNum
      },
    });
  }; // end registerUser

  return (
    <Grid item xs={12}>
    <Card elevation={4}>
    <form className={classes.formCard} onSubmit={registerUser}>
      <h2 >Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div>
          <TextField
            className={classes.form}
            placeholder="Username"
            type="text"
            name="username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
      </div>
      <div>
          <TextField
            className={classes.form}
            placeholder="Password"
            type="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
      </div>
      <div>
          <TextField
            className={classes.form}
            placeholder="email"
            type="text"
            name="email"
            value={email}
            required
            onChange={(event) => setEmail(event.target.value)}
          />
      </div>
      <div>
          <TextField
            className={classes.form}
            placeholder="phone #"
            type="text"
            name="phoneNum"
            value={phoneNum}
            required
            onChange={(event) => setPhoneNum(event.target.value)}
          />
      </div>
      <div className={classes.btn}>
        <Button  type="submit" name="submit">Register</Button>
      </div>
    </form>
  </Card>
  </Grid>
  );
}

export default RegisterForm;
