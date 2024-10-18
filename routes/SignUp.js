const express = require('express');
const router = express.Router();
const {User} = require('../models/UserSchema');
const bcrypt = require('bcrypt');
const {mongoose}  =  require("mongoose")

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // Check if required fields are missing
        if (!username || !email || !password) {
            let errors = [];
            if (!username) errors.push("username is required");
            if (!email) errors.push("email is required");
            if (!password) errors.push("password is required");
    
            return res.status(400).json({ message: "Required fields:", errors });
        }
    
        // Check if username or email already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: "Username or email already exists." });
        }
    
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Remove password from req.body and create a user object
        delete req.body["password"];
        const user = new User({ ...req.body, passwordHash: hashedPassword });
    
        // Save the user to the database
        await user.save();
    
        // Return success message after saving
        res.status(200).json({ message: "Registered successfully!" });
    
    } catch (error) {
        // Handle validation and duplicate errors
        if (error.code === 11000) {
            return res.status(400).json({ message: "Duplicate field value exists.", error: error.keyValue });
        }
    
        // Handle other errors
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
    
}
    
     )
module.exports = router