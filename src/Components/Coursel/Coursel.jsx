import { useState, useEffect } from "react"
import "./Coursel.css"

const images = [
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1498049794561-7780e7231661",
  "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1600&q=80",
];

function Banner() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prevImage) =>
        (prevImage + 1) % images.length
      )
    }, 3000)

    return () => clearInterval(timer);
  }, []);

  const nextImage = () => {
      setCurrentImage((prevImage) =>
      (prevImage + 1) % images.length
    );
  };

  const previousImage = () => {
    setCurrentImage((prevImage) =>
      (prevImage - 1 + images.length) % images.length
    )
  }

  return (
    <div className="banner">
      <img  src={images[currentImage]}  alt="ShopEasy Banner"  />
      <button className="previous"   onClick={previousImage} >  ❮  </button>
      <button className="next"  onClick={nextImage}  >  ❯ </button>
    </div>
  )
}

export default Banner
