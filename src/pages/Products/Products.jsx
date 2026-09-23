
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../../Components/Header";
import { FaHeart } from "react-icons/fa";
import "./products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchParams] = useSearchParams();

  const categoryFromURL = searchParams.get("category");
  const searchText = searchParams.get("search") || "";

  // Main Categories
  const categoryGroups = {
    Electronics: [
      "smartphones",
      "tablets",
      "laptops",
      "mobile-accessories",
    ],

    "Men's": [
      "mens-shirts",
      "mens-shoes",
      "mens-watches",
    ],

    "Women's": [
      "womens-dresses",
      "womens-shoes",
      "womens-bags",
      "womens-jewellery",
    ],

    Home: [
      "furniture",
      "home-decoration",
      "kitchen-accessories",
    ],

    Beauty: [
      "beauty",
      "skin-care",
      "fragrances",
    ],

    Sports: [
      "sports-accessories",
    ],

    Groceries: [
      "groceries",
    ],

    Vehicles: [
      "vehicle",
      "motorcycle",
    ],
  };

  // Filters
  const [selectedCategory, setSelectedCategory] = useState(
    categoryFromURL || "all"
  );

  const [selectedBrand, setSelectedBrand] = useState("all");

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [sortBy, setSortBy] = useState("default");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  // Wishlist
const [wishlist, setWishlist] = useState(() => {
  return JSON.parse(localStorage.getItem("wishlist")) || [];
});

// Add / Remove Wishlist
const toggleWishlist = (product) => {
  const exists = wishlist.some(
    (item) => item.id === product.id
  );

  let updatedWishlist;

  if (exists) {
    // Remove product from wishlist
    updatedWishlist = wishlist.filter(
      (item) => item.id !== product.id
    );
  } else {
    // Add product to wishlist
    updatedWishlist = [...wishlist, product];
  }

  setWishlist(updatedWishlist);

  localStorage.setItem(
    "wishlist",
    JSON.stringify(updatedWishlist)
  );
};



  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        let url;

        if (searchText.trim() !== "") {
          url = `https://dummyjson.com/products/search?q=${searchText}`;
        } else {
          url = "https://dummyjson.com/products?limit=0";
        }

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Something went wrong");
        }

        const data = await response.json();

        setProducts(data.products);

        // Start from page 1
        setCurrentPage(1);

        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchText]);

  // Brands
  const brands = [
    ...new Set(
      products
        .map((product) => product.brand)
        .filter((brand) => brand)
    ),
  ];

  // Filtering
  let filteredProducts = products.filter((product) => {
    let categoryMatch = true;

    if (selectedCategory !== "all") {
      const selectedSubCategories =
        categoryGroups[selectedCategory];

      categoryMatch = selectedSubCategories
        ? selectedSubCategories.includes(product.category)
        : product.category === selectedCategory;
    }

    const brandMatch =
      selectedBrand === "all" ||
      product.brand === selectedBrand;

    const minPriceMatch =
      minPrice === "" ||
      product.price >= Number(minPrice);

    const maxPriceMatch =
      maxPrice === "" ||
      product.price <= Number(maxPrice);

    return (
      categoryMatch &&
      brandMatch &&
      minPriceMatch &&
      maxPriceMatch
    );
  });

  // Sorting
  if (sortBy === "price-low-high") {
    filteredProducts.sort((a, b) => a.price - b.price);
  }

  if (sortBy === "price-high-low") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  if (sortBy === "popularity") {
    filteredProducts.sort((a, b) => b.rating - a.rating);
  }

  // Pagination
  const startIndex =
    (currentPage - 1) * productsPerPage;

  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  const totalPages = Math.ceil(
    filteredProducts.length / productsPerPage
  );

  if (loading) {
    return <h2 className="message">Loading products...</h2>;
  }

  if (error) {
    return <h2 className="message">{error}</h2>;
  }

  return (
    <>
      <Header />

      <div className="products-page">

        <h1>Products</h1>

        {/* Search Text */}
        {searchText && (
          <h3>
            Search results for: "{searchText}"
          </h3>
        )}

        {/* Filters */}
        <div className="filters">

          {/* Category */}
          <div className="filter-group">
            <label>Category</label>

            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="all">
                All Categories
              </option>

              {Object.keys(categoryGroups).map(
                (category) => (
                  <option
                    key={category}
                    value={category}
                  >
                    {category}
                  </option>
                )
              )}
            </select>
          </div>

          {/* Brand */}
          <div className="filter-group">
            <label>Brand</label>

            <select
              value={selectedBrand}
              onChange={(e) => {
                setSelectedBrand(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="all">
                All Brands
              </option>

              {brands.map((brand) => (
                <option
                  key={brand}
                  value={brand}
                >
                  {brand}
                </option>
              ))}
            </select>
          </div>

          {/* Minimum Price */}
          <div className="filter-group">
            <label>Min Price</label>

            <input
              type="number"
              placeholder="Min price"
              value={minPrice}
              onChange={(e) => {
                setMinPrice(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          {/* Maximum Price */}
          <div className="filter-group">
            <label>Max Price</label>

            <input
              type="number"
              placeholder="Max price"
              value={maxPrice}
              onChange={(e) => {
                setMaxPrice(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          {/* Sorting */}
          <div className="filter-group">
            <label>Sort By</label>

            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="default">
                Default
              </option>

              <option value="price-low-high">
                Price: Low → High
              </option>

              <option value="price-high-low">
                Price: High → Low
              </option>

              <option value="popularity">
                Popularity
              </option>
            </select>
          </div>

        </div>

        {/* Product Count */}
        <p>
          Showing {filteredProducts.length} products
        </p>

        {/* Products */}
        <div className="product-container">

          {filteredProducts.length === 0 ? (
            <h2>No products found</h2>
          ) : (
            currentProducts.map((product) => (
             <div className="product-card" key={product.id}>

  <button
    className={`wishlist-btn ${
      wishlist.some((item) => item.id === product.id)
        ? "active"
        : ""
    }`}
    onClick={() => toggleWishlist(product)}
  >
    <FaHeart />
  </button>

  <img
    src={product.thumbnail}
    alt={product.title}
  />

  <h3>{product.title}</h3>

  <p>{product.category}</p>

  <p>
    Brand: {product.brand || "N/A"}
  </p>

  <p>
    Rating: ⭐ {product.rating}
  </p>

  <h4>${product.price}</h4>

  <Link
    to={`/products/${product.id}`}
    className="view-details"
  >
    View Details
  </Link>

</div>
            ))
          )}

        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">

            <button
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage(currentPage - 1)
              }
            >
              Previous
            </button>

            <span>
              Page {currentPage} of {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage(currentPage + 1)
              }
            >
              Next
            </button>

          </div>
        )}

      </div>
    </>
  );
}

export default Products;
