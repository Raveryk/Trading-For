import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  form: {
    padding: "2px",
  },
  formCard: {
    justifyContent: 'center',
    padding: '2%',
    paddingBottom: '100px',
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
    margin: "5px",
    backgroundColor: theme.palette.secondary.main,
  },
}));

function RegisterForm() {
  // Registration input values

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState("");

  // grab errors from reducer
  const errors = useSelector((store) => store.errors);

  const dispatch = useDispatch();

  const classes = useStyles();

  // send registration info to server
  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: "REGISTER",
      payload: {
        username: username,
        password: password,
        email: email,
        phoneNum: phoneNum,
      },
    });
  }; // end registerUser

  return (
    <Grid className={classes.formGrid} item xs={12} lg={12}>
      <Card className={classes.formCard} elevation={6}>
        <form className={classes.formCard} onSubmit={registerUser}>
          <Typography variant="h5">Register</Typography>
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
          <div >
            <Button
              className={classes.btn}
              variant="outlined"
              type="submit"
              name="submit"
            >
              Join
            </Button>
          </div>
        </form>
      </Card>
    </Grid>
  );
}

export default RegisterForm;
