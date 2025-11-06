import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/orders');
      setOrders(response.data.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading orders...</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="empty-orders">
        <h2>No orders yet</h2>
        <Link to="/products" className="btn btn-primary">
          Start Shopping
        </Link>
      </div>
    );
  }

  const getStatusClass = (status) => {
    switch (status) {
      case 'Processing':
        return 'status-processing';
      case 'Shipped':
        return 'status-shipped';
      case 'Delivered':
        return 'status-delivered';
      case 'Cancelled':
        return 'status-cancelled';
      default:
        return '';
    }
  };

  return (
    <div className="orders-page">
      <h1>My Orders</h1>
      
      <div className="orders-list">
        {orders.map((order) => (
          <Link to={`/orders/${order._id}`} key={order._id} className="order-card">
            <div className="order-header">
              <div>
                <strong>Order ID:</strong> {order._id}
              </div>
              <div className={`order-status ${getStatusClass(order.orderStatus)}`}>
                {order.orderStatus}
              </div>
            </div>
            
            <div className="order-details">
              <div>
                <strong>Date:</strong>{' '}
                {new Date(order.createdAt).toLocaleDateString()}
              </div>
              <div>
                <strong>Items:</strong> {order.items.length}
              </div>
              <div>
                <strong>Total:</strong> Rs. {order.totalPrice.toLocaleString()}
              </div>
            </div>
            
            <div className="order-items-preview">
              {order.items.slice(0, 3).map((item, index) => (
                <span key={index}>
                  {item.name} {index < Math.min(order.items.length, 3) - 1 && '• '}
                </span>
              ))}
              {order.items.length > 3 && <span>...</span>}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Orders;
