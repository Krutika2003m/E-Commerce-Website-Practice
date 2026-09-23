import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route  path="/products"  element={<Products />}  />

        <Route   path="/products/:id" element={<ProductDetails />} />

        <Route  path="/cart"  element={<Cart />}  />

        <Route path="/checkout" element={<Checkout />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;