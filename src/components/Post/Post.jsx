import React, { useState, useEffect } from "react";

import {
  FormControl,
  TextField,
  Button,
  Card,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

function Post() {
  // On page load, fetch categories from DB to populate reducer
  useEffect(() => {
    dispatch({ type: "FETCH_CATEGORIES" });
  }, []);

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
  };

  return (
    <div className="container">
      <Card elevation={4}>
        <FormControl>
          <TextField
            id="title"
            label="title"
            variant="outlined"
            value={newPost.title}
            onChange={handleChange}
          />
          <TextField
            id="info"
            multiline
            rows={4}
            label="description"
            variant="outlined"
            value={newPost.info}
            onChange={handleChange}
          />
          <FormControl>
            <InputLabel>category</InputLabel>
            <Select id="type" value={newPost.type} onChange={handleCategory}>
              {types.map((type) => (
                <MenuItem key={type.id} value={type.id}>
                  {type.type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl>
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
            id="url"
            label="image url"
            variant="outlined"
            value={newPost.url}
            onChange={handleChange}
          />
          <TextField
            id="wants"
            label="trade for..."
            variant="outlined"
            value={newPost.wants}
            onChange={handleChange}
          />
          <Button variant="outlined" onClick={() => submitPost()}>
            Submit
          </Button>
        </FormControl>
      </Card>
    </div>
  );
}

export default Post;
