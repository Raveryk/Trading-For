import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles, Button, Card, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  body: {
    height: 350,
  },
  card: {
    height: "100%",
    width: "75%",
    marginRight: "auto",
    marginLeft: "auto",
    borderRadius: 16,
  },
  btns: {
    textAlign: "center",
    marginTop: "20%",
  },
  btn: {
    margin: 10,
  },
  title: {
    textAlign: "center",
    marginTop: "4%",
  },
  stats: {
    textAlign: "center",
    margin: "4px",
  },
}));

import Header from "../Header/Header";

function Account() {
  // fetching posts by specific user to calculate stats
  useEffect(() => {
    dispatch({ type: "FETCH_ACCOUNT_BROWSER" });
  }, []);

  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  // ----REDUCERS---- //
  const browser = useSelector((store) => store.account.accountBrowser);
  console.log(browser);
  const user = useSelector((store) => store.user);
  console.log(user);

  // conditional to gather number of trades for specific user
  const tradeNums = () => {
    let tradeCount = 0;
    for (let post of browser) {
      if (post.traded === true) tradeCount++;
    }
    return tradeCount;
  };

  //sends to edit posts view
  const editPosts = () => {
    history.push("/edit/posts");
  };

  //sends to favorites view
  const toFavorites = () => {
    history.push(`/favorites/${user.id}`);
  };

  return (
    <div className={classes.body}>
      <Header />
      <Card elevation={8} className={classes.card}>
        <Typography className={classes.title} variant="h5">
          {user.username}'s Account
        </Typography>
        <h4 className={classes.stats}>
          <em>Posts</em>: {browser.length} <em>Trades</em>: {tradeNums()}
        </h4>
        <div className={classes.btns}>
          <Button
            className={classes.btn}
            variant="outlined"
            onClick={toFavorites}
          >
            Favorites
          </Button>
          <Button
            className={classes.btn}
            variant="outlined"
            onClick={editPosts}
          >
            Edit Posts
          </Button>
          {/* <Button className={classes.btn} variant="outlined">
            Edit Account
          </Button> */}
        </div>
      </Card>
    </div>
  );
}

export default Account;
