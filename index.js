const express = require("express");
const {GetProducts} =  require("./GetProducts")
const GetProductById = require("./GetProductById")
var cors = require('cors')
const bcrypt = require('bcrypt')


conn_string  = process.env.conn_string

const app = express();
app.use(cors())
app.use(express.json())
const port = 3000;

app.get("/products", function (req, res) {
  result = GetProducts(conn_string).then((data) => res.send(data))
});
app.get('/products/:id', function(req, res) {
  
  product =  GetProductById(conn_string,req.params.id).then((data) => res.send(data));
  
});
app.post('/user', function (req, res) {    
  response = {  
      data:req.body
  };  
  console.log(response)
  res.json(JSON.stringify(response));  
})  

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});