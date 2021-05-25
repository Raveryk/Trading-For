import React, {useState} from 'react';


import { FormControl, TextField, Button, Card } from '@material-ui/core';
import { useDispatch } from 'react-redux';

function Post() {

  const dispatch = useDispatch();

  const [newPost, setNewPost] = useState({
    title: '',
    info: '',
    type: '',
    condition: '',
    url: '',
    wants: ''
  })


  const handleChange = (e) => {
    setNewPost({...newPost,
        [e.target.id]: e.target.value
    })
}

  const submitPost = () => {
    dispatch({ type: 'ADD_POST', payload: newPost })
  }

  return (
    <div className="container">
      <Card elevation={4}>
        <FormControl >
          <TextField id="title" placeholder="item" variant="outlined" value={newPost.title} onChange={handleChange}/>
          <TextField id="info" multiline rows={4} placeholder="description" variant="outlined" onChange={handleChange}/>
          <TextField id="type" placeholder="category" variant="outlined" onChange={handleChange}/>
          <TextField id="condition" placeholder="condition" variant="outlined" onChange={handleChange}/>
          <TextField id="url" placeholder="image url" variant="outlined" onChange={handleChange}/>
          <TextField id="wants" placeholder="trade for..." variant="outlined" onChange={handleChange}/>
          <Button variant="outlined" onClick={() => submitPost()}>Submit</Button>
        </FormControl>
      </Card>
    </div>
  );
}

export default Post;
