const express = require('express');
const VoiceResponse = require('twilio').twiml.VoiceResponse;


const app = express();
const PORT = process.env.PORT || 5000;

app.post('/name', (request, response) => {
  const tml = new VoiceResponse();
  tml.say({ voice: 'alice' }, 'What is your name');
  tml.record({
    action: '/age',
    finishOnKey: 1,
    timeout: 10,
    recordingStatusCallback: '/name_record',
    recordingStatusCallbackMethod: 'GET'
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
app.post('/age', (request, response) => {
  const tml = new VoiceResponse();
  tml.say({ voice: 'alice' }, 'What is your age');
  tml.record({
    action: '/location',
    finishOnKey: 1,
    timeout: 10,
    recordingStatusCallback: '/age_record',
    recordingStatusCallbackMethod: 'GET'
  });
  response.type('text/xml');
  response.send(tml.toString());
});
app.post('/location', (request, response) => {
  const tml = new VoiceResponse();
  tml.say({ voice: 'alice' }, 'Where do you currently live');
  tml.record({
    action: '/location_movement',
    finishOnKey: 1,
    timeout: 10,
    recordingStatusCallback: '/location_record',
    recordingStatusCallbackMethod: 'GET'
  });
  response.type('text/xml');
  response.send(tml.toString());
});
app.post('/location_movement', (request, response) => {
  const tml = new VoiceResponse();
  tml.say({ voice: 'alice' }, 'Where do you wanna work, and how far are you willing to relocate');
  tml.record({
    action: '/qualifications',
    finishOnKey: 1,
    timeout: 10,
    recordingStatusCallback: '/lm_record',
    recordingStatusCallbackMethod: 'GET'
  });
  response.type('text/xml');
  response.send(tml.toString());
});
app.post('/qualifications', (request, response) => {
  const tml = new VoiceResponse();
  tml.say({ voice: 'alice' }, 'What sort of job are you looking for, and what is your experience level');
  tml.record({
    action: '/hangup',
    finishOnKey: 1,
    timeout: 0,
    recordingStatusCallback: '/qual_record',
    recordingStatusCallbackMethod: 'GET'
  });
  response.type('text/xml');
  response.send(tml.toString());
});
app.post('/name_record', (req, res)=>{
  console.log("Got name record now");
  console.log(req.body.AccountSid);
})
app.post('/age_record', (req, res)=>{
  console.log(req);
})

app.listen(PORT, () => {
  console.log(
    'Now listening on port 3000. ' +
    'Be sure to restart when you make code changes!'
  );
});
