const express = require('express');
const router = express.Router();
const { Product } = require("../models/ProductSchema"); // Assuming ProductSchema is set up correctly

router.get("/latest", async function (req, res) {
    try {
        // Fetch all products from the database
        const products = await Product.find({});

        if (products.length === 0) {
            return res.status(404).send("No products found");
        }

        // Sort products by MeasureDate in descending order (newest first)
        const latestProducts = products.sort((a, b) => new Date(b.MeasureDate) - new Date(a.MeasureDate));

        // Send the sorted array of products as the response
        res.send(latestProducts);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching products");
    }
});

module.exports = router;
