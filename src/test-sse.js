const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3001,
  path: '/api/openai/chat',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};

const messages = JSON.stringify({
  messages: [
    { role: 'user', content: 'What can I see in Barcelona if I go for 3 days?' }
  ],
});

const req = http.request(options, (res) => {
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log('Received chunk:', chunk);
  });
  res.on('end', () => {
    console.log('No more data in response.');
  });
});

req.on('error', (e) => {
  console.error(`Problem with request: ${e.message}`);
});

// Write data to request body
req.write(messages);
req.end();
