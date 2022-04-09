const express = require('express');
const VoiceResponse = require('twilio').twiml.VoiceResponse;


const app = express();
const PORT = process.env.PORT || 5000;
// Create a route that will handle Twilio webhook requests, sent as an
// HTTP POST to /voice in our application
app.post('/', (request, response) => {
  // Use the Twilio Node.js SDK to build an XML response
  
  const tml = new VoiceResponse();
  tml.say({ voice: 'alice' }, 'hello world!');
  
  tml.record({
    action: '/name_record',
    finishOnKey: 1,
    timeout: 10,
  });
  response.type('text/xml');
  response.send(tml.toString());
});
app.post('/name_record', (req, res)=>{
  console.log(req.RecordingUrl);
})

// Create an HTTP server and listen for requests on port 3000
app.listen(PORT, () => {
  console.log(
    'Now listening on port 3000. ' +
    'Be sure to restart when you make code changes!'
  );
});
