const express = require("express");
const verifyToken = require('./authMiddleware');
const { Types: { ObjectId } } = require("mongoose");
const {User} = require("../models/UserSchema")
router = express.Router()

 router.get('/cart', verifyToken, async (req, res) => {
    


        const {cartItems } = req.body
        const user = await User.findOne({_id : new ObjectId(req.userId)});
        res.status(200).json(user.cart);
        
        




    
 });
module.exports = router
