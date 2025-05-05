// pages/OrderDetail.jsx
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import useOrderStore from '../Context/OrderContext';

const OrderDetail = () => {
  const { state } = useLocation();
  const { updateOrderStatus } = useOrderStore();
  const [newStatus, setNewStatus] = useState('');
  const order = state?.order;

  if (!order) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="p-6 bg-white rounded-lg shadow-sm text-center">
        <p className="text-red-600 font-medium">Order details not found.</p>
      </div>
    </div>
  );

  const {
    orderId,
    orderNumber,
    userName,
    items,
    totalAmount,
    status,
    deliveryAddress,
    deliveryDate,
    paymentMethod,
    isPaid,
    paidAt,
    createdAt,
  } = order;

  const handleStatusChange = async () => {
    if (!newStatus) return;
    try {
      await updateOrderStatus(orderId, newStatus);
      alert('Order status updated successfully');
    } catch (err) {
      alert('Failed to update order status');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING': return 'border-yellow-300 text-yellow-700';
      case 'CONFIRMED': return 'border-blue-300 text-blue-700';
      case 'SHIPPED': return 'border-purple-300 text-purple-700';
      case 'DELIVERED': return 'border-green-300 text-green-700';
      case 'CANCELLED': return 'border-red-300 text-red-700';
      default: return 'border-gray-300 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6">
      <div className=" mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-light text-gray-800">Order Details</h1>
          <p className="text-gray-500 mt-1">#{orderNumber}</p>
        </div>

        {/* Order Card */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
          {/* Order Meta */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">Placed on</p>
                <p className="text-gray-700">{new Date(createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}</p>
              </div>
              <div className="flex flex-col items-center justify-center gap-1">
                <p className="text-sm text-gray-500">Status</p>
                <span className={`inline-block px-3 py-1 rounded-full border ${getStatusColor(status)} text-sm`}>
                  {status.charAt(0) + status.slice(1).toLowerCase()}
                </span>
              </div>
            </div>
          </div>

          {/* Customer & Payment */}
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100">
            <div className="p-6">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Customer</h3>
              <div className="space-y-1">
    <div>
      <p className="text-xs text-gray-500">Name</p>
      <p className="text-gray-800">{userName}</p>
    </div>
    <div>
      <p className="text-xs text-gray-500">Contact Number</p>
      <p className="text-gray-800">{order.userMobile}</p>
    </div>
  </div>

            </div>
            <div className="p-6">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Payment</h3>
              <p className="text-gray-800 capitalize">{paymentMethod.toLowerCase()}</p>
              <p className={`text-sm mt-1 ${isPaid ? 'text-green-600' : 'text-gray-500'}`}>
                {isPaid ? `Paid on ${new Date(paidAt).toLocaleDateString()}` : 'Payment pending'}
              </p>
            </div>
          </div>

          {/* Delivery Info */}
          <div className="p-6 border-t border-gray-100">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Delivery</h3>
            <p className="text-gray-800 mb-2">{deliveryAddress.formattedAddress}</p>
            <p className="text-sm text-gray-600">
              Estimated delivery: {new Date(deliveryDate).toLocaleDateString()}
            </p>
          </div>

          {/* Order Items */}
          <div className="p-6 border-t border-gray-100">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Items ({items.length})</h3>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.orderItemId} className="flex justify-between">
                  <div>
                    <p className="text-gray-800">{item.productName}</p>
                    <p className="text-sm text-gray-500">{item.productType}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-800">AED {item.totalPrice.toFixed(2)}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="p-6 bg-gray-50 border-t border-gray-100">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Amount</h3>
                <p className="text-gray-800 text-lg font-medium">AED {totalAmount.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Status Update */}
        <div className="mt-8 bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
          <div className="p-6">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Update Order Status</h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="flex-1 border border-gray-200 rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select new status</option>
                <option value="PENDING">Pending</option>
                <option value="CONFIRMED">Confirmed</option>
                <option value="SHIPPED">Shipped</option>
                <option value="DELIVERED">Delivered</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
              <button 
                onClick={handleStatusChange} 
                disabled={!newStatus}
                className={`px-4 py-2 rounded font-medium text-sm ${newStatus ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;