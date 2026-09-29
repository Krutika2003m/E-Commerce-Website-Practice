import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Footer from "./Components/Footer/Footer";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import Wishlist from "./pages/Wishlist/Wishlist";
import Orders from "./pages/Orders/Orders";
import PlacedOrders from "./pages/Orders/PlacedOrders";
import CancelledOrders from "./pages/Orders/CancelledOrders";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route  path="/products"  element={<Products />}  />

        <Route   path="/products/:id" element={<ProductDetails />} />

        <Route  path="/cart"  element={<Cart />}  />

        <Route path="/checkout" element={<Checkout />} />

        <Route path="/wishlist" element={<Wishlist />} />

        <Route path="/orders" element={<Orders />} />

        <Route path="/orders/placed" element={<PlacedOrders />} />

        <Route path="/orders/cancelled" element={<CancelledOrders />} />

      </Routes>

      <Footer />                                 
    </BrowserRouter>
  );
}

export default App;