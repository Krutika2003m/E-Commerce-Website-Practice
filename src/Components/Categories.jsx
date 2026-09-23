import { useNavigate } from "react-router-dom";
const categories = [
  "Electronics",
  "Men's",
  "Women's",
  "Home",
  "Beauty",
  "Sports",
  "Groceries",
  "Vehicles",
];
const images = [
  "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=600&q=80",];

function Categories() {
  
  const navigate = useNavigate();

  const viewProducts = (category) => {

    navigate(`/products?category=${category}`);
  };
  return (<div className="categories">
    <h2>Featured Categories</h2>

    <div className="category-list">

      {categories.map((category, index) => (
        <div className="category-card" key={category} style={{ backgroundImage: `url("${images[index]}")`, }} >

          <div className="category-content"> <h3>{category}</h3> <button onClick={() => viewProducts(category)} >

            View Products </button>
          </div>

        </div>

      ))}

    </div>

  </div>);

}


export default Categories;