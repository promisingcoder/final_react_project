const express = require("express");
const {GetProducts} =  require("./GetProducts")
var cors = require('cors')

conn_string  = process.env.conn_string

const app = express();
app.use(cors())

const port = 3000;

app.get("/products", function (req, res) {
  result = GetProducts(conn_string).then((data) => res.send(data))
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});