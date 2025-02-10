function orderSummary(orders) {
    if (!orders)
        return []
    
    return orders.map(order => {
        // Sums the total amount
        const totalAmount = order.products.reduce((total, curProduct) => (
            total + curProduct.price * curProduct.quantity
        ), 0)

        // Count the quantities of each category
        const categories = order.products.reduce((categories, currentProduct) => {
            categories[currentProduct.category] = (categories[currentProduct.category] || 0) + currentProduct.quantity;
            return categories;
        }, {})

        return {
            id      : order.id,
            customer: order.customer,
            totalAmount,
            categories
        }
    })
}

const orders = [
    // Test Case 1: Multiple products from different categories
    {
        id      : 201, customer: 'Kim',
        products: [
            {name: 'Chair', category: 'Furniture', price: 50, quantity: 4},
            {name: 'Table', category: 'Furniture', price: 150, quantity: 1},
            {name: 'Pen', category: 'Stationery', price: 2, quantity: 10}
        ]
    },
    // Test Case 2: Single product order
    {
        id      : 202, customer: 'Mike',
        products: [
            {name: 'Smartphone', category: 'Electronics', price: 800, quantity: 1}
        ]
    },
    // Test Case 3: Empty order (no products)
    {
        id      : 203, customer: 'Ken',
        products: []
    },
    // Test Case 4: Multiple products in the same category
    {
        id      : 204, customer: 'Frank',
        products: [
            {name: 'Notebook', category: 'Stationery', price: 5, quantity: 5},
            {name: 'Pencil', category: 'Stationery', price: 1, quantity: 10}
        ]
    },
    // Test Case 5: High quantity and high price product
    {
        id      : 205, customer: 'Jill',
        products: [
            {name: 'Gaming PC', category: 'Electronics', price: 2000, quantity: 3}
        ]
    }
];
console.log(orderSummary(orders));


// Test Case 6: Empty array
const emptyOrder = [];
console.log(orderSummary(emptyOrder));


// Test Case 7: Null
const nullOrders = null;
console.log(orderSummary(nullOrders));


// Test Case 8: Undefined
const undefinedOrders = undefined;
console.log(orderSummary(undefinedOrders));