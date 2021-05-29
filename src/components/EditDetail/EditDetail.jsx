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
  Divider,
  ListItemAvatar,
  Avatar,
  IconButton,
  Checkbox,
  FormControlLabel,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@material-ui/core";

import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CloseIcon from "@material-ui/icons/Close";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useHistory } from 'react-router-dom'

import "./EditPosts.css";

// import EditDetail from '../EditDetail/EditDetail'

import Swal from "sweetalert2";

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
    overflow: "auto",
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
    flexWrap: "wrap",
    textAlign: "center",
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
  },
  browse: {
    marginTop: 150,
  },
  edit: {
    display: "flex",
    flexWrap: "wrap",
  },
}));

function EditDetail() {
  const condition = [
    "Brand New",
    "Mint",
    "Excellent",
    "Very Good",
    "Good",
    "Fair",
    "Poor",
    "Broken",
  ];

  useEffect(() => {
    dispatch({ type: "FETCH_ACCOUNT_BROWSER" });
  }, []);

  const dispatch = useDispatch();
  // const history = useHistory();

  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  // ---MODAL STATES--- //

  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);

  // ----REDUCERS----- //

  //grabs detailed info from reducer
  const detail = useSelector((store) => store.account.accountDetail);
  // console.log(detail)
  // grabs all posts for browser
  const browser = useSelector((store) => store.account.accountBrowser);
  const user = useSelector((store) => store.user);
  // console.log("User data:", user);

  // ---- EDIT --- //

  // creating temporary holder for old values and new values.
  // const [update, setUpdate] = useState({
  //   title: '',
  //   info: '',
  //   condition: '',
  //   url: '',
  //   wants: '',
  // });

  const [update, setUpdate] = useState({
    id: detail[0].id,
    title: detail[0].title,
    info: detail[0].description,
    condition: detail[0].condition,
    url: detail[0].image_url,
    wants: detail[0].wants,
  });

  // updates trade from false to true.
  const updateTrade = (post) => {
    console.log("You checked the box!");
    dispatch({ type: "UPDATE_TRADE", payload: post.id });
    dispatch({ type: "FETCH_ACCOUNT_BROWSER" });
  };

  // targets specific post and toggles the modal comp to open
  const toDetail = (post) => {
    dispatch({ type: "FETCH_ACCOUNT_DETAILS", payload: post.id });
    modalToggle();
  };

  // function to toggle modal
  const modalToggle = () => {
    setOpen(!open);
    dispatch({ type: "SET_DETAILS", payload: [] });
  };

  // function to delete post
  const deletePost = (item) => {
    //Want to figure out confirmation stuff....
    dispatch({ type: "DELETE_POST", payload: item.id });
    // refresh users posts list
    dispatch({ type: "FETCH_ACCOUNT_BROWSER" });
    // close out of modal view
    modalToggle();
  };

  // edit inputs conditionally render
  const editItem = (item) => {
    console.log("Edit button clicked!", edit);
    setEdit(!edit);
  };

  const handleEdits = (e) => {
    e.preventDefault();
    setUpdate({ ...update, [e.target.id]: e.target.value });
  };

  const conditionEdit = (e) => {
    e.preventDefault();
    setUpdate({...update, condition: e.target.value})
  }

  const updateItem = () => {
    console.log('Update sent to saga: ', update)
    dispatch({type: 'UPDATE_POST', payload: update});
    dispatch({ type: "FETCH_ACCOUNT_BROWSER" })

  }

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <IconButton onClick={() => modalToggle()}>
        <CloseIcon className={classes.close} variant="outlined" />
      </IconButton>
      {detail.map((item, i) => {
        return (
          <>
            <h3 className={classes.title}>{item.username}</h3>
            <p></p>
            {!edit ? (
              <h3 className={classes.title}>{item.title}</h3>
            ) : (
              <TextField
                id="title"
                className="inputs"
                placeholder={item.title}
                value={update.title}
                onChange={handleEdits}
              />
            )}
            {!edit ? (
              <div className={classes.modalPic}>
                <img className={classes.image} src={item.image_url} />
              </div>
            ) : (
              <TextField
                id="url"
                className="inputs"
                placeholder={item.image_url}
                value={update.url}
                onChange={handleEdits}
              />
            )}
            <Divider />
            <p>
              {!edit ? (
                <div>
                  Condition: <i>{item.condition}</i>
                </div>
              ) : (
                <FormControl className="inputs">
                  <InputLabel>condition</InputLabel>
                  <Select
                    id="condition"
                    value={update.condition}
                    onChange={conditionEdit}
                  >
                    {condition.map((type, i) => (
                      <MenuItem key={i} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </p>
            <Divider />
            <div className={classes.info}>
              <h4>Info:</h4>
              {!edit ? (
                <p>{item.description}</p>
              ) : (
                <TextField
                  id="info"
                  className="inputs"
                  placeholder={item.description}
                  value={update.info}
                  onChange={handleEdits}
                />
              )}
            </div>
            <Divider />
            <div className={classes.info}>
              <h4>Trade For:</h4>
              {!edit ? (
                <p>{item.wants}</p>
              ) : (
                <TextField
                  id="wants"
                  placeholder={item.wants}
                  value={update.wants}
                  onChange={handleEdits}
                />
              )}
            </div>
            <Divider className={classes.divider} />
            <Box display="flex" justifyContent="center">
              {!edit ? (
                <div>
                  <Button variant="outlined" onClick={() => deletePost(item)}>
                    Delete
                  </Button>
                  <Button variant="outlined" onClick={() => editItem(item)}>
                    Edit
                  </Button>
                </div>
              ) : (
                <div>
                  <Button variant="outlined" onClick={() => editItem()}>
                    Cancel
                  </Button>
                  <Button variant="outlined" onClick={() => updateItem()}>
                    Update
                  </Button>
                </div>
              )}
            </Box>
          </>
        );
      })}
    </div>
  );

  return (
    <div className={classes.browse}>
      <Typography>
        <h2 className={classes.title}>{user.username}'s Posts</h2>
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
                    {!post.traded ? (
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Traded"
                        labelPlacement="top"
                        onChange={() => updateTrade(post)}
                      />
                    ) : (
                      <CheckBoxIcon />
                    )}
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

export default EditDetail;
