import React from 'react'
import { useSelector } from "react-redux";
import { useState, useEffect } from 'react';
import OrderDetails from './OrderDetails';

const Userorder = () => {
  const [orders, setOrders] = useState([]);
  const user = useSelector((state) => state.currentUser?.data);

  useEffect(() => {
    const fetchorder = async () => {
      try {
        const order = await fetch(`/api/v1/allorder/${user._id}`);
        const data = await order.json();
       setOrders(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchorder();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Order History</h1>
      {orders.map((order, index) => (
        <OrderDetails key={order._id} order={order} index={index} />
      ))}
    </div>
  );
};


export default Userorder
