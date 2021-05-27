import React, { useState, useEffect } from "react";

import {
  FormControl,
  TextField,
  Button,
  Card,
  Grid,
  InputLabel,
  Select,
  MenuItem,
  makeStyles,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  grid: {
    direction: 'column',
    justify: 'center',
    alignItems: 'center',
  },
  card: {
    width: '75%',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: '20%',
  },
  form: {
    display: 'flex',
    margin: '10px',
    flexDirection: 'column',
    
  },
  inputs: {
    marginTop: '5px',
    marginBottom: '5px',
  },
  btn: {
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: '5px',
    marginBottom: '5px',
    width: '50%'
  },
  title: {
    textAlign: 'center'
  }
}))

function Post() {
  // On page load, fetch categories from DB to populate reducer
  useEffect(() => {
    dispatch({ type: "FETCH_CATEGORIES" });
  }, []);

  const classes = useStyles()
  const dispatch = useDispatch();
  const types = useSelector((store) => store.categories);

  // array of condition types
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

  //holds values for new post
  const [newPost, setNewPost] = useState({
    title: "",
    info: "",
    type: "",
    condition: "",
    url: "",
    wants: "",
  });

  //handles change to all text inputs
  const handleChange = (e) => {
    e.preventDefault();
    setNewPost({ ...newPost, [e.target.id]: e.target.value });
  };

  //handles change to category selector
  const handleCategory = (e) => {
    e.preventDefault();
    setNewPost({ ...newPost, type: e.target.value });
  };

  //handles change to condition selector
  const handleCondition = (e) => {
    e.preventDefault();
    setNewPost({ ...newPost, condition: e.target.value });
  };

  //handles submit button
  const submitPost = () => {
    console.log(newPost);
    dispatch({ type: "ADD_POST", payload: newPost });
    setNewPost({title: "",
    info: "",
    type: "",
    condition: "",
    url: "",
    wants: "",})
  };

  return (
    <div>
      <Grid container className={classes.grid}>
      <Card elevation={4} className={classes.card} >
        <h2 className={classes.title}>Post A Trade</h2>
        <form className={classes.form}>
          <TextField
            className={classes.inputs}
            id="title"
            label="title"
            variant="outlined"
            value={newPost.title}
            onChange={handleChange}
          />
          <TextField
            className={classes.inputs}
            id="info"
            multiline
            rows={4}
            label="description"
            variant="outlined"
            value={newPost.info}
            onChange={handleChange}
          />
          <FormControl className={classes.inputs}>
            <InputLabel>category</InputLabel>
            <Select id="type" value={newPost.type} onChange={handleCategory}>
              {types.map((type) => (
                <MenuItem key={type.id} value={type.id}>
                  {type.type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className={classes.inputs}>
            <InputLabel>condition</InputLabel>
            <Select
              id="condition"
              value={newPost.condition}
              onChange={handleCondition}
            >
              {condition.map((type, i) => (
                <MenuItem key={i} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            className={classes.inputs}
            id="url"
            label="image url"
            variant="outlined"
            value={newPost.url}
            onChange={handleChange}
          />
          <TextField
            className={classes.inputs}
            id="wants"
            label="trade for..."
            variant="outlined"
            value={newPost.wants}
            onChange={handleChange}
          />
          <Button className={classes.btn} variant="outlined" onClick={() => submitPost()}>
            Submit
          </Button>
        </form>
      </Card>
      </Grid>
    </div>
  );
}

export default Post;
