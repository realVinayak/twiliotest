const express = require('express');
const VoiceResponse = require('twilio').twiml.VoiceResponse;


const app = express();
const PORT = process.env.PORT || 5000;
// Create a route that will handle Twilio webhook requests, sent as an
// HTTP POST to /voice in our application
app.post('/name', (request, response) => {
  const tml = new VoiceResponse();
  tml.say({ voice: 'alice' }, 'What is your name?');
  tml.record({
    action: '/hangup',
    finishOnKey: 1,
    timeout: 10,
    recordingStatusCallback: '/name_record'
  });
  response.type('text/xml');
  response.send(tml.toString());
});
app.post('/hangup', (request, response) => {
  const tml = new VoiceResponse();
  tml.hangup();
  response.type('text/xml');
  response.send(tml.toString());
});
/**app.post('/age', (request, response) => {
  const tml = new VoiceResponse();
  tml.say({ voice: 'alice' }, 'What is your age');
  tml.record({
    action: '/',
    finishOnKey: 1,
    timeout: 10,
    recordingStatusCallback: '/age_record'
  });
  response.type('text/xml');
  response.send(tml.toString());
});**/
app.post('/name_record', (req, res)=>{
  console.log("Got name record now");
  console.log(req.body.AccountSid);
})
app.post('/age_record', (req, res)=>{
  console.log(req);
})
// Create an HTTP server and listen for requests on port 3000
app.listen(PORT, () => {
  console.log(
    'Now listening on port 3000. ' +
    'Be sure to restart when you make code changes!'
  );
});
