const express = require("express");
var cors = require('cors')
const bcrypt = require('bcrypt')
const registerRoute = require('./routes/SignUp');
conn_string  = process.env.conn_string

const app = express();
app.use(cors())
app.use(express.json())
app.post('/register', registerRoute);


const port = 3000;





app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});