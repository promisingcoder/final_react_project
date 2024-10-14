const express = require("express");
const router =  express.Router()

router.post('/user', function (req, res) {    
    response = {  
        data:req.body
    };  
    console.log(response)
    res.json(JSON.stringify(response));  
  })  