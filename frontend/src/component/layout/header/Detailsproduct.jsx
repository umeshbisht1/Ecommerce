import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
function Detailsproduct() {
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
    navigate(`/ordernow/${product._id}`);
  };
  return data ? (
    <div className="container mx-auto p-4">
      <div className="flex justify-around">
        <div className=" flex justify-between">
          <div className="left">
            //place the image
            <div className="">
              <img src="" alt="" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAHtCmA_RepVfTf_9blQPO98NK3yYWg49VaA&usqp=CAU"
                alt=""
              />
            </div>
            <div className="">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMx58MJP772QSHRJMwSxt4A79LYvjSkp8cmg&usqp=CAU"
                alt=""
              />
            </div>
            <div className="">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuCGMl9tOzBOrxBIT5cqDo-tjztq9ns0dg6w&usqp=CAU"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="p-4 bg-gray-200 rounded-md">
            <h2 className="text-lg font-semibold mb-2">{data.name}</h2>
            <p className="mb-2">{data.description}</p>
            <p className="mb-2">Price: ${data.price}</p>
            <p className="mb-2">Category: {data.category}</p>
            <p className="mb-2">Stock: {data.stock}</p>
            <div className="mb-2 text-gray-500">
              Rating:{" "}
              <ReactStars
                count={5}
                // onChange={ratingChanged}
                value={data.rating}
                isHalf={true}
                edit={false}
                size={24}
                activeColor="#ffd700"
              />
            </div>
            <p className="mb-2">Number of Reviews: {data.numofdreview}</p>
            <div className="flex justify-between mt-4">
              <button
                onClick={handleAddToCart}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    "Loading..."
  );
}

export default Detailsproduct;
