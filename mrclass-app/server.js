const fs = require('fs');
const https = require('https');
const express = require('express');
const next = require('next');

const privateKey = fs.readFileSync('key_no_pass.pem', 'utf8');
const certificate = fs.readFileSync('cert.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Custom API route example
  server.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from the API!' });
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  const httpsServer = https.createServer(credentials, server);

  const PORT = process.env.PORT || 3000;
  httpsServer.listen(PORT, () => {
    console.log(`> Ready on https://localhost:${PORT}`);
  });
});