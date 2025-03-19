const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors')
const connect = require("./connect.cjs")
const productRoutes = require('./routes/productRoutes.cjs');
const orderRoutes = require('./routes/orderRoutes.cjs');

// Express Initialization
const app = express()
app.use(express.json())

// Middleware
app.use(cors())

// First connect to the database, then start the server
async function startServer() {
    try {
        // Connect to MongoDB first
        await connect.connectToServer();
        console.log("Database connection established");

        // Connect Routes after successful DB connection
        app.use('/products', productRoutes);
        app.use('/orders', orderRoutes);

        // Start the server only after database is connected
        const PORT = 3000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error("Failed to start server:", err);
        process.exit(1);
    }
}

// Start the server
startServer();