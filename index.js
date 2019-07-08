const express = require('express'); //CommonJS Modules

const db = require('./data/hubs-model.js');

const server = express();

server.get('/', (req, res) => {
  res.send('Hello WEB20 node edition');
});

server.get('/hubs', (req, res) => {
  db.find()
    .then(hubs => {
      res.status(200).json(hubs);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

const port = 5000;
server.listen(port, () => console.log(`\n*** running on port ${port} ***\n`));
