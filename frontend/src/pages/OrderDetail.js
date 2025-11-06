import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './OrderDetail.css';

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/orders/${id}`);
      setOrder(response.data.data);
    } catch (error) {
      console.error('Error fetching order:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading order...</div>;
  }

  if (!order) {
    return <div className="error">Order not found</div>;
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
    <div className="order-detail-page">
      <button onClick={() => navigate('/orders')} className="back-btn">
        ← Back to Orders
      </button>
      
      <h1>Order Details</h1>
      
      <div className="order-info-grid">
        <div className="info-card">
          <h3>Order Information</h3>
          <div className="info-row">
            <span>Order ID:</span>
            <span>{order._id}</span>
          </div>
          <div className="info-row">
            <span>Date:</span>
            <span>{new Date(order.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="info-row">
            <span>Status:</span>
            <span className={`order-status ${getStatusClass(order.orderStatus)}`}>
              {order.orderStatus}
            </span>
          </div>
          <div className="info-row">
            <span>Payment:</span>
            <span className={`payment-status ${order.paymentStatus.toLowerCase()}`}>
              {order.paymentStatus}
            </span>
          </div>
        </div>
        
        <div className="info-card">
          <h3>Shipping Address</h3>
          <p>{order.shippingAddress.street}</p>
          <p>
            {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
            {order.shippingAddress.zipCode}
          </p>
          <p>{order.shippingAddress.country}</p>
        </div>
        
        <div className="info-card">
          <h3>Payment Method</h3>
          <p>{order.paymentMethod}</p>
        </div>
      </div>
      
      <div className="order-items-section">
        <h3>Order Items</h3>
        <div className="order-items">
          {order.items.map((item) => (
            <div key={item._id} className="order-item">
              <img 
                src={item.product?.image || 'https://via.placeholder.com/100'} 
                alt={item.name} 
              />
              <div className="item-info">
                <h4>{item.name}</h4>
                <p>Quantity: {item.quantity}</p>
                <p className="item-price">Rs. {item.price.toLocaleString()} each</p>
              </div>
              <div className="item-total">
                Rs. {(item.price * item.quantity).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
        
        <div className="order-total">
          <div className="total-row">
            <span>Subtotal:</span>
            <span>Rs. {order.totalPrice.toLocaleString()}</span>
          </div>
          <div className="total-row">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div className="total-row grand-total">
            <span>Total:</span>
            <span>Rs. {order.totalPrice.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
