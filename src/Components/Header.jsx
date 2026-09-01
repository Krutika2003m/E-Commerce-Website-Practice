import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";

function Header() {
  const [search, setSearch] = useState("");

  return (
    <header className="header">
      <h2>ShopEasy</h2>

      <div className="search">
        <input
          type="text"
          placeholder="Search products"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button>Search</button>
      </div>

      <div className="cart">
        <FaShoppingCart />
        <span>Cart</span>
      </div>
    </header>
  );
}

export default Header;