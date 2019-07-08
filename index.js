const express = require('express'); //CommonJS Modules

const server = express();

server.get('/', (req, res) => {
  res.send('Hello WEB20 node edition');
});

const port = 5000;
server.listen(port, () => console.log(`\n*** running on port ${port} ***\n`));
