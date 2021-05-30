const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/', (req, res) => {
    console.log('userId:', req.user.id)
    const query = `SELECT posts.id, title, condition, image_url, traded, "user".username FROM posts 
    JOIN "user" ON "user".id=posts.users_id
    WHERE "user".id = $1
    ORDER BY traded;`;
    pool.query(query, [req.user.id])
      .then(result => {
        console.log(result.rows);
        res.send(result.rows)
      })
      .catch( error => {
        console.log('Something went wrong GETting posts for browser:', error)
        res.sendStatus(500);
      })
  });

  router.get(`/detail/:id`, (req, res) => {
    console.log('req.params.id:', req.params.id);
    postId = req.params.id
  // GET route code here
  const query = `SELECT title, description, condition, image_url, wants, traded, posts.id, "user".username, "user".email, "user".phone_num FROM posts 
                  JOIN "user" ON "user".id=posts.users_id
                  WHERE posts.id=$1;`;

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

    // PUT route to update traded boolean
  router.put('/:id', (req, res) => {
      console.log('post id:', req.params.id)
      const query = `UPDATE posts SET traded='true' WHERE id=$1;`;
      pool.query(query, [req.params.id])
      .then(response => {
          res.sendStatus(200);
          console.log('Successfully updated post to traded!')
      })
      .catch(error => {
          console.log('Error updating post to traded in server:', error)
          res.sendStatus(500)
      })
  })

  

  router.delete('/:id', (req, res) => {
    console.log('post id:', req.params.id)
    const query = `DELETE FROM posts WHERE id = $1;`;
    pool.query(query, [req.params.id])
    .then(response => {
        res.sendStatus(200);
        console.log('Successfully deleted post!')
    })
    .catch(error => {
        console.log('Error deleing post in server:', error)
        res.sendStatus(500)
    })
})

  module.exports = router;