import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch} from "react-redux";
import { setvalue } from "../Store/Addcartslice";

function Cart() {
  const dispatch=useDispatch();
  const data = useSelector((state) => state.userReducer?.currentUser?.data)
  console.log(data);
  const[product,setproduct]=useState('');
  useEffect(() => {
    const fetchdata=async()=>{
      await axios.get(`/api/v1/getcart2`)
        .then(function (response) {
          console.log(response.data.user.length);
          dispatch(setvalue(response.data.user.length))
          setproduct(response.data.user);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    fetchdata();
  }, []);
  return <>
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {product && product.map((product, index) => (
           <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden w-fit">
           <div className="relative h-56 overflow-hidden">
             <img
               src={product.cartProducts[0].images}
               alt={product.cartProducts[0].name}
               className="w-full h-full object-cover object-center"
             />
             <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
               In Stock: {product.cartProducts[0].stock}
             </div>
           </div>
           <div className="p-6">
             <h2 className="text-xl font-bold mb-2">{product.cartProducts[0].name}</h2>
             <p className="text-gray-600 mb-4">{product.cartProducts[0].description}</p>
             <div className="flex items-center mb-4">
               <span className="text-yellow-500 mr-2">
                 <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                   <path d="M12 18.376l-7.064 3.71 1.351-7.864-5.713-5.565 7.905-.648 3.521-7.164 3.521 7.164 7.905.648-5.713 5.565 1.351 7.864z" />
                 </svg>
               </span>
               <span className="text-gray-500">{product.cartProducts[0].rating}</span>
             </div>
             <div className="flex justify-between items-center">
               <p className="text-2xl font-bold">{product.cartProducts[0].price}</p>
               <div className="flex">
                 <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                   Add to Cart
                 </button>
                 <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                   Remove from Cart
                 </button>
               </div>
             </div>
           </div>
         </div>
      ))}
    </div>
  
  </>
}

export default Cart;
