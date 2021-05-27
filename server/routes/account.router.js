const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/', (req, res) => {
    console.log('userId:', req.user.id)
    const query = `SELECT posts.id, title, condition, image_url, "user".username FROM posts 
    JOIN "user" ON "user".id=posts.users_id
    WHERE "user".id = $1;`;
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

  module.exports = router;