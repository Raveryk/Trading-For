const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const MessagingResponse = require('twilio').twiml.MessagingResponse;


const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const postsRouter = require('./routes/posts.router');
const categoriesRouter = require('./routes/categories.router');
const browseRouter = require('./routes/browse.router');
const accountRouter = require('./routes/account.router');
const editRouter = require('./routes/edit.router');
const favoritesRouter = require('./routes/favorites.router')
const smsRouter = require('./routes/sms.router')

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/posts', postsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/browse', browseRouter);
app.use('/api/account', accountRouter);
app.use('/api/edit', editRouter);
app.use('/api/favorites', favoritesRouter);
app.use('/api/sms', smsRouter);

// app.post('/sms', (req, res) => {
//   const twiml = new MessagingResponse();

//   twiml.message('The Robots are coming! Head for the hills!');

//   res.writeHead(200, {'Content-Type': 'text/xml'});
//   res.end(twiml.toString());
// });


// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
