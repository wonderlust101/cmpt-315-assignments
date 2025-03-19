import Form from "@/components/Form";
import DateSelect from "@/components/Form/DateSelect";
import { useEffect, useState, useActionState } from "react";
import Select from "@/components/Form/Select";
import TextInput from "@/components/Form/TextInput";
import Button from "@/components/Button";
import { fetchProductById } from "@/api/products";
import { placeOrder } from "@/api/orders";
import { useParams } from "react-router-dom";
import Container from "@/components/Container";
import "./Order.scss";


export default function Order() {
    const { id } = useParams();
    const [state, formAction] = useActionState(submitOrder, { success: false, error: null });
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetchProductById(id)
            .then(setProduct)
            .catch((error) => console.error("Error fetching product:", error))
            .finally(() => setLoading(false));
    }, [id]);

    // Handles order submission via API
    async function submitOrder(prevState, formData) {
        const data = Object.fromEntries(formData);

        try {
            const response = await placeOrder({
                productName: product.name,
                quantity: Number(data.quantity),
                email: data.email,
                deliveryDate: data.deliveryDate,
            });

            console.log(response);

            return { success: true, error: null };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.error || "An error occurred while placing the order",
            };
        }
    }

    if (loading) return <p>Loading product details...</p>;
    if (!product) return <p>Product not found.</p>;

    return (
        <>
            <h1>Order</h1>

            <Container>
                <div className="order__product-details">
                    <h2>Product Details:</h2>
                    <p><b>Name:</b> {product.name}</p>
                    <p><b>Price:</b> ${product.price}</p>
                    <p><b>Available Stock:</b> {product.stock}</p>
                </div>

                <Form action={formAction}>
                    {/* Hidden field to store product ID */}
                    <input type="hidden" name="productId" value={id} />

                    <Select
                        label="Quantity:"
                        id="quantity"
                        name="quantity" // ✅ Added name
                        options={Array.from({ length: product.stock + 1 }, (_, i) => String(i))}
                    />

                    <DateSelect id="delivery-date" name="deliveryDate" label="Delivery Date:" />

                    <TextInput id="email" name="email" label="Email:" type="email" /> {/* ✅ Added name */}

                    <Button type="submit" className="button order__form-submit">
                        Confirm Order
                    </Button>
                </Form>

                {state.success && <p>Order placed successfully!</p>}
                {state.error && <p>{state.error}</p>}
            </Container>
        </>
    );
}