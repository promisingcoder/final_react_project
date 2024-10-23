const express = require("express");
const verifyToken = require('./authMiddleware');
const DeleteFromCart = require("../db_operations/DeleteFromCart");
router = express.Router()
router.post('/DeleteFromCart', verifyToken, async (req, res) => {
    try {
        const { productID, quantity } = req.body;
        const response = await DeleteFromCart(req.userId, productID, quantity);
        res.send(response);
    } catch (error) {
        console.log(`Error deleting from cart: ${error}`);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router
