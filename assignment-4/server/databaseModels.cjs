const mongoose = require('mongoose');

// Product schema
const productSchema = new mongoose.Schema({
    productId: {type: Number, required: true},
    name: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true, min: 0 },
});

// Order schema
const orderSchema = new mongoose.Schema({
    orderId: { type: Number, required: true },
    productName: { type: String, required: true },
    quantity: { type: Number, required: true, min: 0 },
    email: { type: String, required: true },
    deliveryDate: { type: Date, required: true },
});

const Product = mongoose.model('Product', productSchema);
const Order = mongoose.model('Order', orderSchema);

module.exports = {
    Product,
    Order
};