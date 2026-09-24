
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header";
import "./Checkout.css";

function Checkout() {

  const navigate = useNavigate();

  // Cart
  const [cart, setCart] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  // Address form
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [payment, setPayment] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {

    const data =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCart(data);

  }, []);

  const subtotal = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const delivery = subtotal > 0 ? 50 : 0;

  const total = subtotal + delivery;

  const clearForm = () => {

    setName("");
    setPhone("");
    setAddress("");
    setCity("");
    setState("");
    setPincode("");

    setEditId(null);
  };

  const addAddress = () => {

    if (
      !name ||
      !phone ||
      !address ||
      !city ||
      !state ||
      !pincode
    ) {
      setError("Please fill all address fields.");
      return;
    }

    if (phone.length !== 10) {
      setError("Phone number must be 10 digits.");
      return;
    }

    if (pincode.length !== 6) {
      setError("Pincode must be 6 digits.");
      return;
    }

    const newAddress = {
      id: Date.now(),
      name: name,
      phone: phone,
      address: address,
      city: city,
      state: state,
      pincode: pincode,
    };

    setAddresses([
      ...addresses,
      newAddress
    ]);

    // Select new address
    setSelectedAddress(newAddress.id);

    clearForm();
    setShowForm(false);
    setError("");
  };


  // Edit address
  const editAddress = (item) => {

    setName(item.name);
    setPhone(item.phone);
    setAddress(item.address);
    setCity(item.city);
    setState(item.state);
    setPincode(item.pincode);

    setEditId(item.id);
    setShowForm(true);
    setError("");
  };


  // Update address
  const updateAddress = () => {

    if (
      !name ||
      !phone ||
      !address ||
      !city ||
      !state ||
      !pincode
    ) {
      setError("Please fill all address fields.");
      return;
    }

    if (phone.length !== 10) {
      setError("Phone number must be 10 digits.");
      return;
    }

    if (pincode.length !== 6) {
      setError("Pincode must be 6 digits.");
      return;
    }

    const updatedAddresses = addresses.map((item) => {

      if (item.id === editId) {

        return {
          ...item,
          name: name,
          phone: phone,
          address: address,
          city: city,
          state: state,
          pincode: pincode,
        };

      }

      return item;

    });

    setAddresses(updatedAddresses);

    clearForm();
    setShowForm(false);
    setError("");
  };

  // Place order
  const placeOrder = () => {
    setError("");
    setSuccess("");

    // Check cart
    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }
    // Check address
    if (!selectedAddress) {
      setError("Please select a delivery address.");
      return;
    }

    // Check payment
    if (!payment) {
      setError("Please select a payment method.");
      return;
    }

    setSuccess("Order placed successfully!");

    localStorage.removeItem("cart");

    setTimeout(() => {
      navigate("/products");
    }, 2000);
  };


  return (
    <>
      <Header />

      <div className="checkout">

        <h1>Checkout</h1>

        {/* DELIVERY ADDRESS*/}

        <div className="card">

          <div className="title">

            <h2>1. Delivery Address</h2>

            <button className="add-btn"
              onClick={() => {
                clearForm(); setShowForm(true); setError("");
              }}
            >
              + Add Address
            </button>

          </div>

          {addresses.length === 0 && !showForm && (

            <p className="no-address">
              No delivery address added.
            </p>

          )}

          {addresses.map((item) => (

            <div className={
              selectedAddress === item.id
                ? "address selected"
                : "address"
            }
              key={item.id}
            >

              <div>
                <input type="radio" name="address"
                  checked={
                    selectedAddress === item.id
                  }
                  onChange={() =>
                    setSelectedAddress(item.id)
                  }
                />

                <strong> Delivery Address</strong>

              </div>

              <p>  <b>{item.name}</b>  </p>

              <p>  {item.address}, {item.city}  </p>

              <p>  {item.state} - {item.pincode}  </p>

              <p>  Phone: {item.phone}  </p>

              <button className="edit-btn" onClick={() => editAddress(item)}
              >
                Edit
              </button>

            </div>

          ))}

          {/* Address Form */}

          {showForm && (

            <div className="form">

              <h3>  {editId ? "Edit Address" : "Add New Address"} </h3>


              {error && (
                <p className="error">
                  {error}
                </p>
              )}


              <input type="text" placeholder="Full Name" value={name}
                onChange={(e) => setName(e.target.value)} />

              <input type="text" placeholder="Phone Number" maxLength="10" value={phone}
                onChange={(e) =>
                  setPhone(
                    e.target.value.replace(
                      /\D/g,
                      ""
                    )
                  )
                }
              />

              <input  type="text"  placeholder="Address"  value={address}
                onChange={(e) =>
                  setAddress(e.target.value)
                }
              />

              <input  type="text"  placeholder="City"  value={city}
                onChange={(e) =>
                  setCity(e.target.value)
                }
              />

              <input  type="text"  placeholder="State"  value={state}
                onChange={(e) =>
                  setState(e.target.value)
                }
              />

              <input  type="text"  placeholder="Pincode"  maxLength="6"  value={pincode}
                onChange={(e) =>
                  setPincode(
                    e.target.value.replace(
                      /\D/g,
                      ""
                    )
                  )
                }
              />
              <button className="save-btn"
                onClick={
                  editId ? updateAddress
                    : addAddress
                }
              >
                {editId ? "Update Address" : "Save Address"}
              </button>


              <button
                className="cancel-btn"
                onClick={() => {
                  clearForm();
                  setShowForm(false);
                  setError("");
                }}
              >
                Cancel
              </button>

            </div>

          )}

        </div>


        {/* PAYMENT METHOD */}

        <div className="card">

          <h2>2. Payment Method</h2>

          <label className="payment">

            <input type="radio" name="payment" value="cod" checked={payment === "cod"}
              onChange={(e) =>
                setPayment(e.target.value)
              }
            />
            Cash on Delivery
          </label>


          <label className="payment">

            <input  type="radio"  name="payment"  value="upi"  checked={payment === "upi"}
              onChange={(e) =>
                setPayment(e.target.value)
              }
            />
            UPI
          </label>

          <label className="payment">

            <input  type="radio"  name="payment"  value="card"  checked={payment === "card"}
              onChange={(e) =>
                setPayment(e.target.value)
              }
            />
            Credit / Debit Card

          </label>

        </div>


        {/* ORDER SUMMARY */}

        <div className="card">

          <h2>3. Order Summary</h2>


          {cart.length === 0 ? (

            <p className="no-address">
              Your cart is empty.
            </p>

          ) : (

            <>
              {/* Products */}

              {cart.map((item) => (

                <div
                  className="product"
                  key={item.id}
                >

                  <img
                    src={item.thumbnail}
                    alt={item.title}
                  />

                  <div className="product-info">

                    <h4>
                      {item.title}
                    </h4>

                    <p>
                      Quantity: {item.quantity}
                    </p>

                    <p>
                      ₹{item.price}
                    </p>

                  </div>

                  <strong>
                    ₹
                    {(
                      item.price *
                      item.quantity
                    ).toFixed(2)}
                  </strong>

                </div>

              ))}

              {/* Price */}

              <div className="price">

                <p> <span>Subtotal</span>
                  <b> ₹{subtotal.toFixed(2)} </b>
                </p>

                <p> <span>Delivery</span>
                  <b>  ₹{delivery.toFixed(2)} </b>
                </p>

                <h3>  <span>Total</span>
                  <b> ₹{total.toFixed(2)}  </b>
                </h3>

              </div>

              {/* Error */}

              {error && (
                <p className="error">  {error}  </p>
              )}

              {/* Success Popup */}

              {success && (
                <div className="success-popup">
                  <div className="success-box">

                    <div className="success-icon">
                      ✓
                    </div>
                    <h2>Order Placed Successfully!</h2>
                    <p>Thank you for your order.</p>

                  </div>
                </div>
              )}
              {/* Place Order */}

              <button className="place-order" onClick={placeOrder}>
                Place Order
              </button>

            </>

          )}

        </div>

      </div>
    </>
  );
}

export default Checkout;


