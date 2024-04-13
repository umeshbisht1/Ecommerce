import React from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
function Updateproduct() {
  const location = useLocation();

  // Access the state data passed from the previous route
  const { data } = location.state;
  const navigate = useNavigate();
  const [c_error, seterror] = useState("");
  const [success, setsucess] = useState("");

  const [formData, setFormData] = useState({
    name: data.name,
    price: data.price,
    description: data.description,
    category: data.category,
    stock: data.stock,
  });
  const [images, setimages] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //to submit the data
  const handleSubmit = async (e) => {
    e.preventDefault();
    seterror("");
    setsucess("");
    try {
      formData.images = images;
      const res = await fetch(`/api/v1/admin/update/${data._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const response = await res.json();
      console.log(response);
      if (response.ok == false) {
        seterror(response.message);
      } else {
        setsucess("Product created Successfully");
        navigate(-1);
      }
    } catch (error) {
      console.log(error);
      seterror(error.message);
    }
  };
  return (
    <div className="flex w-full h-full justify-evenly  items-center mt-3 ">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Create Product
        </h1>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full border-2 border-gray-300 rounded-md py-2 px-3 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={handleChange}
              value={formData.name}
            />
          </div>
          <div>
            <label
              htmlFor="price"
              className="block font-medium text-gray-700 mb-1"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              className="w-full border-2 border-gray-300 rounded-md py-2 px-3 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={handleChange}
              value={formData.price}
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="w-full border-2 border-gray-300 rounded-md py-2 px-3 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows={3}
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="stock"
              className="block font-medium text-gray-700 mb-1"
            >
              Stock
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              className="w-full border-2 border-gray-300 rounded-md py-2 px-3 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={handleChange}
              value={formData.stock}
            />
          </div>
          <div>
            <label
              htmlFor="category"
              className="block font-medium text-gray-700 mb-1"
            >
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              className="w-full border-2 border-gray-300 rounded-md py-2 px-3 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="file"
              className="block font-medium text-gray-700 mb-1"
            >
              File
            </label>
            <input
              type="file"
              id="file"
              className="w-full border-2 border-gray-300 rounded-md py-2 px-3 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => setimages(e.target.files[0])}
            />
          </div>
          <button
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
      {c_error ? (
        <h1 className="w-full h-[30px] py-3 text-red-600 text-center😡😡😡">
          {c_error}
        </h1>
      ) : (
        ""
      )}
      {success ? (
        <h1 className="w-full h-[30px] py-3 text-green-600 text-center">
          {success}🎉🎉🎉
        </h1>
      ) : (
        ""
      )}
    </div>
  );
}

export default Updateproduct;
