const express = require("express");
const AddAddress = require("../db_operations/AddAddress")
const verifyToken = require('./authMiddleware');
router = express.Router()
 router.post('/AddAddress', verifyToken, (req, res) => {
    res.status(200).json({ message: 'Protected route accessed' });
    try {
        console.log(req.body.address)
        AddAddress(req.body.address)
    } catch (error) {
        console.log(`Error adding address :  ${error}`)
    }
    
 });
module.exports = router
