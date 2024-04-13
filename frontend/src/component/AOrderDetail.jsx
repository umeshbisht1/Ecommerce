import { useState } from "react";

const OrderDetails = ({ order, index }) => {
  const [_id, setOrderId] = useState(order._id);
  const [createdAt, setCreatedAt] = useState(order.createdAt);
  const [deliveredat, setDeliveredAt] = useState(order.deliveredat);
  const [itemprice, setItemPrice] = useState(order.itemprice);
  const [orderitem, setOrderItem] = useState(order.orderitem);
  const [orderstatus, setOrderStatus] = useState(order.orderstatus);
  const [paidAT, setPaidAt] = useState(order.paidAT);
  const [paymentinfo, setPaymentInfo] = useState(order.paymentinfo);
  const [shippinginfo, setShippingInfo] = useState(order.shippinginfo);
  const [shippingprice, setShippingPrice] = useState(order.shippingprice);
  const [taxprice, setTaxPrice] = useState(order.taxprice);
  const [totalprice, setTotalPrice] = useState(order.totalprice);
  const [updatedAt, setUpdatedAt] = useState(order.updatedAt);
  const [user, setUserId] = useState(order.user);

  const handleMarkAsDelivered = async (e) => {
    // Update the order status in your backend system
    e.preventDefault();
    try {
      const changed = await fetch(`/api/v1/admin/updatestatus/${order._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: "Delivered",
        }),
      });
      const res = await changed.json();
      console.log(res);
      if (res.success == true) updateOrderStatus("Delivered");
    } catch (error) {
      console.log(`admin error occured ${error}`);
    }
  };

  const updateOrderStatus = (newStatus) => {
    setOrderStatus(newStatus);
    // Update the order status in your backend system
    // For example, you could make an API call to update the order status
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-blue-700">
            <b>Order Details:</b> {index + 1}
          </h2>
          <div className="flex items-center">
            {orderstatus === "Delivered" ? (
              <div className="relative">
                <div className="absolute inset-0 bg-green-500 rounded-md opacity-25 animate-ping"></div>
                <button className="px-4 py-2 bg-green-500 text-white font-medium rounded-md hover:bg-green-600">
                  Delivered
                </button>
              </div>
            ) : (
              <>
                <button className="px-4 py-2 bg-yellow-500 text-white font-medium rounded-md hover:bg-yellow-600 mr-2">
                  Processing
                </button>
                <button
                  className="px-4 py-2 bg-green-500 text-white font-medium rounded-md hover:bg-green-600"
                  onClick={handleMarkAsDelivered}
                >
                  Mark as Delivered
                </button>
              </>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-6">
          <div>
            <p className="text-gray-600">
              <strong>Order ID:</strong> {_id}
            </p>
            <p className="text-gray-600">
              <strong>Created At:</strong> {createdAt}
            </p>
            <p className="text-gray-600">
              <strong>Delivered At:</strong> {deliveredat}
            </p>
          </div>
          <div>
            <p className="text-gray-600">
              <strong>User ID:</strong> {user}
            </p>
            <p className="text-gray-600">
              <strong>Item Price:</strong> {itemprice}
            </p>
            <p className="text-gray-600">
              <strong>Total Price:</strong> {totalprice}
            </p>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2 text-blue-700">
            Shipping Information
          </h3>
          <p className="text-gray-600">
            <strong>Address:</strong> {shippinginfo.address}
          </p>
          <p className="text-gray-600">
            <strong>City:</strong> {shippinginfo.city}
          </p>
          <p className="text-gray-600">
            <strong>State:</strong> {shippinginfo.state}
          </p>
        </div>
        {paymentinfo && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2 text-blue-700">
              Payment Information
            </h3>
            <p className="text-gray-600">
              <strong>Payment ID:</strong> {paymentinfo.id}
            </p>
            <p className="text-gray-600">
              <strong>Status:</strong> {paymentinfo.status}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
