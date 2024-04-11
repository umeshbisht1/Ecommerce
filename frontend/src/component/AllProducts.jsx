// AllProducts.js

import React, { useState, useEffect } from 'react';
import ProductCard from './layout/header/ProductCard';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setpage] = useState(2);
  const increment = () => {
    setpage((prev) => prev + 1);
  };
  //for increment the page
  const decrement = () => {
    page > 1 ? setpage((prev) => prev - 1) : 1;
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/v1/products?page=${page}`); // Adjust the API endpoint accordingly
        const data = await response.json();
        setProducts(data.data); // Assuming "data" property contains the array of products
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [page]); // The empty dependency array ensures the effect runs only once on component mount

  return (
    <div>
    

      {loading ? (
        <p>Loading...</p>
      ) : (
       <>
        <div className="container mx-auto  grid grid-cols-1 md:grid-cols-3 gap-8 bg-slate-300 ">
       {products.map((product,index) => (
           <ProductCard  key={index} product={product}></ProductCard>
          ))}
      </div>
      <div className="flex w-full h-10 justify-center items-center my-[20px] gap-[10%]">
        {page > 1 ? (
          <button
            className="py-4 px-7 rounded-md  border-[2px] font-bold "
            onClick={decrement}
          >
            <b>Prev</b>
          </button>
        ) : (
          ""
        )}
        <button
          className="py-4 px-7 rounded-md font-bold border-[2px]"
          onClick={increment}
        >
          <b>Next</b>
        </button>
      </div>
       </>
      )}
    </div>
  );
};

export default AllProducts;
