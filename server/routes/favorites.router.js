const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

router.get('/:id', rejectUnauthenticated, (req, res) => {
    console.log('for favs: ', req.params.id)
    let userId = req.params.id;

    const query = `SELECT favorites.id, favorites.users_id as "user", posts_id, favorited, posts.title, posts.description, posts.condition, posts.image_url, posts.wants, posts.category_id FROM favorites
                    JOIN posts ON posts.id=favorites.posts_id
                    WHERE favorites.users_id=$1;`;
    pool.query(query, [userId])
      .then(result => {
        console.log(result.rows);
        res.send(result.rows)
      })
      .catch( error => {
        console.log('Something went wrong GETting favorites:', error)
        res.sendStatus(500);
      })
  });



module.exports = router;