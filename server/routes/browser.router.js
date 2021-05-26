const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    // GET route code here
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

  module.exports = router;