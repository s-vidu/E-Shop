import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { cart, updateCartItem, removeFromCart, loading } = useCart();
  const navigate = useNavigate();

  if (loading) {
    return <div className="loading">Loading cart...</div>;
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your cart is empty</h2>
        <button onClick={() => navigate('/products')} className="btn btn-primary">
          Continue Shopping
        </button>
      </div>
    );
  }

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    await updateCartItem(productId, newQuantity);
  };

  const handleRemove = async (productId) => {
    await removeFromCart(productId);
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>
      
      <div className="cart-container">
        <div className="cart-items">
          {cart.items.map((item) => (
            <div key={item._id} className="cart-item">
              <img src={item.product.image} alt={item.product.name} />
              
              <div className="item-details">
                <h3>{item.product.name}</h3>
                <p className="item-price">Rs. {item.price.toLocaleString()}</p>
              </div>
              
              <div className="item-quantity">
                <button 
                  onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)}
                  className="qty-btn"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button 
                  onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}
                  className="qty-btn"
                  disabled={item.quantity >= item.product.stock}
                >
                  +
                </button>
              </div>
              
              <div className="item-total">
                Rs. {(item.price * item.quantity).toLocaleString()}
              </div>
              
              <button 
                onClick={() => handleRemove(item.product._id)}
                className="remove-btn"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        
        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>Rs. {cart.totalPrice.toLocaleString()}</span>
          </div>
          <div className="summary-row">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div className="summary-row total">
            <span>Total:</span>
            <span>Rs. {cart.totalPrice.toLocaleString()}</span>
          </div>
          
          <button onClick={handleCheckout} className="btn btn-primary btn-block">
            Proceed to Checkout
          </button>
          
          <button onClick={() => navigate('/products')} className="btn btn-secondary btn-block">
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
