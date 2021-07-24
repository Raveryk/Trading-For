import React, { useState } from "react";
import {
  Box,
  makeStyles,
  Paper,
  Divider,
  IconButton,
  Button,
  Slide,
} from "@material-ui/core";

import CloseIcon from "@material-ui/icons/Close";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PhoneIcon from '@material-ui/icons/Phone';

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "fixed",
    overflow: "hidden",
    width: 225,
    backgroundColor: "#81ac8d",
    border: "2px solid #000",
    padding: "20px",
    borderRadius: 16,
    outline: 0,
    left: '50%',
    right: '50%',
  },
  image: {
    display: "block",
    maxWidth: "75px",
    maxHeight: "75px",
    marginLeft: "auto",
    marginRight: "auto",
    border: "2px solid #000",
  },
  list: {
    width: "100%",
    maxWidth: 360,
  },
  avatars: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginRight: theme.spacing(1),
  },
  title: {
    textAlign: "center",
  },
  divider: {
    marginBottom: "5px",
  },
  contact: {
    marginTop: "2%",
    backgroundColor: theme.palette.secondary.main,
  },
  modal: {
    margin: "0 auto",
    display: "flex",
  },
  button: {
    margin: "0 auto",
    display: "flex",
  },
  info: {
    overflow: "auto",
    maxHeight: 100,
    height: 100,
  },
  modalPic: {
    overflow: "visible",
    minHeight: 75,
    height: 75,
    marginBottom: "2%",
  },
  bookmark: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  contactInfo: {
    justifyContent: 'center'
  },
}));

function BrowseDetail({ modalToggle }) {
  // populate favorites list on page load
  useEffect(() => {
    dispatch({ type: "FETCH_FAVORITES", payload: user.id });
    //watching for changes in favorites reducer
  }, [favorites]);

  const dispatch = useDispatch();
  const [modalStyle] = React.useState(getModalStyle);
  const classes = useStyles();

  // --- REDUCERS --- //

  const item = useSelector((store) => store.browser.detail);
  const favorites = useSelector((store) => store.favorites);
  const user = useSelector((store) => store.user);

  // --- LOCAL STATE --- //
  const [slide, setSlide] = useState(false);

  // toggles slide window w/ contact info
  const slideToggle = () => {
    setSlide(!slide);
  };

  // function to dispatch to saga for
  //post to be saved to favorites
  const favoritePost = (item) => {
    // console.log("in favoritePost: ", item);
    dispatch({
      type: "ADD_FAVORITE",
      payload: { body: item, user_id: user.id },
    });
  };

  // function to dispatch to saga for
  //post to be deleted from favorites
  const deleteFav = (item) => {
    // console.log("in deleteFav: ", item);
    dispatch({ type: "DELETE_FAV", payload: { item: item, user_id: user.id } });
    modalToggle();
  };

  // function to check if an
  // item has been favorited or not
  const checkId = (item) => {
    for (let fav of favorites) {
      if (fav.posts_id == item.posts_id) {
        return true;
      } else {
        false;
      }
    } // end of loop
  }; // end checkId

  // Function to open up email in separate window
  const toEmail = () => {
    window.open(`mailto:${item.email}`);
  };

  return (
    <div style={modalStyle} className={classes.paper}>
      <Box className={classes.bookmark}>
        <IconButton onClick={() => modalToggle()}>
          <CloseIcon variant="outlined" />
        </IconButton>
        {checkId(item) ? (
          <IconButton onClick={() => deleteFav(item)} edge="end">
            <BookmarkIcon />
          </IconButton>
        ) : (
          <IconButton onClick={() => favoritePost(item)} edge="end">
            <BookmarkBorderIcon />
          </IconButton>
        )}
      </Box>
      <h3 className={classes.title}>{item.username}</h3>
      <p></p>
      <h3 className={classes.title}>{item.title}</h3>
      <div className={classes.modalPic}>
        <img className={classes.image} src={item.image_url} />
      </div>
      <Divider />
      <p>
        Condition: <i>{item.condition}</i>
      </p>
      <Divider />
      <div className={classes.info}>
        <h4>Info:</h4>
        <p>{item.description}</p>
      </div>
      <Divider />
      <div className={classes.info}>
        <h4>Trade For:</h4>
        <p>{item.wants}</p>
      </div>
      <Divider className={classes.divider} />
      <Button
        className={classes.button}
        variant="outlined"
        onClick={toEmail}
      >
        Contact User
      </Button>
    </div>
  );
}

export default BrowseDetail;

