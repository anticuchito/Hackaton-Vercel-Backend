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
  let data = '';

  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    data += chunk.replace(/^data: /gm, ''); // Elimina 'data: ' de cada línea
  });

  res.on('end', () => {
    // Elimina líneas vacías adicionales y espacios en blanco
    data = data.replace(/^\s*[\r\n]/gm, '');
    console.log('Full response received:', data);
  });
});

req.on('error', (e) => {
  console.error(`Problem with request: ${e.message}`);
});

// Write data to request body
req.write(messages);
req.end();
