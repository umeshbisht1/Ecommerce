import { useState } from "react";
import React  from 'react'

function Create_product() {
    const [c_error ,seterror]=useState('');
    const [success ,setsucess]=useState('');

    const [formData, setFormData] = useState({
        name: '',
        price: 0,
        description: '',
        category: '',
        images: {
          public_id: 'Sample_id',
          url: '',
        },
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };
    
      const handleImageChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
          ...prevState,
          images: {
            ...prevState.images,
            [name]: value,
          },
        }));
      };
    //to submit the data
      const handleSubmit = async(e) => {
        e.preventDefault();
        seterror('');
        setsucess('');
      try {
        const res=await fetch('api/v1/admin/create',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(formData)
          });

          const data=await res.json();
          if(data.ok==false)
          {
            seterror(data.message)
          }
          else
          setsucess("Product created Successfully") 
      } catch (error) {
        console.log("error bawa in creating product");
        seterror("error bawa in creating product");
      }
      }
      return (
        <div className="flex w-full h-full justify-evenly  items-center mt-3 ">
            <h1 className="font-bold">Create Product</h1>
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md" method="post" enctype="multipart/form-data">
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="price">
              Price
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="price"
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="category">
              Category
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="category"
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="public_id">
              Public ID
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="public_id"
              type="text"
              name="public_id"
              value={formData.images.public_id}
              onChange={handleImageChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="url">
              URL
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="url"
              type="file"
              name="url"
             
              onChange={handleImageChange}
            />
          </div>
          <div className="flex items-center justify-center flex-col ">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
            {
                c_error?<h1 className="w-full h-[30px] py-3 text-red-600 text-center😡😡😡">{c_error}</h1>:""
            }
            {
                success?<h1 className="w-full h-[30px] py-3 text-green-600 text-center">{success}🎉🎉🎉</h1>:""
            }
          </div>
        </form>
        </div>
      );
    };

export default Create_product
