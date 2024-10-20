const express = require("express");
const {addToCart} = require("../db_operations/AddToCart")
const verifyToken = require('./authMiddleware');
router = express.Router()

 router.post('/AddToCart', verifyToken, (req, res) => {
    res.status(200).json({ message: 'Protected route accessed' });
    try {
        const {userId, cartItems } = req.body
        
        console.log(req.body)
        addToCart(userId,cartItems,process.env.conn_string)
    } catch (error) {
        console.log(`Error adding address :  ${error}`)
    }
    
 });
module.exports = router
