import { Link } from "react-router-dom";
import {
  FaShoppingBag,
  FaHeart,
  FaShoppingCart,
  FaBoxOpen
} from "react-icons/fa";
import "./About.css";

function About() {
  return (
    <div className="about-page">

      <section className="about-hero">
        <h1>About ShopEasy</h1>
        <p>  Your simple and convenient online shopping destination.  </p>
        <Link to="/products" className="shop-btn">  Explore Products </Link>
      </section>

      <section className="about-section">
        <div className="about-text">
          <h2>Welcome to ShopEasy</h2>
          <p>
            ShopEasy is a user-friendly e-commerce platform designed
            to make online shopping simple, convenient, and enjoyable.
          </p>

          <p>
            Customers can browse products from different categories,
            search and filter products, add their favorite items to
            the wishlist, manage their shopping cart, and complete
            the checkout process easily.
          </p>

          <p>
            ShopEasy also provides order management features that
            allow customers to view their placed and cancelled orders.
          </p>
        </div>

        <div className="about-highlight">
          <FaShoppingBag />
          <h3>Simple Shopping</h3>
          <p>  Everything you need for a smooth online shopping experience.  </p>
        </div>

      </section>

      <section className="offer-section">
        <h2>What We Offer</h2>

        <div className="offer-container">
          <div className="offer-card">
            <FaShoppingBag />
            <h3>Product Browsing</h3>
            <p>  Explore products across different categories.  </p>
          </div>

          <div className="offer-card">
            <FaHeart />
            <h3>Wishlist</h3>
            <p>  Save your favorite products for later.  </p>
          </div>

          <div className="offer-card">
            <FaShoppingCart />
            <h3>Shopping Cart</h3>
            <p>  Add and manage products before checkout.  </p>
          </div>

          <div className="offer-card">
            <FaBoxOpen />
            <h3>Order Management</h3>
            <p>  Easily view and manage your orders. </p>
          </div>

        </div>

      </section>

      <section className="mission-section">
        <h2>Our Mission</h2>
        <p>
          Our mission is to provide customers with a simple,
          convenient, and user-friendly online shopping experience.
          We aim to make product discovery, shopping, checkout,
          and order management easy and accessible.
        </p>

      </section>
      <section className="why-section">
        <h2>Why Choose ShopEasy?</h2>
        <div className="why-container">
          <div>✓ Easy Product Search</div>
          <div>✓ Category & Price Filters</div>
          <div>✓ Wishlist Management</div>
          <div>✓ Simple Shopping Cart</div>
          <div>✓ Easy Checkout</div>
          <div>✓ Order Management</div>

        </div>

      </section>


    </div>
  );
}

export default About;