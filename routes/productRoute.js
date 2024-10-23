const express = require("express");
const GetProductById = require("../db_operations/GetProductById")
const router =  express.Router()

router.get('/products/:id', async function(req, res) {
  
    product =  GetProductById(req.params.id).then((data) => res.send(data));
    
});
module.exports = router