import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';

function Cart({ cartItems = [], setCartItems, appliedCoupon, setAppliedCoupon }) {
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  const items = cartItems || [];

  const coupons = {
    'FIRST50': { discount: 50, type: 'fixed', description: 'First time user' },
    'SAVE100': { discount: 100, type: 'fixed', description: '₹100 off on orders over ₹500' },
    'ORGANIC20': { discount: 20, type: 'percent', description: '20% off organic products' },
    'WELCOME10': { discount: 10, type: 'percent', description: '10% welcome discount' },
  };

  const applyCoupon = () => {
    const coupon = coupons[couponInput.toUpperCase()];
    if (coupon) {
      setAppliedCoupon({ code: couponInput.toUpperCase(), ...coupon });
      setCouponError('');
      setCouponInput('');
    } else {
      setCouponError('Invalid coupon code');
    }
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      setCartItems(items.filter(item => item.id !== id));
    } else {
      setCartItems(items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const getSubtotal = () => {
    return items.reduce((sum, item) => {
      const price = parseFloat(item.price.replace('₹', '').replace(',', ''));
      return sum + (price * item.quantity);
    }, 0);
  };

  const getDiscount = () => {
    if (!appliedCoupon) return 0;
    const subtotal = getSubtotal();
    if (appliedCoupon.type === 'percent') {
      return (subtotal * appliedCoupon.discount) / 100;
    }
    return appliedCoupon.discount;
  };

  const getTotal = () => {
    const subtotal = getSubtotal();
    const discount = getDiscount();
    const tax = (subtotal - discount) * 0.05;
    return subtotal - discount + tax;
  };

  if (items.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your Cart is Empty</h2>
        <p>Add some fresh organic products to your cart!</p>
        <Link to="/shop" className="btn btn-primary">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>
      <div className="cart-container">
        <div className="cart-items">
          {items.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p className="cart-item-price">{item.price}</p>
              </div>
              <div className="cart-item-quantity">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>
              <button className="cart-item-remove" onClick={() => updateQuantity(item.id, 0)}>Remove</button>
            </div>
          ))}
        </div>
        
        <div className="cart-summary">
          <h2>Order Summary</h2>
          
          <div className="coupon-section">
            <h4>Apply Coupon</h4>
            <div className="coupon-input-group">
              <input 
                type="text" 
                placeholder="Enter coupon code"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
              />
              <button onClick={applyCoupon}>Apply</button>
            </div>
            {couponError && <p className="error">{couponError}</p>}
            {appliedCoupon && (
              <div className="coupon-applied">
                <p>✓ {appliedCoupon.code} applied</p>
                <button className="remove-coupon" onClick={() => setAppliedCoupon(null)}>Remove</button>
              </div>
            )}
            <div className="coupon-hints">
              <p><strong>Available codes:</strong></p>
              <small>FIRST50 • SAVE100 • ORGANIC20 • WELCOME10</small>
            </div>
          </div>

          <div className="summary-row">
            <span>Subtotal:</span>
            <span>₹{getSubtotal().toFixed(0)}</span>
          </div>
          
          {appliedCoupon && (
            <div className="summary-row discount">
              <span>Discount ({appliedCoupon.code}):</span>
              <span>-₹{getDiscount().toFixed(0)}</span>
            </div>
          )}
          
          <div className="summary-row">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          
          <div className="summary-row">
            <span>Tax (GST 5%):</span>
            <span>₹{((getSubtotal() - getDiscount()) * 0.05).toFixed(0)}</span>
          </div>
          
          <div className="summary-row total">
            <span>Total:</span>
            <span>₹{getTotal().toFixed(0)}</span>
          </div>
          
          <button className="btn btn-primary btn-full">Proceed to Checkout</button>
          <Link to="/shop" className="continue-shopping">Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
