import { useState, useEffect } from "react";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css"

function Header() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  const getCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    let count = 0;
    cart.forEach((item) => {
      count += item.quantity;
    });

    setCartCount(count);
  };

  useEffect(() => {
    if (search.trim() === "") {
      setProducts([]);
      return;
    }

    fetch(`https://dummyjson.com/products/search?q=${search}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
      })
      .catch((error) => {
        console.log("Search error:", error);
      });
  }, [search]);

  useEffect(() => {
    getCartCount();

    window.addEventListener("cartUpdated", getCartCount);

    return () => {
      window.removeEventListener("cartUpdated", getCartCount);
    };
  }, []);

  // Search button
  const handleSearch = () => {
    if (search.trim() === "") {
      return;
    }

    navigate(`/products?search=${search}`);
    setProducts([]);
  };

  return (
    <header className="header">

      <Link to="/" className="logo">
        ShopEasy
      </Link>

      <Link to="/" className="home">
        Home
      </Link>

      <Link to="/products" className="products-link">
        Products
      </Link>

      <div className="search">

        <input  type="text"  placeholder="Search products"  value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button onClick={handleSearch}>  Search  </button>

        {products.length > 0 && (
          <div className="search-results">

            {products.slice(0, 5).map((product) => (
              <Link  to={`/products/${product.id}`}
                key={product.id}  className="search-item"
                onClick={() => setSearch("")}
              >
                <img  src={product.thumbnail}  alt={product.title}  />

                <span>{product.title}</span>
              </Link>
            ))}

          </div>
        )}

      </div>

      <Link to="/wishlist" className="wishlist-link">
        <FaHeart className="heart" />
      </Link>

      <Link to="/orders" className="orders-link">
        Orders
      </Link>

      <Link to="/cart" className="cart">

        <FaShoppingCart />

        {cartCount > 0 && (
          <span className="cart-count">
            {cartCount}
          </span>
        )}

      </Link>

    </header>
  );
}

export default Header;