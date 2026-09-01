import { useState, useEffect } from "react";

function Banner() {
  const images = [
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8",
    "https://images.unsplash.com/photo-1472851294608-062f824d29cc",
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d"
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {  nextImage();  });

    return () => clearInterval(timer);
  }, [],5000);

  const nextImage = () => {
    if (currentImage === images.length - 1) {
      setCurrentImage(0);
    } else {
      setCurrentImage(currentImage + 1);
    }
  };

  const previousImage = () => {
    if (currentImage === 0) {
      setCurrentImage(images.length - 1);
    } else {
      setCurrentImage(currentImage - 1);
    }
  };

  return (
    <div className="banner">

      <img
        src={images[currentImage]}
        alt="Banner"
      />

      <button
        className="previous"
        onClick={previousImage}
      >
        ❮
      </button>
      <button
        className="next"
        onClick={nextImage}
      >
        ❯
      </button>

    </div>
  );
}

export default Banner;