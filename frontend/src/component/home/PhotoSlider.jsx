import React, { useState, useEffect } from "react";

const images = [
  "https://img.freepik.com/free-vector/hand-drawn-running-shoes-cartoon-illustration_23-2150961844.jpg?size=338&ext=jpg&ga=GA1.1.1700460183.1712534400&semt=sph",
  "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c2hvZXN8ZW58MHx8MHx8fDA%3D",
  "https://www.campusshoes.com/cdn/shop/files/FIRST-11G-787-L.GRY-BLK_2.jpg?v=1705644698",
]; // Array of image URLs

const PhotoSlider = () => {
  const [currentImage, setCurrentImage] = useState(0);

  // Function to move to the next image
  const nextImage = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Function to move to the previous image
  const prevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // Auto slide interval
  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 6000);

    return () => clearInterval(interval);
  }, []); // Run only once on component mount

  return (
    <div className="relative overflow-hidden w-[30vw] h-[50vh] rounded-xl">
      <img
        className="absolute inset-0 object-cover w-full h-full transition-opacity duration-500 bg-no-repeat bg-cover"
        src={images[currentImage]}
        alt={`Image ${currentImage + 1}`}
      />
      <button
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-l-md hover:bg-opacity-75 transition-colors duration-300"
        onClick={prevImage}
      >
        &lt;
      </button>
      <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-r-md hover:bg-opacity-75 transition-colors duration-300"
        onClick={nextImage}
      >
        &gt;
      </button>
    </div>
  );
};

export default PhotoSlider;
