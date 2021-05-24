const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
  const query = `SELECT * FROM posts WHERE traded=false;`
  pool.query(query)
    .then(result => {
      res.send(result.rows)
    })
    .catch( error => {
      console.log('Something went wrong GETting posts:', error)
      res.sendStatus(500);
    })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
