const express = require("express");
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
const database = require("../connect.cjs");

const orderRoutes = express.Router();

// Function to generate unique order IDs
async function getNextOrderId() {
    try {
        const db = database.getDb();
        console.log("Getting next order ID");

        const counter = await db.collection("counters").findOneAndUpdate(
            { _id: "orderId" },
            { $inc: { sequence_value: 1 } },
            { returnDocument: "after", upsert: true }
        );

        return counter.value?.sequence_value || 1;
    } catch (error) {
        console.error("Error:", error);
    }
}

// GET /orders - Fetch all placed orders
orderRoutes.get("/", async (req, res) => {
    try {
        const db = database.getDb();
        const orders = await db.collection("orders").find({}).toArray();
        if (!orders.length) return res.status(404).json({ message: "No orders found" });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /orders - Place a new order with transaction support
orderRoutes.post("/", async (req, res) => {
    const client = database.getClient();
    const session = client.startSession();

    try {
        session.startTransaction();

        const { productName, quantity, email, deliveryDate } = req.body;

        if (!productName || !quantity || !email || !deliveryDate) {
            throw new Error("Missing required fields");
        }

        // Validate email format
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            throw new Error("Invalid email format");
        }

        const db = database.getDb();
        const product = await db.collection("products").findOne({ name: productName }, { session });

        if (!product) {
            throw new Error("Product not found");
        }
        if (product.stock < quantity) {
            throw new Error("Insufficient stock available");
        }

        // Decrease stock within transaction
        const updateResult = await db.collection("products").updateOne(
            { name: productName, stock: { $gte: quantity } },
            { $inc: { stock: -quantity } },
            { session }
        );

        if (updateResult.modifiedCount === 0) throw new Error("Product stock no longer available");

        // Generate a new unique order ID
        const orderId = await getNextOrderId();

        // Create and store the order
        const newOrder = {
            orderId,
            productName,
            quantity,
            email,
            deliveryDate: new Date(deliveryDate).toISOString().split('T')[0]
        };

        await db.collection("orders").insertOne(newOrder, { session });

        await session.commitTransaction();
        res.status(201).json({ message: "Order placed successfully", orderId });
    } catch (error) {
        await session.abortTransaction();
        res.status(400).json({ error: error.message });
    } finally {
        session.endSession();
    }
});

module.exports = orderRoutes;