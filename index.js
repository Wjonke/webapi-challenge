require('dotenv').config()
const api = require('./api/server');





//Heroku can see the process.env.PORT, my comp will not so then it will run port 8000
const port = process.env.PORT || 8000;




api.listen(port, ()=> console.log(`/n** API running on ${port} **/n`))