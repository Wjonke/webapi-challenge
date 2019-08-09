const server = require("./server");


const port = process.env.PORT || 8000;


server.get('/', (req, res) => {
  res.status(200).json( `<h2>We are Deployed</h2>` )
});


server.listen(port, ()=> console.log(` server running on ${port} `));