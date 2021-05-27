import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Modal,
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
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";

import DeleteIcon from '@material-ui/icons/Delete';

import CloseIcon from '@material-ui/icons/Close';

import { useHistory } from "react-router-dom";
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
    position: "absolute",
    // overflow: 'auto',
    width: 225,
    height: '75%',
    backgroundColor: "#81ac8d",
    border: "2px solid #000",
    padding: "5%",
    borderRadius: 16,
  },
  image: {
    display: 'block',
    maxWidth: '75px',
    maxHeight: '75px', 
    marginLeft: 'auto',
    marginRight: 'auto',
       
  },
  list: {
    width: '100%',
    maxWidth: 360,
  },
  avatars: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginRight: theme.spacing(1)
  },
  title: {
    textAlign: 'center'
  },
  divider: {
    marginBottom: '5px'
  },
  contact: {
    backgroundColor: "whitesmoke",
  },
  modal: {
    margin: '0 auto', 
    display: "flex"
  },
  button: {
    margin: '0 auto', 
    display: "flex"
  },
  info: {
    overflow: 'auto', 
    maxHeight: 100,
    height: 100,
  },
  modalPic: {
    overflow: 'auto', 
    minHeight: 75,
    height: 75,
  },
  browse: {
    marginTop: 150,
  }
}));

function EditPosts() {

  useEffect(() => {
    dispatch({ type: "FETCH_ACCOUNT_BROWSER" });
  }, []);

  const dispatch = useDispatch();

  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  //state for modal open attribute
  const [open, setOpen] = useState(false);
  const [slide, setSlide] = useState(false);
  //grabs detailed info from reducer
  // const detail = useSelector((store) => store.account.accountDetail);
  // grabs all posts for browser
  const browser = useSelector((store) => store.account.accountBrowser);
  const user = useSelector((store) => store.userReducer);
  console.log('User data:', user)


  const updateTrade = (post) => {
    console.log('You checked the box!')
    dispatch({ type: 'UPDATE_TRADE', payload: post.id})
  }

  // targets specific post and toggles the modal comp to open
  const toDetail = (post) => {
    // console.log(post.id);
    dispatch({ type: "FETCH_DETAILS", payload: post.id });
    modalToggle();
  };


  // function to toggle modal
  const modalToggle = () => {
    setOpen(!open);
    dispatch({ type: 'SET_DETAILS', payload: [] })
  };

  const slideToggle = () => {
    setSlide(!slide);
  };

  // const body = (
  //   <div style={modalStyle} className={classes.paper}>
  //   <IconButton onClick={() => modalToggle()}>
  //       <CloseIcon className={classes.close} variant="outlined" />
  //   </IconButton>
  //     {detail.map((item, i) => {
  //       return (
  //         <>
  //           <h3 className={classes.title}>{item.username}</h3>
  //           <p></p>
  //           <h3 className={classes.title}>{item.title}</h3>
  //           <div className={classes.modalPic} >
  //           <img className={classes.image} src={item.image_url} />
  //           </div>
  //           <Divider />
  //           <p>
  //             Condition: <i>{item.condition}</i>
  //           </p>
  //           <Divider />
  //           <div className={classes.info} >
  //           <h4>Info:</h4>
  //           <p>{item.description}</p>
  //           </div>
  //           <Divider />
  //           <div className={classes.info} >
  //           <h4>Trade For:</h4>
  //           <p>{item.wants}</p>
  //           </div>
  //           <Divider className={classes.divider}/>
  //           <Button className={classes.button} variant="outlined" onClick={() => slideToggle()}>Interested?</Button>
  //           <Slide direction="up" in={slide} onChange={slideToggle}>
  //             <Paper className={classes.contact}>
  //               <p>Email: {item.email}</p>
  //               <p>Phone#: {item.phone_num}</p>
  //             </Paper>
  //           </Slide>
  //         </>
  //       );
  //     })}
  //   </div>
  // );

  return (
    <div className={classes.browse}>
      <h2 className={classes.title}>User Trades</h2>
      <Divider />
      <div className="grid">
        <div className="grid-col grid-col_8">
          <List className={classes.list}>
            {browser.map((post, i) => {
              return (
                  <>
                <ListItem key={i} onClick={() => toDetail(post)}>
                    <ListItemAvatar>
                        <Avatar variant="square" className={classes.avatars} src={post.image_url} />
                    </ListItemAvatar>
                  <ListItemText
                    primary={post.title}
                    secondary={post.condition}
                  />
                  <FormControlLabel control={
                  <Checkbox />}
                  label="Traded"
                  labelPlacement="top"
                  onChange={() => updateTrade(post)}
                  />
                </ListItem>
                <Divider />
                </>
              );
            })}
          </List>
        </div>
        <div>
          {/* <Modal
            open={open}
            onClose={modalToggle}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>{body}</Fade>
          </Modal> */}
        </div>
      </div>
    </div>
  );
}

export default EditPosts;
