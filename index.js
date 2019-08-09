const express = require('express');
const choreRouter = require('./chores/choreRouter');

const port = process.env.PORT || 8000;

const server = express();


server.get('/',  (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware
server.use(express.json())

//routes
server.use("/", choreRouter)

server.listen(port, ()=> console.log(` server running on ${port} `))