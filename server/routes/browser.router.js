const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET request to grab all posts that haven't been traded
router.get('/', (req, res) => {
    const query = `SELECT * FROM posts 
    JOIN "user" ON "user".id=posts.users_id
    WHERE traded=false;`;
    pool.query(query)
      .then(result => {
        console.log(result.rows);
        res.send(result.rows)
      })
      .catch( error => {
        console.log('Something went wrong GETting posts for browser:', error)
        res.sendStatus(500);
      })
  });

  // GET request for specific post id
  router.get(`/details/:id`, (req, res) => {
      console.log(req.params.id);
      postId = req.params.id
    // GET route code here
    const query = `SELECT * FROM posts 
    JOIN "user" ON "user".id=posts.users_id
    WHERE user_id=$1;`;

    pool.query(query, [postId])
      .then(result => {
        console.log(result.rows);
        res.send(result.rows)
      })
      .catch( error => {
        console.log('Something went wrong GETting details:', error)
        res.sendStatus(500);
      })
  });

  module.exports = router;