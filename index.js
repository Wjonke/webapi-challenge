require('dotenv').config()
const server = require('./api/server');





//Heroku can see the process.env.PORT, my comp will not so then it will run port 8000
const port = process.env.PORT || 8000;




server.listen(port, ()=> console.log(` server running on ${port} `))