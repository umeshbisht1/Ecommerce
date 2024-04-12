import { useState, useEffect } from 'react';

const OrderDetails = ({ order, index }) => {
  const [orderStatus, setOrderStatus] = useState(order.orderstatus);

  useEffect(() => {
    setOrderStatus(order.orderstatus);
  }, [order.orderstatus]);

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-blue-600"><b>Order Details:</b> {index + 1}</h2>
          {orderStatus === 'Delivered' ? (
            <div className="relative">
              <div className="absolute inset-0 bg-green-500 rounded-md opacity-25 animate-ping"></div>
              <button className="px-4 py-2 bg-green-500 text-white font-medium rounded-md hover:bg-green-600">
                Delivered
              </button>
            </div>
          ) : (
            <div className="relative">
              <div className="absolute inset-0 bg-yellow-500 rounded-md opacity-25 animate-ping"></div>
              <button className="px-4 py-2 bg-yellow-500 text-white font-medium rounded-md hover:bg-yellow-600">
                Processing
              </button>
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 gap-x-6">
          <div>
            <p className="text-gray-600">
              <strong>Order ID:</strong> {order._id}
            </p>
            <p className="text-gray-600">
              <strong>Created At:</strong> {new Date(order.createdAt).toLocaleString()}
            </p>
            <p className="text-gray-600">
              <strong>Delivered At:</strong> {new Date(order.deliveredat).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-gray-600">
              <strong>User ID:</strong> {order.user}
            </p>
            <p className="text-gray-600">
              <strong>Item Price:</strong> {order.itemprice.toFixed(2)}
            </p>
            <p className="text-gray-600">
              <strong>Total Price:</strong> {order.totalprice.toFixed(2)}
            </p>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Shipping Information</h3>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            <div>
              <p className="text-gray-600">
                <strong>Address:</strong> {order.shippinginfo.address}
              </p>
            </div>
            <div>
              <p className="text-gray-600">
                <strong>City:</strong> {order.shippinginfo.city}
              </p>
            </div>
            <div>
              <p className="text-gray-600">
                <strong>State:</strong> {order.shippinginfo.state}
              </p>
            </div>
            <div>
              <p className="text-gray-600">
                <strong>Country:</strong> {order.shippinginfo.country}
              </p>
            </div>
            <div>
              <p className="text-gray-600">
                <strong>Pincode:</strong> {order.shippinginfo.pincode}
              </p>
            </div>
            <div>
              <p className="text-gray-600">
                <strong>Phone No:</strong> {order.shippinginfo.phoneno}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Payment Information</h3>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            <div>
              <p className="text-gray-600">
                <strong>Payment ID:</strong> {order.paymentinfo.id}
              </p>
            </div>
            <div>
              <p className="text-gray-600">
                <strong>Status:</strong> {order.paymentinfo.status}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Order Items</h3>
          {order.orderitem.map((item, itemIndex) => (
            <div key={itemIndex} className="flex items-center mb-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-md mr-4"
              />
              <div>
                <p className="text-gray-600 font-medium">{item.name}</p>
                <p className="text-gray-600">
                  <strong>Price:</strong> {item.price.toFixed(2)}
                </p>
                <p className="text-gray-600">
                  <strong>Quantity:</strong> {item.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;