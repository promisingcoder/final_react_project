const express = require("express");
const {GetProducts} =  require("./GetProducts")
var cors = require('cors')
const bcrypt = require('bcrypt')


conn_string  = process.env.conn_string

const app = express();
const router =  express.Router()
app.use(cors())
app.use(express.json())
app.use(router)
const port = 3000;





app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});