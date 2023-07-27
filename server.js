const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const NodeMediaServer = require('node-media-server');
const cors = require('cors');

const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60,
  },
  http: {
    port: 8000,
    allow_origin: '*',
  },
};

const nms = new NodeMediaServer(config);

// Custom RTMP server URL
const customRTMPServerURL = 'rtmp://172.17.0.2:1935/live/stream';

nms.on('prePublish', async (id, StreamPath, args) => {

  console.log('Stream is publishing. StreamPath:', StreamPath);


  if (StreamPath === 'live') {
    const relaySession = nms.getNodeRelaySession(id, customRTMPServerURL);
    if (relaySession) {
      console.log('Relay session created.');
    } else {
      console.log('Failed to create relay session.');
    }
  }
});

nms.on('donePublish', async (id, StreamPath, args) => {

  console.log('Stream is done publishing. StreamPath:', StreamPath);
});

nms.run();

// Enable CORS for all routes
app.use(cors({
    origin: 'http://localhost:3000'
  }));
app.use(express.json());

app.post('/publish', (req, res) => {
    const { data } = req.body;
  
    console.log('Received POST request to /publish');
    console.log('Request body:', req.body);
  
  
    console.log('Data:', data);
  
  
    res.status(200).json({ message: 'Stream received and published successfully.' });
  });


server.listen(8080, () => {
  console.log('Node.js server listening on port 8080');
});
