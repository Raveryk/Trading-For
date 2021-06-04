import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Modal,
  makeStyles,
  Fade,
  Backdrop,
  Divider,
  ListItemAvatar,
  Avatar,
  Typography,
} from "@material-ui/core";

import Header from "../Header/Header";
import BrowseDetail from "../BrowseDetail/BrowseDetail";

import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import "./Favorites.css";

const useStyles = makeStyles((theme) => ({
  avatars: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginRight: theme.spacing(1),
    border:  "1px solid",
    borderColor: theme.palette.primary.main,
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

  // ---REDUCERS--- //
  const favorites = useSelector((store) => store.favorites);
  const user = useSelector((store) => store.user);

//   console.log("In favorites: ", favorites);

  //Opens detail modal
  const toDetail = (post) => {
    // console.log(post.id);
    dispatch({ type: "FETCH_DETAILS", payload: post.posts_id });
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

  const checkFavs = () => {
    if (favorites.length === 0) {
      return true;
    }
    return false;
  };

  return (
    <div>
      <Header />
      <Typography className="title" variant="h5">
        Favorites
      </Typography>
      <Divider />
      {checkFavs() ? (
        <Typography className="list" variant="body1">...You have no favorites</Typography>
      ) : (
        <div>
          <div className="grid">
            <div className="grid-col grid-col_8">
              <List className="list">
                {favorites.map((post, i) => {
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
            <div className="modal-div">
              <Modal
                className="modal"
                open={open}
                onClose={modalToggle}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={open}>
                  {
                    <BrowseDetail
                      user={user}
                      modalToggle={() => {
                        setOpen(!open);
                      }}
                    />
                  }
                </Fade>
              </Modal>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Favorites;
