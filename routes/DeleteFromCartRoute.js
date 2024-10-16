const express = require("express");
const {addToCart} = require("../db_operations/DeleteFromCart")
const verifyToken = require('./authMiddleware');
const DeleteFromCart = require("../db_operations/DeleteFromCart");
router = express.Router()

 router.post('/DeleteFromCart', verifyToken, (req, res) => {
    res.status(200).json({ message: 'Protected route accessed' });
    try {
        const {userId, cartItems } = req.body
        
        console.log(req.body)
        DeleteFromCart(userId,cartItems,process.env.conn_string)
    } catch (error) {
        console.log(`Error adding address :  ${error}`)
    }
    
 });
module.exports = router
