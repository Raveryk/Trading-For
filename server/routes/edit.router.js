const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
  
  // PUT route to update post
  router.put('/posts/:id', (req, res) => {
    console.log('post id:', req.params.id)
    console.log('Post update:', req.body)
    const query = `UPDATE posts SET title=$2, description=$3, condition=$4, image_url=$5, wants=$6 WHERE id=$1;`;
    pool.query(query, [req.params.id, req.body.title, req.body.info, req.body.condition, req.body.url, req.body.wants])
    .then(response => {
        res.sendStatus(200);
        console.log('Successfully updated post!')
    })
    .catch(error => {
        console.log('Error updating post in server:', error)
        res.sendStatus(500)
    })
})

module.exports = router;