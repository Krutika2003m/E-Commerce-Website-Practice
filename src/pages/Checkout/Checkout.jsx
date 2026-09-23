
import { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import Header from "../../Components/Header";
import "./Checkout.css";

function Checkout() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (!name || !phone || !address || !city || !pincode) {
      alert("Please fill all the fields.");
      return;
    }

    if (phone.length !== 10) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    if (pincode.length !== 6) {
      alert("Please enter a valid 6-digit pincode.");
      return;
    }

    alert("Order placed successfully!");

    localStorage.removeItem("cart");

    navigate("/products");
  };

  return (
    <>
      <Header />

      <div className="checkout-container">

        <h1>Checkout</h1>
        

        {/* Address */}
        <div className="checkout-box">

          <h2>Delivery Address</h2>

          <form onSubmit={handlePlaceOrder}>

            <label>Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label>Phone</label>
            <input
              type="text"
              placeholder="Enter 10-digit phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <label>Address</label>
            <textarea
              placeholder="Enter your full address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></textarea>

            <label>City</label>
            <input
              type="text"
              placeholder="Enter your city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />

            <label>Pincode</label>
            <input
              type="text"
              placeholder="Enter 6-digit pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
            />





            

            {/* Order Summary */}
            <h2>Order Summary</h2>

            {cart.map((item) => (
              <div className="checkout-item" key={item.id}>

                <img
                  src={item.thumbnail}
                  alt={item.title}
                />

                <div>
                  <h3>{item.title}</h3>

                  <p>
                    Quantity: {item.quantity}
                  </p>

                  <p>
                    Price: $
                    {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>

              </div>
            ))}

            <h2 className="total">
              Total: ${totalPrice.toFixed(2)}
            </h2>

            <div className="checkout-buttons">

  <Link to="/cart">
    <button type="button" className="back-cart-button">
      ← Back to Cart
    </button>
  </Link>

  <button
    type="submit"
    className="place-order-button"
  >
    Place Order
  </button>

</div>

          </form>

        </div>

      </div>
    </>
  );
}

export default Checkout;

