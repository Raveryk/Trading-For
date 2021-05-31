import React, { useState } from "react";
import {
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
  Box,
} from "@material-ui/core";

import CloseIcon from "@material-ui/icons/Close";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";

import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import Header from "../Header/Header";

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
    // overflow: 'auto',
    width: 225,
    height: "75%",
    backgroundColor: "#81ac8d",
    border: "2px solid #000",
    padding: "5%",
    borderRadius: 16,
  },
  image: {
    display: "block",
    maxWidth: "75px",
    maxHeight: "75px",
    marginLeft: "auto",
    marginRight: "auto",
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
    overflow: "auto",
    minHeight: 75,
    height: 75,
  },
  bookmark: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between'
      
  }
}));

function Browse() {
  useEffect(() => {
    dispatch({ type: "FETCH_BROWSER" });
  }, []);

  const dispatch = useDispatch();

  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  //state for modal open attribute
  const [open, setOpen] = useState(false);
  const [slide, setSlide] = useState(false);

  // ---REDUCERS--- //

  //grabs detailed info from reducer
  const detail = useSelector((store) => store.browser.detail);
  console.log('Detail item: ', detail)
  // grabs all posts for browser
  const browser = useSelector((store) => store.browser.browser);

  // targets specific post and toggles the modal comp to open
  const toDetail = (post) => {
    // console.log(post.id);
    dispatch({ type: "FETCH_DETAILS", payload: post.id });
    modalToggle();
  };

  // function to toggle modal
  const modalToggle = () => {
    setOpen(!open);
    // reset reducer to be empty
    dispatch({ type: "SET_DETAILS", payload: [] });
  };

  // handles contact info action
  const slideToggle = () => {
    setSlide(!slide);
  };

  const favoritePost = (item) => {
      console.log('in favoritePost: ', item);
      dispatch({ type: 'ADD_FAVORITE', payload: item })
  }

  const body = (
    <div style={modalStyle} className={classes.paper}>
      {detail.map((item, i) => {
        return (
          <>
            <Box className={classes.bookmark}>
            <IconButton onClick={() => modalToggle()}>
              <CloseIcon variant="outlined" />
            </IconButton>
                <IconButton onClick={() => favoritePost(item)} edge="end">
                    <BookmarkBorderIcon />
                </IconButton>
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

  return (
    <div>
      <Header />
      <Typography className={classes.title} variant="h5">
        Browse Trade List
      </Typography>
      <Divider />
      <div className="grid">
        <div className="grid-col grid-col_8">
          <List className={classes.list}>
            {browser.map((post, i) => {
              return (
                <>
                  <ListItem key={i} onClick={() => toDetail(post)}>
                    <ListItemAvatar>
                      <Avatar
                        variant="square"
                        className={classes.avatars}
                        src={post.image_url}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={post.title}
                      secondary={post.condition}
                    />
                  </ListItem>
                  <Divider />
                </>
              );
            })}
          </List>
        </div>
        <div>
          <Modal
            open={open}
            onClose={modalToggle}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>{body}</Fade>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default Browse;
