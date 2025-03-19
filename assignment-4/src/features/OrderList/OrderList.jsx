import {useEffect, useState} from "react";
import Table from "@/components/Table";
import {useNavigate} from "react-router-dom";
import {fetchProducts} from "@/api/products";
import {fetchOrders} from "@/api/orders";


export default function OrderList() {
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        fetchOrders()
            .then(setOrders)
            .catch(error => console.error("Error fetching products:", error))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Loading product details...</p>;
    if (!orders) return <p>Product not found.</p>;

    return (
        <>
            <h1>Order List</h1>

            <Table
                id="products"
                data={orders}
                columnHeaders={['Order ID', 'Product', 'Quantity', 'Delivery Date', 'Email']}
                dataKeys={['orderId', 'productName', 'quantity', 'deliveryDate', 'emailId']}
            />
        </>
    );
}