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
import BookmarkIcon from '@material-ui/icons/Bookmark';

import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import './Favorites.css';

const useStyles = makeStyles((theme) => ({
    avatars: {
      width: theme.spacing(7),
      height: theme.spacing(7),
      marginRight: theme.spacing(1),
    }
  }));  


function Favorites() {

    const classes = useStyles();

    
     

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
              
          </div>
        </div>
      );
    }
    
    export default Favorites;
    
