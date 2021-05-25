import React, {useState} from 'react';


import { FormControl, TextField, Button, Card } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

function Post() {

  const dispatch = useDispatch();
  const types = useSelector( store => store.categories )

  const [newPost, setNewPost] = useState({
    title: '',
    info: '',
    type: 0,
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
          <TextField id="info" multiline rows={4} placeholder="description" variant="outlined" value={newPost.info} onChange={handleChange}/>
          <InputLabel>category</InputLabel>
              <Select
                id="type"
                label="category"
                value={newPost.type}
                onChange={handleChange}
              >
                {types.map((type) => (
                  <MenuItem key={type.id} value={type.id}>
                    {type.type}
                  </MenuItem>
                ))}
              </Select>
          <TextField id="condition" placeholder="condition" variant="outlined" value={newPost.condition}onChange={handleChange}/>
          <TextField id="url" placeholder="image url" variant="outlined" value={newPost.url}onChange={handleChange}/>
          <TextField id="wants" placeholder="trade for..." variant="outlined" value={newPost.wants}onChange={handleChange}/>
          <Button variant="outlined" onClick={() => submitPost()}>Submit</Button>
        </FormControl>
      </Card>
    </div>
  );
}

export default Post;
