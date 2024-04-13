import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
function Detailsproduct() {
  const navigate=useNavigate();
  const location = useLocation();
  const { data } = location.state;

  // Empty dependency array ensures the effect runs only once
  const handleAddToCart = () => {
    // Implement logic for adding product to cart
    console.log("Product added to cart");
  };

  const handleBuyNow = () => {
    // Implement logic for buying the product
    console.log("Product bought");
    // console.log(data);
    navigate(`/place`,{
      state:{product:data}
    });
  };
  return data ? (
    <div className="container mx-auto p-8 md:p-12 lg:p-16">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
    <div className="flex flex-col md:flex-row justify-between">
      <div className="md:mr-8 ">
        <img
          src={data.images}
          alt="Product Image"
          className="w-full h-full rounded-md shadow-lg"
        />
      </div>
      
      
    </div>
    <div className="p-6 bg-gray-100 rounded-md shadow-lg">
      <h2 className="text-2xl font-bold mb-2">{data.name}</h2>
      <p className="mb-4">{data.description}</p>
      <p className="mb-2 text-lg font-medium">Price: {data.price}</p>
      <p className="mb-2">Category: {data.category}</p>
      <p className="mb-2">Stock: {data.stock}</p>
      <div className="mb-4 flex items-center text-gray-500">
        <ReactStars
          count={5}
          value={data.rating}
          isHalf={true}
          edit={false}
          size={24}
          activeColor="#ffd700"
        />
        <span className="ml-2">({data.numofdreview} reviews)</span>
      </div>
      <div className="flex justify-between">
        <button
          onClick={handleAddToCart}
          className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors"
        >
          Add to Cart
        </button>
        <button
          onClick={handleBuyNow}
          className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition-colors"
        >
          Buy Now
        </button>
      </div>
    </div>
  </div>
</div>
  ) : (
    "Loading..."
  );
}

export default Detailsproduct;
