const express = require('express'); //CommonJS Modules

const Hubs = require('./data/hubs-model.js');

const server = express();

server.use(express.json()); // Server speaks JSON now

server.get('/', (req, res) => {
  res.send('Hello WEB20 node edition');
});

// READ IN CRUD
server.get('/hubs', (req, res) => {
  Hubs.find()
    .then(hubs => {
      res.status(200).json(hubs);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// CREATE IN CRUD
server.post('/hubs', (req, res) => {
  // axios.post(url, data) data is in req.body
  const hubInfo = req.body;
  Hubs.add(hubInfo)
    .then(hub => {
      res.status(201).json(hub);
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

// DELETE IN CRUD
server.delete('/hubs/:id', (req, res) => {
  const { id } = req.params;
  Hubs.remove(id)
    .then(deletedHub => {
      if (deletedHub) {
        /* res.status(204).send();   */
        res.status(204).end();
      } else {
        res.status(404).json({ message: 'Hub not found.' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// UPDATE IN CRUD
server.put('/hubs/:id', (req, res) => {
  const id = req.params.id;
  const changes = req.body;

  Hubs.update(id, changes)
    .then(changedHub => {
      if (changedHub) {
        res.status(200).json(changedHub);
      } else {
        res.status(404).json({ message: 'Hub not found.' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

const port = 5000;
server.listen(port, () => console.log(`\n*** running on port ${port} ***\n`));
