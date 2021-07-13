const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'Hi Reese, this is your app talking.',
     from: '+12405341872',
     to: '+16127500119'
   })
  .then(message => console.log(message.sid));