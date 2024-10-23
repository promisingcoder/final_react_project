const express = require("express");
const {addToCart} = require("../db_operations/AddToCart")
const verifyToken = require('./authMiddleware');
router = express.Router()

 router.post('/AddToCart', verifyToken, async (req, res) => {
    try {
        const {productID } = req.body
        
        response  = await  addToCart(req.userId,productID)
        res.send(response)
    } catch (error) {
        console.log(`Error adding address :  ${error}`)
    }
    
 });
module.exports = router
