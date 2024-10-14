const express = require('express');

const router =  express.Router()

router.get("/products", function (req, res) {
    result = GetProducts(conn_string).then((data) => res.send(data))
  });