import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to E-Shop</h1>
          <p>Discover amazing products at great prices</p>
          <Link to="/products" className="cta-button">
            Shop Now
          </Link>
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <div className="feature-icon">🚚</div>
          <h3>Free Shipping</h3>
          <p>On orders over Rs. 15000</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">💳</div>
          <h3>Secure Payment</h3>
          <p>100% secure transactions</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🔄</div>
          <h3>Easy Returns</h3>
          <p>30-day return policy</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">⭐</div>
          <h3>Quality Products</h3>
          <p>Top-rated items</p>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Start Shopping?</h2>
        <p>Browse our wide selection of products</p>
        <Link to="/products" className="cta-button">
          View All Products
        </Link>
      </section>
    </div>
  );
};

export default Home;
