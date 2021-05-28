import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {makeStyles, Button, Card} from '@material-ui/core';
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  body: {
    height: 350
    
  },
  card: {
    height: '100%',
    width: '75%',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: '50%',
    borderRadius: 16,

  },
  btns: {
    textAlign: 'center',
    marginTop: '20%'
  },
  btn: {
    margin: 10,
  },
  title: {
    textAlign: 'center',
  },
  stats: {
    textAlign: 'center',
    margin: '4px',
  },
  contents: {

  }

}))

function Account() {

  useEffect(() => {
    dispatch({ type: "FETCH_ACCOUNT_BROWSER" });
  }, []);
const classes = useStyles();

const history = useHistory();
const dispatch = useDispatch();

const browser = useSelector(store => store.account.accountBrowser);
console.log(browser)
const user = useSelector(store => store.user);
console.log(user)

// conditional to gather number of trades for specific user
const tradeNums = () => {
  let tradeCount = 0;
  for(let post of browser) {
    if(post.traded === true)
    tradeCount++
  }
  return tradeCount;
}


const editPosts = () => {
  history.push('/edit/posts')
}

  return (
    <div className={classes.body}>
      <Card elevation={8} className={classes.card}>
        <div className={classes.contents}>
        <h2 className={classes.title}>{user.username}'s Account</h2>
        <h4 className={classes.stats}><em>Posts</em>:{browser.length}    <em>Trades</em>:{tradeNums()}</h4>
        <div className={classes.btns}>
          <Button className={classes.btn} variant="outlined" onClick={editPosts}>Edit Posts</Button>
          <Button className={classes.btn} variant="outlined">Edit Account</Button>
        </div>
        </div>
      </Card>
    </div>
  );
}

export default Account;
