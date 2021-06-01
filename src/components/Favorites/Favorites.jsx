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

import Header from "../Header/Header";
import BrowseDetail from "../BrowseDetail/BrowseDetail";

import CloseIcon from "@material-ui/icons/Close";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";

import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import "./Favorites.css";

const useStyles = makeStyles((theme) => ({
  avatars: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginRight: theme.spacing(1),
  },
}));

function Favorites() {
  let { id } = useParams();
  console.log(id);

  useEffect(() => {
    dispatch({ type: "FETCH_FAVORITES", payload: id });
  }, []);

  const dispatch = useDispatch();
  const classes = useStyles();

  //state for modal open attribute
  const [open, setOpen] = useState(false);
  const [slide, setSlide] = useState(false);
  const [favorite, setFavorite] = useState(false);

  const browser = useSelector((store) => store.favorites);
  const detail = useSelector((store) => store.browser.detail);

  console.log("In favorites: ", browser);

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

  return (
    <div>
      <Header />
      <Typography className="title" variant="h5">
        Favorites
      </Typography>
      <Divider />
      <div className="grid">
        <div className="grid-col grid-col_8">
          <List className="list">
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
            <Fade in={open}>
              {<BrowseDetail modalToggle={modalToggle} id={detail.id} />}
            </Fade>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default Favorites;
