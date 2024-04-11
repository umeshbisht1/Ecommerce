import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
const Update_Delete = () => {
  const navigate = useNavigate();
  // const [products, setProducts] = useState([
  //     {
  //       numOfReview: 0,
  //       _id: '1',
  //       name: 'Lenovo Laptop',
  //       description: 'This is a Lenovo laptop.',
  //       price: 12000,
  //       rating: 4.5,
  //       images: [
  //         {
  //           public_id: 'sample image 1',
  //           url: 'https://via.placeholder.com/150',
  //           _id: '1',
  //         },
  //       ],
  //       category: 'Electronics',
  //       stock: 10,
  //       reviews: [],
  //     },
  //     {
  //       numOfReview: 0,
  //       _id: '2',
  //       name: 'Apple iPhone',
  //       description: 'This is an Apple iPhone.',
  //       price: 50000,
  //       rating: 4.8,
  //       images: [
  //         {
  //           public_id: 'sample image 2',
  //           url: 'https://via.placeholder.com/150',
  //           _id: '2',
  //         },
  //       ],
  //       category: 'Electronics',
  //       stock: 5,
  //       reviews: [],
  //     },
  //     // Add more products as needed
  //   ]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [update, setupdate] = useState(false);
  const [page, setpage] = useState(2);
  //fetching all the products from the server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/v1/products?page=${page}`); // Adjust the API endpoint accordingly
        const data = await response.json();
        setProducts(data.data); // Assuming "data" property contains the array of products
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(true);
      }
    };

    fetchData();
  }, [update, page]);
  //transfer constrol from one location to other location
  const increment = () => {
    setpage((prev) => prev + 1);
  };
  //for increment the page
  const decrement = () => {
    page > 1 ? setpage((prev) => prev - 1) : 1;
  };
  const handleUpdate = (product) => {
    navigate(`update`, {
      state: { data: product },
    });
  };

  const handleDelete = async (product) => {
    try {
      const del = await fetch(`/api/v1/admin/update/${product}`, {
        method: "DELETE",
      });
      const data = await del.json();
      setupdate(true);
    } catch (error) {
      console.log(`error`);
    }

    console.log("Deleting product:", product);
  };

  return loading ? (
    <h1><b>Loading the product Wait...</b></h1>
  ) : (
    <>
      {/*   product section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6  bg-slate-400 px-3">
        {products?.map((product) => (
          <div
            key={product._id}
            className="p-6 bg-white shadow-md rounded-lg flex flex-col justify-between my-5"
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
              <p className="mb-2 text-gray-500">
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
              </p>
            </div>
            <div className="flex justify-between mt-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={() => handleUpdate(product)}
              >
                Update
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleDelete(product._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* //pagination */}

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
  );
};
export default Update_Delete;
