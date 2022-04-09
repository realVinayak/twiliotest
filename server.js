const express = require('express');
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const 

const app = express();
const PORT = process.env.PORT || 5000;
// Create a route that will handle Twilio webhook requests, sent as an
// HTTP POST to /voice in our application
app.post('/voice', (request, response) => {
  // Use the Twilio Node.js SDK to build an XML response
  
  const response1 = new VoiceResponse();
  response1.record({
    action: '/name_record',
    finishOnKey: 1,
    timeout: 10,
  });
  
  console.log(response1.toString());
});
app.post('/name_record', (req, res)=>{
  console.log(req);
})

// Create an HTTP server and listen for requests on port 3000
app.listen(PORT, () => {
  console.log(
    'Now listening on port 3000. ' +
    'Be sure to restart when you make code changes!'
  );
});
