const express = require('express');
const router = express.Router();
const User = require('../models/UserSchema');
const bcrypt = require('bcrypt');
const {mongoose}  =  require("mongoose")

router.post('/register', async (req, res) => {
    let items = {}
    
        
        items["passwordHash"] =  await bcrypt.hash(req.body["password"], 10)
        conn =  process.env.conn_string
        console.log(items)
        await mongoose.connect(conn)
        res.json({"res" : "worked"})
        const user = new User({...items});
        await user.save();
    
    
    
    } )
module.exports = router