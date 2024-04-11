import React from 'react';

const OrderDetail = ({ order,index }) => {
  const { _id, createdAt, deliveredat, itemprice, orderitem, orderstatus, paidAT, paymentinfo, shippinginfo, shippingprice, taxprice, totalprice, updatedAt, user } = order;

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Order Details :{index+1}</h2>
        <div className="grid grid-cols-2 gap-x-6">
          <div>
            <p className="text-gray-600"><strong>Order ID:</strong> {_id}</p>
            <p className="text-gray-600"><strong>Order Status:</strong> {orderstatus}</p>
            <p className="text-gray-600"><strong>Created At:</strong> {createdAt}</p>
            <p className="text-gray-600"><strong>Delivered At:</strong> {deliveredat}</p>
          </div>
          <div>
            <p className="text-gray-600"><strong>User ID:</strong> {user}</p>
            <p className="text-gray-600"><strong>Item Price:</strong>{itemprice}</p>
            <p className="text-gray-600"><strong>Total Price:</strong>{totalprice}</p>
            {/* Render other order details as needed */}
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Shipping Information</h3>
          <p className="text-gray-600"><strong>Address:</strong> {shippinginfo.address}</p>
          <p className="text-gray-600"><strong>City:</strong> {shippinginfo.city}</p>
          <p className="text-gray-600"><strong>State:</strong> {shippinginfo.state}</p>
          {/* Render other shipping information as needed */}
        </div>

        {/* Render payment information if available */}
        {paymentinfo && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Payment Information</h3>
            <p className="text-gray-600"><strong>Payment ID:</strong> {paymentinfo.id}</p>
            <p className="text-gray-600"><strong>Status:</strong> {paymentinfo.status}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetail;
