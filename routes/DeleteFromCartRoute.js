const express = require("express");
const verifyToken = require('./authMiddleware');
const DeleteFromCart = require("../db_operations/DeleteFromCart");
router = express.Router()

 router.post('/DeleteFromCart', verifyToken, (req, res) => {
    try {
        const {productID,quantity } = req.body
    
        console.log(DeleteFromCart(req.userId,productID,quantity))
    } catch (error) {
        console.log(`Error adding address :  ${error}`)
    }
    
 });
module.exports = router
