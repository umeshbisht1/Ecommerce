import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// import ProductCard from "./ProductCard";

function SearchResults() {
    const location = useLocation();
    console.log(location.search);
    const queryParams = new URLSearchParams(location.search);
   
    
    const keyword = queryParams.get('keyword');
 
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        
        const response = await fetch(`/api/v1/products${location.search}`);
        const data = await response.json();
        setProducts(data.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchData();
  }, [location.search]);

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">Search Results</h1>
      <div className="grid grid-cols-3 gap-4">
        {products.map((product, index) => (
          <div key={index} className="bg-white p-4 shadow-md rounded-md">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-sm text-gray-600">{product.description}</p>
            <p className="text-sm text-gray-600">Price: {product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchResults;