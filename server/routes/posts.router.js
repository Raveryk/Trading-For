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
      console.log(result.rows);
      res.send(result.rows)
    })
    .catch( error => {
      console.log('Something went wrong GETting posts:', error)
      res.sendStatus(500);
    })
});

// POST request to send posts to DB //
router.post('/', (req, res) => {
    userId = req.user.id;
    title = req.body.id;
    info = req.body.description;
    condition = req.body.condition;
    pic = req.body.image_url;
    wants = req.body.wants;
    type = req.body.category_id

    const query = `INSERT INTO posts ("users_id", "title", "description", "condition", "image_url", "wants", "category_id")
                  VALUES($1, $2, $3, $4, $5, $6, $7);`;
    pool.query(query, [userId, title, info, condition, pic, wants, type]) 
      .then(result => {
        res.sendStatus(201)
      })
      .catch(error => {
        console.log('Error adding post to DB:', error);
        res.sendStatus(500)
      })
});

module.exports = router;
