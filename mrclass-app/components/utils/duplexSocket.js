const fs = require('fs');
const https = require('https');
const express = require('express');
const WebSocket = require('ws');

const privateKey = fs.readFileSync('key_no_pass.pem', 'utf8');
const certificate = fs.readFileSync('cert.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };

const app = express();
const server = https.createServer(credentials, app);

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('Client connected');



    ws.on('message', (message) => {
        if (message instanceof Buffer || message instanceof ArrayBuffer) {
            for (const client of wss.clients) {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(message);
                }
            }
        }
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});