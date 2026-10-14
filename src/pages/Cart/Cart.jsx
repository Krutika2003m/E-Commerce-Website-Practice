import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Header from "../../Components/Header/Header"
import "./Cart.css"

function Cart() {
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState("");
  const [removeId, setRemoveId] = useState(null);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const increaseQuantity = (id) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          quantity: Number(item.quantity) + 1,
        }
      }

      return item
    })

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };


  const decreaseQuantity = (id) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          quantity: Math.max(Number(item.quantity) - 1, 1),
        };
      }

      return item;
    });

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };


  const handleQuantityChange = (id, value) => {

    if (value === "") {
      const updatedCart = cart.map((item) =>
        item.id === id
          ? { ...item, quantity: "" }
          : item
      );

      setCart(updatedCart);
      return;
    }

    if (!/^\d+$/.test(value)) {
      return;
    }

    const number = Number(value);

    if (number < 1) {
      return;
    }

    const updatedCart = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: number }
        : item
    );

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

 const removeFromCart = (id) => {
  const updatedCart = cart.filter((item) => item.id !== id);

  setCart(updatedCart);
  localStorage.setItem("cart", JSON.stringify(updatedCart));

  window.dispatchEvent(new Event("cartUpdated"));

  setRemoveId(null);

  setMessage("Product removed from cart successfully!");

  setTimeout(() => {
    setMessage("");
  }, 2000);
};

  const confirmRemove = (id) => {
    setRemoveId(id);
  };

  const clearCart = () => {
    localStorage.removeItem("cart");
    setCart([]);
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <>
      <Header />

      {message && (
        <div className="success-message">  ✓ {message}  </div>
      )}

      <div className="cart-container">
        <h1>Shopping Cart</h1>
        {cart.length === 0 ? (
          <div className="empty-cart">
            <h2>Your cart is empty</h2>
            <Link to="/products">  <button>Continue Shopping</button> </Link>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img src={item.thumbnail} alt={item.title} />

                  <div className="cart-info">
                    <h3>{item.title}</h3>
                    <p>  Price: ${item.price}  </p>

                    <div className="cart-quantity">
                      <strong>Quantity:</strong>

                      <div className="quantity-buttons">
                        <button onClick={() => decreaseQuantity(item.id)}>
                          -
                        </button>

                        <input  type="text"  value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                        />

                        <button onClick={() => increaseQuantity(item.id)}>
                          +
                        </button>
                      </div>
                    </div>

                    <p className="item-total">
                      Total: $
                      {(item.price * item.quantity).toFixed(2)}
                    </p>

                    <button  className="remove-button"
                      onClick={() => confirmRemove(item.id)}
                    >
                      Remove
                    </button>

                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h2>  Total Amount: ${totalPrice.toFixed(2)}  </h2>
              <button className="clear-button" onClick={clearCart} >
                Clear Cart
              </button>

              <Link to="/products">
                <button className="shopping-button">  Continue Shopping  </button>
              </Link>

              <Link to="/checkout">
                <button className="checkout-button">  Checkout</button>
              </Link>

            </div>
          </>
        )}
      </div>
      {removeId !== null && (
  <div className="confirmation-overlay">

    <div className="confirmation-box">
      <h2>Remove Product?</h2>
      <p>  Are you sure you want to remove this product from your cart?</p>

      <div className="confirmation-buttons">
        <button  className="cancel-button"
          onClick={() => setRemoveId(null)}
        >
          Cancel
        </button>

        <button  className="confirm-remove-button"
          onClick={() => removeFromCart(removeId)}
        >
          Remove
        </button>

      </div>

    </div>

  </div>
)}
    </>
  );
}

export default Cart;