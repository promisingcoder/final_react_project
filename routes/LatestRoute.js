const express = require('express');
const router = express.Router();
const { Product } = require("../models/ProductSchema"); 

router.get("/latest", async function (req, res) {
    try {
        const products = await Product.find({});

        if (products.length === 0) {
            return res.status(404).send("No products found");
        }

        const latestProducts = products.sort((a, b) => new Date(b.MeasureDate) - new Date(a.MeasureDate));

        res.send(latestProducts);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching products");
    }
});

module.exports = router;
