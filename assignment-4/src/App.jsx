import {BrowserRouter, Route, Routes} from "react-router-dom";
import ProductList from "@/features/ProductList/index.js";
import Order from "@/features/Order/index.js";
import OrderList from "@/features/OrderList/index.js";
import '@/assets/styles/globals.scss'
import AppLayout from "@/layout/AppLayout";

const basename = import.meta.env.BASE_URL;

function App() {
    return (
        <BrowserRouter basename={basename}>
            <Routes>
                <Route element={<AppLayout/>}>
                    <Route path="/" element={<ProductList/>}/>
                    <Route path="/order/:id" element={<Order/>}/>
                    <Route path="/order-list" element={<OrderList/>}/>
            </Route>
        </Routes>
</BrowserRouter>
)
}

export default App