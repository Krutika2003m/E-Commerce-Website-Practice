
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../Components/Header/Header";
import "./order.css";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("placed");

  const loadOrders = () => {
    const savedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    console.log("Orders from localStorage:", savedOrders);

    setOrders(savedOrders);
  };

  useEffect(() => {
    loadOrders();
  }, []);

 const cancelOrder = (orderId) => {
  const confirmCancel = window.confirm(
    "Are you sure you want to cancel this order?"
  );

  if (!confirmCancel) {
    return;
  }

  const updatedOrders = orders.map((order) =>
    order.orderId === orderId
      ? { ...order, status: "Cancelled" }
      : order
  );

  localStorage.setItem(
    "orders",
    JSON.stringify(updatedOrders)
  );

  setOrders(updatedOrders);

  alert("Order cancelled successfully!");
};

const filteredOrders = orders.filter((order) =>
  activeTab === "placed"
    ? order.status !== "Cancelled"
    : order.status === "Cancelled"
);

  return (
    <>
      <Header />

      <div className="orders-page">
<div className="orders-title-row">
  <h1>My Orders</h1>
  <div className="order-tabs">
    <button
      className={activeTab === "placed" ? "tab-btn active" : "tab-btn"}
      onClick={() => setActiveTab("placed")}  >
      Placed Orders
    </button>

    <button
      className={activeTab === "cancelled" ? "tab-btn active" : "tab-btn"}
      onClick={() => setActiveTab("cancelled")}  >
      Cancelled Orders
    </button>
  </div>
</div>

        {filteredOrders.length === 0 ? (
          <div className="no-orders">

  <h2>
    {activeTab === "placed"
      ? "No Placed Orders"
      : "No Cancelled Orders"}
  </h2>

  <p>
    {activeTab === "placed"
      ? "You have not placed any orders yet."
      : "You do not have any cancelled orders."}
  </p>

  {activeTab === "placed" && (
    <Link to="/products" className="shop-btn">
      Continue Shopping
    </Link>
  )}

</div>
        ) : (

          <div className="orders-container">

           {filteredOrders.map((order) => (

              <div  className="order-card"
                key={order.orderId}
              >

                <div className="order-header">
                  <div> <h3>Order ID</h3>
                    <p>{order.orderId}</p>  </div>

                  <div>  <h3>Order Date</h3>
                    <p>{order.date}</p>  </div>

                  <span className="order-status">  {order.status}  </span>

                </div>


                <div className="order-products">

                  {order.items &&
                    order.items.map((item) => (

                      <div  className="order-product"  key={item.id} >
                        <img  src={item.thumbnail} alt={item.title} />
                        <div className="product-info">
                          <h4>  {item.title}  </h4>
                          <p>  Quantity: {item.quantity}  </p>
                          <p> Price: ₹{item.price} </p>
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

                </div>

                <div className="order-address">
                  <h3>Delivery Address</h3>
                  {order.address && (
                    <>
                      <p>  <b> {order.address.name}  </b>  </p>

                      <p>
                        {order.address.address},{" "}
                        {order.address.city}
                      </p>

                      <p>
                        {order.address.state} -{" "}
                        {order.address.pincode}
                      </p>

                      <p>
                        Phone:{" "}
                        {order.address.phone}
                      </p>
                    </>
                  )}

                </div>

                <div className="order-payment">
                  <h3>Payment Method</h3>
                  <p>
                    {order.payment === "cod"
                      ? "Cash on Delivery"
                      : order.payment === "upi"
                        ? "UPI"
                        : "Credit / Debit Card"}
                  </p>
                </div>


                <div className="order-total">
                  <div>
                    <span>  Subtotal   </span>
                    <span>  ₹
                      {Number(order.subtotal || 0).toFixed(2)}
                    </span>
                  </div>

                  <div>
                    <span>  Delivery  </span>
                    <span> ₹
                      {Number(order.delivery || 0).toFixed(2)}
                    </span>
                  </div>

                  <div className="total">
                    <strong>  Total Amount </strong>
                    <strong>  ₹
                      {Number(order.total || 0).toFixed(2)}
                    </strong>
                  </div>
                </div>

                {order.status !== "Cancelled" && (
                  <div className="order-actions">
                    <button  className="cancel-order-btn"
                      onClick={() => cancelOrder(order.orderId)} >
                      Cancel Order
                    </button>

                  </div>
                )}

              </div>

            ))}

          </div>

        )}

      </div>
    </>
  );
}

export default Orders;

