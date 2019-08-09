const express = require('express');
const choreRouter = require('./chores/choreRouter');

const port = process.env.PORT || 8000;

const server = express();
//custom middleware
server.use(express.json())

server.get('/api',  (req, res) => {
  res.send(`<h2>Deployed</h2>`)
});



//routes


server.listen(port, ()=> console.log(` server running on ${port} `))