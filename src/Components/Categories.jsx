import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const images = [
  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80",
];

function Categories() {
  const [categories, setCategories] = useState([]);

  //  navigate function
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const viewProducts = (category) => {
    navigate(`/products?category=${category}`);
  };

  return (
    <div className="categories">
      <h2>Featured Categories</h2>

      <div className="category-list">
        {categories.slice(0, 8).map((category, index) => {
          const name = category.name || category;
          const slug = category.slug || category;

          return (
            <div
              className="category-card"  key={index}
              style={{
                backgroundImage: `url("${images[index]}")`,
              }}
            >
              <div className="category-content">
                <h3>{name}</h3>

                <button onClick={() => viewProducts(slug)}>
                  View Products
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Categories;