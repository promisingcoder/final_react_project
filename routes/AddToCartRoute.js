const express = require("express");
const AddToCart = require("../db_operations/AddToCart")
const verifyToken = require('./authMiddleware');
router = express.Router()

 router.post('/AddToCart', verifyToken, (req, res) => {
    res.status(200).json({ message: 'Protected route accessed' });
    try {
        const {userId, cartItem, itemPrice } = req.body
        console.log(req.body)
        AddToCart(userId,cartItem,itemPrice,process.env.conn_string)
    } catch (error) {
        console.log(`Error adding address :  ${error}`)
    }
    
 });
module.exports = router
