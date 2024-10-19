const express = require('express');
const router = express.Router();
const { Product } = require("../models/ProductSchema"); 


router.get("/search", async (req, res) => {
    try {
      const keyword = req.query.keyword;
  
      const products = await Product.find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
          { category: { $regex: keyword, $options: "i" } }
        ]
      });
  
      res.status(200).json(products);
    } catch (error) {
      console.error("Error searching products:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
module.exports = router
  