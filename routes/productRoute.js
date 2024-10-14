const express = require("express");
const GetProductById = require("./db_operations/GetProductById")
const router =  express.Router()

router.get('/products/:id', function(req, res) {
  
    product =  GetProductById(conn_string,req.params.id).then((data) => res.send(data));
    
  });