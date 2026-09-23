import { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);

  // Cart count
  const [cartCount, setCartCount] = useState(0);

  const navigate = useNavigate();

  // Get cart count
  const getCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    let count = 0;

    cart.forEach((item) => {
      count += item.quantity;
    });

    setCartCount(count);
  };

  // Show suggestions while typing
  useEffect(() => {
    if (search.trim() === "") {
      setProducts([]);
      return;
    }

    fetch(`https://dummyjson.com/products/search?q=${search}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
      });
  }, [search]);

  // Cart count update
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

        <input
          type="text"
          placeholder="Search products"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button onClick={handleSearch}>
          Search
        </button>

        {/* Suggestions */}
        {products.length > 0 && (
          <div className="search-results">

            {products.slice(0, 5).map((product) => (
              <Link
                to={`/products/${product.id}`}
                key={product.id}
                className="search-item"
                onClick={() => setSearch("")}
              >
                <img
                  src={product.thumbnail}
                  alt={product.title}
                />

                <span>{product.title}</span>
              </Link>
            ))}

          </div>
        )}

      </div>

      {/* Cart */}
      <Link to="/cart" className="cart">

        <FaShoppingCart />

        <span>Cart</span>

        {/* Count */}
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