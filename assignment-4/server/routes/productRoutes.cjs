const express = require('express');
const { ObjectId } = require('mongodb');
const database = require('../connect.cjs');

const productRoutes = express.Router();

// GET /products - Fetch all available products
productRoutes.get("/", async (req, res) => {
    try {
        const db = database.getDb();
        const products = await db.collection("products").find({}).toArray();

        if (products.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }

        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /products/:id - Fetch a specific product by ID
productRoutes.get("/:id", async (req, res) => {
    try {
        const db = database.getDb();
        const productId = parseInt(req.params.id, 10);

        if (isNaN(productId)) {
            return res.status(400).json({ message: "Invalid product ID" });
        }

        const product = await db.collection("products").findOne({ productId: productId });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = productRoutes;