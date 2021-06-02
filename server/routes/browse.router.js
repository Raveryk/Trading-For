const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

// GET request to grab all posts that haven't been traded
router.get('/', rejectUnauthenticated, (req, res) => {
    const query = `SELECT posts.id, title, condition, image_url, "user".username FROM posts 
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
  router.get(`/detail/:id`, rejectUnauthenticated, (req, res) => {
      console.log('req.params.id:', req.params.id);
      postId = req.params.id
    // GET route code here
    const query = `SELECT posts.id as posts_id, title, description, condition, image_url, wants, "user".username, "user".email, "user".phone_num, "user".id as user_id FROM posts 
                    JOIN "user" ON "user".id=posts.users_id
                    WHERE posts.id=$1; `;

    pool.query(query, [postId])
      .then(result => {
        console.log(result.rows);
        res.send(result.rows[0])
      })
      .catch( error => {
        console.log('Something went wrong GETting details:', error)
        res.sendStatus(500);
      })
  });


  // POST route for favorited item to be sent to DB
  router.post(`/`, rejectUnauthenticated, (req, res) => {
    console.log(`req.body: `, req.body)
    console.log(`req.user: `, req.user)
    // console.log(`req.params: `, req.params)

    const query = `INSERT INTO favorites ("users_id", "posts_id")
                    VALUES($1, $2);`;
    
    pool.query(query, [req.user.id, req.body.body.posts_id])
      .then(result => {
        console.log('Success favoriting post')
        res.sendStatus(201)
      })
      .catch( error => {
        console.log('Error adding favorite: ', error)
      })

  })

  // DELETE route for favorited item to be removed from table
  router.delete('/:id', rejectUnauthenticated, (req, res) => {
    console.log('req.body: ', req.body)
    console.log('req.params: ', req.params)
    console.log(`req.user: `, req.user)

    const query =  `DELETE FROM favorites WHERE users_id = $1 AND posts_id = $2;`;

    pool.query(query, [req.user.id, req.params.id])
      .then(result => {
        console.log('Success deleting favorite')
        res.sendStatus(201)
      })
      .catch( error => {
        console.log('Error deleting fav: ', error)
      })
  })

  module.exports = router;