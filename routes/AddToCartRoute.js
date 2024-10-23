const express = require("express");
const {addToCart} = require("../db_operations/AddToCart")
const verifyToken = require('./authMiddleware');
router = express.Router()

 router.post('/AddToCart', verifyToken, async (req, res) => {
    try {
        const {productID ,quantity } = req.body
        
        response  = await  addToCart(req.userId,productID,quantity)
        res.send("added successfully ")
    } catch (error) {
        console.log(`Error adding address :  ${error}`)
    }
    
 });
module.exports = router
