import './ProductList.scss'
import Table from "@/components/Table";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {fetchProducts} from "@/api/products";

export default function ProductList() {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState()
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts()
            .then(setProducts)
            .catch(error => console.error("Error fetching products:", error))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Loading product details...</p>;
    if (!products) return <p>Product not found.</p>;

    return (
        <>
            <h1>Product List</h1>

            <Table
                id="products"
                data={products}
                columnHeaders={['Name', 'Price', 'Stock', 'Action']}
                dataKeys={['name', 'price', 'stock']}
                onActionClick={(id) => navigate(`/order/${id}`)}
            />
        </>
    );
}