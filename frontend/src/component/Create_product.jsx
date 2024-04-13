import React, { useState } from 'react';
import axios from 'axios'
function Create_product() {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    stock: '',
  
  });
const [images,setimages]=useState();
  const handleChange = event => {
    const { name, value } = event.target;
    console.log(value);
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = event => {
    setFormData({
      ...formData,
      images: event.target.files[0]
    });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    console.log(images);
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('stock', formData.stock);
    formDataToSend.append('images', images);

    try {
      console.log(formDataToSend);
      await axios.post('/api/v1/admin/create',formDataToSend).then(res=>{console.log("data uploaded sucessfully");}).catch(err=>console.log(err));
   
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      // Handle error (e.g., display error message)
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
  <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8">
    <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Create Product</h1>
    <div className="space-y-4">
      <div>
        <label htmlFor="name" className="block font-medium text-gray-700 mb-1">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="w-full border-2 border-gray-300 rounded-md py-2 px-3 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="price" className="block font-medium text-gray-700 mb-1">
          Price
        </label>
        <input
          type="number"
          id="price"
          name="price"
          className="w-full border-2 border-gray-300 rounded-md py-2 px-3 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="description" className="block font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          className="w-full border-2 border-gray-300 rounded-md py-2 px-3 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          rows={3}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="stock" className="block font-medium text-gray-700 mb-1">
          Stock
        </label>
        <input
          type="number"
          id="stock"
          name="stock"
          className="w-full border-2 border-gray-300 rounded-md py-2 px-3 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="category" className="block font-medium text-gray-700 mb-1">
          Category
        </label>
        <input
          type="text"
          id="category"
          name="category"
          className="w-full border-2 border-gray-300 rounded-md py-2 px-3 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="file" className="block font-medium text-gray-700 mb-1">
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
</div>
  );
}

export default Create_product;


{/* <div className="flex items-center justify-center h-screen my-6">
      <div className="bg-white shadow-md rounded-lg w-full max-w-md px-8 pt-6 pb-8 mb-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Create Product</h1>
        <h1>enter trhe name</h1>
        <input type="text" name='name'  onChange={handleChange}/>
        <h1>price</h1>
        <input type="number" name='price'onChange={handleChange} />
        <h1>disc</h1>
        <input type="text" name='description'onChange={handleChange} />
        <h1>stock</h1>
        <input type="number" name='stock'onChange={handleChange} />
        <h1>category</h1>
        <input type="text" name='category'onChange={handleChange} />
        <h1>file</h1>
        <input type="file" onChange={(e)=>setimages(e.target.files[0])} />
        <button onClick={handleSubmit}>submit</button>
      </div>
    </div> */}

// {c_error ? (
//   <h1 className="w-full h-[30px] py-3 text-red-600 text-center😡😡😡">
//     {c_error}
//   </h1>
// ) : (
//   ""
// )}
// {success ? (
//   <h1 className="w-full h-[30px] py-3 text-green-600 text-center">
//     {success}🎉🎉🎉
//   </h1>
// ) : (
//   ""
// )}
// import { useState } from "react";
// import React from "react";
// const [c_error, seterror] = useState("");
//   const [success, setsucess] = useState("");
// function Create_product() {

//   const [formData, setFormData] = useState({
//     name: "",
//     price: 0,
//     description: "",
//     category: "",
//     stock: 0,
//     images: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleImageChange = (e) => {
//     const { name, files } = e.target;
//     // console.log(files[0]);
//     setFormData((prevState) => ({
//       ...prevState,
//       images: files[0],
//     }));
//   };

//   //to submit the data
//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   seterror("");
//   //   setsucess("");
//   //   console.log(formData);
//   //   try {
//   //     const res = await fetch("api/v1/admin/create", {
//   //       method: "POST",
//   //       headers: { "Content-Type": "application/json" },
//   //       body: JSON.stringify(formData),
//   //     });

//   //     const data = await res.json();
//   //     if (data.ok == false) {
//   //       seterror(data.message);
//   //     } else setsucess("Product created Successfully");
//   //   } catch (error) {
//   //     console.log("error bawa in creating product");
//   //     seterror("error bawa in creating product");
//   //   }
//   // };
//   return (
   
//     <div class="flex items-center justify-center h-screen my-6">
//   <div class="bg-white shadow-md rounded-lg w-full max-w-md px-8 pt-6 pb-8 mb-4">
//     <h1 class="text-3xl font-bold text-gray-900 mb-6 text-center">Create Product</h1>
//     <form action="/api/v1/admin/create" method="POST" encType="multipart/form-data">
//       <div class="mb-4">
//         <label class="block text-gray-700 font-bold mb-2" for="name">
//           Name
//         </label>
//         <input
//           class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           id="name"
//           type="text"
//           placeholder="Enter product name"
//           name="name"
//         />
//       </div>
      // <div class="mb-4">
      //   <label class="block text-gray-700 font-bold mb-2" for="price">
      //     Price
      //   </label>
      //   <input
      //     class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      //     id="price"
      //     type="text"
      //     placeholder="Enter product price"
      //     name="price"
      //   />
      // </div>
      // <div class="mb-4">
      //   <label class="block text-gray-700 font-bold mb-2" for="description">
      //     Description
      //   </label>
      //   <textarea
      //     class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      //     id="description"
      //     rows="3"
      //     placeholder="Enter product description"
      //     name="description"
      //   ></textarea>
      // </div>
      // <div class="mb-4">
      //   <label class="block text-gray-700 font-bold mb-2" for="category">
      //     Category
      //   </label>
      //   <input
      //     class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      //     id="category"
      //     type="text"
      //     placeholder="Enter product category"
      //     name="category"
      //   />
      // </div>
      // <div class="mb-4">
      //   <label class="block text-gray-700 font-bold mb-2" for="stock">
      //     Stock
      //   </label>
      //   <input
      //     class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      //     id="stock"
      //     type="text"
      //     placeholder="Enter product stock"
      //     name="stock"
      //   />
      // </div>
//       <div class="mb-4">
//         <label class="block text-gray-700 font-bold mb-2" for="images">
//           Image
//         </label>
//         <input
//           class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           id="images"
//           type="file"
//           name="images"
//         />
//       </div>
//       <div class="flex items-center justify-center">
//         <button
//           class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//           type="submit"
//         >
//           Create Product
//         </button>
//       </div>
//     </form>
//   </div>
 
 
// </div>
//   )
// }

// export default Create_product;