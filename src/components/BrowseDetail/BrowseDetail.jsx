import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Modal,
  Card,
  makeStyles,
  Fade,
  Backdrop,
  Button,
  Slide,
  Paper,
  Divider,
  ListItemAvatar,
  Avatar,
  IconButton,
  Typography,
} from "@material-ui/core";

import CloseIcon from "@material-ui/icons/Close";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";

import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { CheckOutlined } from "@material-ui/icons";
import userReducer from "../../redux/reducers/user.reducer";

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
    position: "absolute",
    overflow: "hidden",
    width: 225,
    height: "75%",
    backgroundColor: "#81ac8d",
    border: "2px solid #000",
    padding: "5%",
    borderRadius: 16,
    outline: 0,
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
    backgroundColor: "whitesmoke",
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
}));

function BrowseDetail({ modalToggle }) {
  // populate favorites list on page load
  useEffect(() => {
    dispatch({ type: "FETCH_FAVORITES", payload: user.id });
  }, []);

  const dispatch = useDispatch();

  const [modalStyle] = React.useState(getModalStyle);
  const classes = useStyles();

  // --- REDUCERS --- //

  const detail = useSelector((store) => store.browser.detail);
  const favorites = useSelector((store) => store.favorites);
  const user = useSelector((store) => store.user);

  // --- LOCAL STATE --- //
  const [slide, setSlide] = useState(false);
  const [open, setOpen] = useState(false);

  const slideToggle = () => {
    setSlide(!slide);
  };

  
  // function to dispatch to saga for post to be saved to favorites
  const favoritePost = (item) => {
    //   console.log('in favoritePost: ', item);
    dispatch({ type: "ADD_FAVORITE", payload: item });
  };
  // function to dispatch to saga for post to be deleted from favorites
  const deleteFav = (item) => {
    //   console.log('in deleteFav: ', item.posts_id);
    dispatch({ type: "DELETE_FAV", payload: item.posts_id });
  };
  // function to check if an item has been favorited or not
  const checkId = (item) => {
    for (let fav of favorites) {
      if (fav.posts_id == item.posts_id) {
        return true;
      } else {
        false;
      }
    }
  };

  return (
    <div style={modalStyle} className={classes.paper}>
      {detail.map((item, i) => {
        return (
          <>
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
              onClick={() => slideToggle()}
            >
              Interested?
            </Button>
            <Slide direction="up" in={slide} onChange={slideToggle}>
              <Paper className={classes.contact}>
                <p>Email: {item.email}</p>
                <p>Phone#: {item.phone_num}</p>
              </Paper>
            </Slide>
          </>
        );
      })}
    </div>
  );
}

export default BrowseDetail;
