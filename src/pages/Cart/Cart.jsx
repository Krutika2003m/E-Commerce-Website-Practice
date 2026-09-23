import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../Components/Header";
import "./Cart.css";

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  // Increase quantity
  const increaseQuantity = (id) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }

      return item;
    });

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Decrease quantity
  const decreaseQuantity = (id) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          quantity: item.quantity > 1 ? item.quantity - 1 : 1,
        };
      }

      return item;
    });

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

 const removeFromCart = (id) => {
  const updatedCart = cart.filter((item) => item.id !== id);

  setCart(updatedCart);
  localStorage.setItem("cart", JSON.stringify(updatedCart));

  window.dispatchEvent(new Event("cartUpdated"));
};

  // Clear cart
  const clearCart = () => {
    localStorage.removeItem("cart");
    setCart([]);
  };

  // total amount
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <>
      <Header />

      <div className="cart-container">
        <h1>Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <h2>Your cart is empty</h2>

            <Link to="/products">
              <button>Continue Shopping</button>
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>

                  <img
                    src={item.thumbnail}
                    alt={item.title}
                  />

                  <div className="cart-info">

                    <h3>{item.title}</h3>

                    <p>
                      Price: ${item.price}
                    </p>

                    {/* Quantity */}
                    <div className="cart-quantity">
                      <strong>Quantity:</strong>

                      <div className="quantity-buttons">
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                        >
                          -
                        </button>

                        <span>{item.quantity}</span>

                        <button
                          onClick={() => increaseQuantity(item.id)}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Product total */}
                    <p className="item-total">
                      Total: $
                      {(item.price * item.quantity).toFixed(2)}
                    </p>

                    <button
                      className="remove-button"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>

                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="cart-summary">

              <h2>
                Total Amount: ${totalPrice.toFixed(2)}
              </h2>

              <button
                className="clear-button"
                onClick={clearCart}
              >
                Clear Cart
              </button>

              <Link to="/products">
                <button className="shopping-button">
                  Continue Shopping
                </button>
              </Link>
              <Link to="/checkout">
                <button className="checkout-button">
                  Checkout
                </button>
              </Link>

            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Cart;