const express = require('express');
const bodyParser = require('body-parser');
// const pino = require('express-pino-logger')();
const router = express.Router();
const dotenv = require('dotenv').config()
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN
const client = require('twilio')(accountSid, authToken);


router.post('/api/sms', (req, res) => {
    res.header('Content-Type', 'application/json')
    client.messages
        .create({
            body: req.body.body,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: req.body.to
        })
        .then(() => {
            res.send(JSON.stringify({ success: true }))
        })
        .catch(err => {
            console.log(err);
            res.send(JSON.stringify({ success: false }))
        })
});



module.exports = router;
