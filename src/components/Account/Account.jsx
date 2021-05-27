import React from 'react';
import {makeStyles, Button, Card} from '@material-ui/core';
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  body: {
    marginTop: 100,
  },
  card: {
    height: '80%',
    width: '50%',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: '75%',
    padding: 50,
  },
  btns: {
    textAlign: 'center',
    margin: 10
  },
  btn: {
    margin: 10,
  }

}))

function Account() {
const classes = useStyles();

const history = useHistory()

const editPosts = () => {
  history.push('/edit/posts')
}

  return (
    <div className={classes.body}>
      <Card elevation={8} className={classes.card}>
        <div className={classes.btns}>
          <Button className={classes.btn} variant="outlined" onClick={editPosts}>Edit Posts</Button>
          <Button className={classes.btn} variant="outlined">Edit Account</Button>
        </div>
      </Card>
    </div>
  );
}

export default Account;
