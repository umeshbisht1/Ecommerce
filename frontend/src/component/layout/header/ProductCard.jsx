// ProductCard.js
import ReactStars from "react-rating-stars-component";
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
const ProductCard = ({ product }) => {
  const navigate=useNavigate();
  
  const go=()=>{
   navigate(`/product`,{
    state: { data: product },
  })
  }
  
  return (
    <>
    <div
    key={product._id}
    className="p-6 bg-white shadow-md rounded-lg flex flex-col justify-between mx-9 my-4"
  >
    {product.images[0].url && (
      <img
        src={product.images[0].url}
        alt={product.name.toUpperCase()}
        className="w-full h-48 object-cover rounded-t-lg"
      />
    )}
    <div className="flex-grow">
      <h2 className="text-xl font-bold mb-2">{product.name.toUpperCase()}</h2>
      <p className="mb-2 text-gray-600">{product.description}</p>
      <p className="mb-2 text-lg font-bold">₹{product.price}</p>

      <p className="mb-2 text-gray-500">Category: {product.category}</p>
      <p className="mb-2 text-gray-500">Stock: {product.stock}</p>
      <div className="mb-2 text-gray-500">
        Rating:{" "}
        <ReactStars
          count={5}
          // onChange={ratingChanged}
          value={product.rating}
          isHalf={true}
          edit={false}
          size={24}
          activeColor="#ffd700"
        />
      </div>
    </div>

      {/* Add to Cart, Buy Now buttons, etc. */}
      <div className="mt-4 flex justify-between items-center gap-3">
        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">Add to Cart</button>
        <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700" onClick={go}>Buy Now</button>
      </div>
    </div>
    
    </>
  );
};

export default ProductCard;
