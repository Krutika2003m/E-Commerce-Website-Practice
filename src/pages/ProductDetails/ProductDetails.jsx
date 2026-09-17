import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Header from "../../Components/Header";
import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://dummyjson.com/products/${id}`
        );

        if (!response.ok) {
          throw new Error("Product not found");
        }

        const data = await response.json();

        setProduct(data);
        setSelectedImage(data.images[0]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Add to cart
  const handleAddToCart = () => {
    alert("Please login or register to add products to your cart.");
    navigate("/login");
  };

  if (loading) {
    return <h2 className="message">Loading product...</h2>;
  }

  if (error) {
    return <h2 className="message">{error}</h2>;
  }

  if (!product) {
    return <h2 className="message">Product not found</h2>;
  }

  return (
  <>
    <Header />

    {/* BREADCRUMB */}
    <div className="breadcrumb">

      <Link to="/">Home</Link>
      <span>›</span>

      <Link to="/products">Products</Link>
      <span>›</span>
      
      <Link to={`/products?category=${product.category}`}>
        {product.category}
      </Link>

      <span>›</span>

      <span>{product.title}</span>

    </div>

    <div className="product-details">

        {/* LEFT SIDE */}
        <div className="product-image-section">

          <img  className="main-image"  src={selectedImage}  alt={product.title}  />

          <div className="thumbnails">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={product.title}
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="product-info">

          <h1>{product.title}</h1>
          <p className="category">  <strong>Category:</strong> {product.category}  </p>

          <p className="brand">  <strong>Brand:</strong> {product.brand || "N/A"}  </p>

          <p className="rating">  ⭐ <strong>Rating:</strong> {product.rating} / 5  </p>

          <h2>${product.price}</h2>

          <p className="description">  {product.description}</p>

          <p>  <strong>Stock:</strong> {product.stock}  </p>

          <p> <strong>Availability:</strong>{" "}  {product.availabilityStatus}  </p>

          <p>  <strong>Discount:</strong>{" "}  {product.discountPercentage}%  </p>

          <p>  <strong>Warranty:</strong>{" "}  {product.warrantyInformation}  </p>

          <p>  <strong>Shipping:</strong>{" "}  {product.shippingInformation}  </p>

          {/* quentity */}
          <div className="quantity-section">

            <strong>Quantity:</strong>

            <div className="quantity-selector">

              <button  onClick={() =>  setQuantity(quantity > 1 ? quantity - 1 : 1)  }
              >
                -
              </button>

              <span>{quantity}</span>

              <button
                onClick={() => {
                  if (quantity < product.stock) {  setQuantity(quantity + 1);  }
                }}
              >
                +
              </button>

            </div>

          </div>

          <button  className="add-cart"  onClick={handleAddToCart}
          >
            Add to Cart
          </button>

        </div>
      </div>


      {/* PRODUCT INFORMATION */}
      <div className="extra-product-info">

        <h2>Product Information</h2>

        <div className="info-grid">

          <div>  <strong>SKU</strong>  <p>{product.sku}</p>
          </div>

          <div>  <strong>Weight</strong>  <p>{product.weight}</p>
          </div>

          <div>   <strong>Minimum Order Quantity</strong>  <p>{product.minimumOrderQuantity}</p>
          </div>

          <div>  <strong>Return Policy</strong>  <p>{product.returnPolicy}</p>
          </div>

        </div>

        {/* TAGS */}
        <div className="tags-section">

          <h3>Tags</h3>

          <div className="tags">
            {product.tags.map((tag, index) => (
              <span key={index}>
                {tag}
              </span>
            ))}
          </div>

        </div>


        {/* DIMENSIONS */}
        <div className="dimensions-section">

          <h3>Dimensions</h3>

          <p>  <strong>Width:</strong>{" "}  {product.dimensions.width}  </p>

          <p>  <strong>Height:</strong>{" "}  {product.dimensions.height}  </p>

          <p>  <strong>Depth:</strong>{" "}  {product.dimensions.depth}  </p>

        </div>

        {/* REVIEWS */}
        <div className="reviews-section">

          <h2>Customer Reviews</h2>

          {product.reviews.map((review, index) => (

            <div className="review-card" key={index}>

              <div className="review-header">

                <strong>  {review.reviewerName}  </strong>

                <span>  ⭐ {review.rating}/5  </span>

              </div>

              <p>{review.comment}</p>

              <small>
                {new Date(review.date).toLocaleDateString()}
              </small>

            </div>

          ))}

        </div>
      </div>
    </>
  );
}

export default ProductDetails;