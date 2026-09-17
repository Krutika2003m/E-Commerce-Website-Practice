import { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

function Header() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (search.trim() === "") {
      setProducts([]);
      return;
    }
    fetch(`https://dummyjson.com/products/search?q=${search}`)
      .then((res) => res.json())
      .then((productData) => {
        setProducts(productData.products);
      });
  }, [search]);

  return (
    <header className="header">
      <Link to="" className="logo"> ShopEasy </Link>
       <Link to="/" className="home">Home</Link>
      <Link to="/products" className="products-link"> Products </Link>


      <div className="search">
        <input type="text" placeholder="Search products" value={search} onChange={(e) => setSearch(e.target.value)}
        />

        <button>Search</button>
        
        {products.length > 0 && (<div className="search-results">
          {products.slice(0, 5).map((product) => (
            <Link to={`/products/${product.id}`}
              key={product.id} className="search-item" >
              <img src={product.thumbnail} alt={product.title} />
              <span>{product.title}</span>
            </Link>
          ))}
        </div>
        )}

      </div>

      <Link to="/cart" className="cart">
        <FaShoppingCart />
        <span>Cart</span>
      </Link>
    </header>
  );
}

export default Header;