const express = require("express");
const {GetProducts} =  require("./GetProducts")
const GetProductById = require("./GetProductById")
var cors = require('cors')

conn_string  = process.env.conn_string

const app = express();
app.use(cors())

const port = 3000;

app.get("/products", function (req, res) {
  result = GetProducts(conn_string).then((data) => res.send(data))
});
app.get('/products/:id', function(req, res) {
  console.log(typeof req.params.id)
  
  product =  GetProductById(conn_string,req.params.id);
    res.send(product)
  
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});