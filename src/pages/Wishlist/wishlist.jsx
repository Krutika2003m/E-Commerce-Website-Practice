import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../Components/Header";
import { FaHeart } from "react-icons/fa";
import "./Wishlist.css";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const savedWishlist =
      JSON.parse(localStorage.getItem("wishlist")) || [];

    setWishlist(savedWishlist);
  }, []);

  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlist.filter(
      (product) => product.id !== id
    );

    setWishlist(updatedWishlist);

    localStorage.setItem(
      "wishlist",
      JSON.stringify(updatedWishlist)
    );
  };

  return (
    <>
      <Header />

      <div className="wishlist-page">
        <h1>My Wishlist</h1>

        {wishlist.length === 0 ? (
          <div className="empty-wishlist">
            <FaHeart />
            <h2>Your wishlist is empty</h2>
            <p>Add products by clicking the heart.</p>

            <Link to="/products">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <p>
              {wishlist.length} product
              {wishlist.length > 1 ? "s" : ""} in your wishlist
            </p>

            <div className="wishlist-container">
              {wishlist.map((product) => (
                <div
                  className="wishlist-card"
                  key={product.id}
                >
                  <div className="wishlist-image">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                    />
                  </div>

                  <h3>{product.title}</h3>

                  <p>{product.category}</p>

                  <p>
                    Brand: {product.brand || "N/A"}
                  </p>

                  <h4>${product.price}</h4>

                  <Link
                    to={`/products/${product.id}`}
                    className="wishlist-details"
                  >
                    View Details
                  </Link>

                  <button
                    onClick={() =>
                      removeFromWishlist(product.id)
                    }
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Wishlist;