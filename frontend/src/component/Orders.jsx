import React from 'react'
import { useEffect,useState } from 'react';
import AOrderDetail from './AOrderDetail';
function Orders() {
  const [Loading,setLoading]=useState(true);
  const [product,setProducts]=useState('');
  const [err,seterror]=useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/v1/admin/allorders'); 
        const data = await response.json();
        // console.log(data);
        if(data.data)
        {setProducts(data.data); 
        setLoading(false);}
        else
       {
        setLoading(true)
        seterror('404 data not found please refresh....');
       }
      } catch (error) {
        seterror(error)
        setLoading(true);
      }
    };

    fetchData();
  }, []);
  return (
    Loading?(<h1 className='h-full w-full text-center my-[10px]'>{err?(err):"data Loading is here...."}</h1>):( <div>
      <div className="flex justify-around mt-3">
        <h1 className="text-2xl font-semibold mb-4"><b className='text-blue-700 font-semibold'>Admin.... </b> <span className='font-bold'>all order</span></h1>
      
      <button className='py-3  px-8 rounded-md bg-[lightseagreen]'>💵{product.totalamount}</button></div>
      {product?.orders.map((order,index) => (
        <AOrderDetail key={order._id} order={order} index={index} />
      ))}
    </div>)
  )
}

export default Orders
