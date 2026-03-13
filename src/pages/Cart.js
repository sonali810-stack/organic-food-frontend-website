import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Cart.css';

function Cart() {
  const { user } = useAuth();
  const { cart, loading, error, updateCartItem, removeFromCart, applyCoupon, removeCoupon } = useCart();
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  const handleApplyCoupon = async () => {
    if (!couponInput.trim()) {
      setCouponError('Please enter a coupon code');
      return;
    }

    const success = await applyCoupon(couponInput.toUpperCase());
    if (success) {
      setCouponError('');
      setCouponInput('');
    } else {
      setCouponError(error || 'Invalid coupon code');
    }
  };

  const handleRemoveCoupon = async () => {
    await removeCoupon();
    setCouponError('');
  };

  const handleUpdateQuantity = async (productId, newQuantity) => {
    if (newQuantity === 0) {
      await removeFromCart(productId);
    } else {
      await updateCartItem(productId, newQuantity);
    }
  };

  // Redirect to login if not authenticated
  if (!user) {
    return (
      <div className="cart-empty">
        <h2>Please Login</h2>
        <p>You need to be logged in to view your cart.</p>
        <Link to="/login" className="btn btn-primary">Login</Link>
      </div>
    );
  }

  if (loading && !cart) {
    return (
      <div className="cart-empty">
        <h2>Loading Cart...</h2>
      </div>
    );
  }

  if (!cart || !cart.items || cart.items.length === 0) {
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
          {cart.items.map((item) => (
            <div key={item.product._id} className="cart-item">
              <img src={item.product.image} alt={item.product.name} />
              <div className="cart-item-info">
                <h3>{item.product.name}</h3>
                <p className="cart-item-price">₹{item.product.price}</p>
              </div>
              <div className="cart-item-quantity">
                <button
                  onClick={() => handleUpdateQuantity(item.product._id, item.quantity - 1)}
                  disabled={loading}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => handleUpdateQuantity(item.product._id, item.quantity + 1)}
                  disabled={loading}
                >
                  +
                </button>
              </div>
              <button
                className="cart-item-remove"
                onClick={() => removeFromCart(item.product._id)}
                disabled={loading}
              >
                Remove
              </button>
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
                disabled={loading}
              />
              <button onClick={handleApplyCoupon} disabled={loading}>Apply</button>
            </div>
            {couponError && <p className="error">{couponError}</p>}
            {cart.coupon && (
              <div className="coupon-applied">
                <p>✓ {cart.coupon.code} applied</p>
                <button className="remove-coupon" onClick={handleRemoveCoupon} disabled={loading}>Remove</button>
              </div>
            )}
            <div className="coupon-hints">
              <p><strong>Available codes:</strong></p>
              <small>FIRST50 • SAVE100 • ORGANIC20 • WELCOME10</small>
            </div>
          </div>

          <div className="summary-row">
            <span>Subtotal:</span>
            <span>₹{cart.subtotal?.toFixed(0) || 0}</span>
          </div>

          {cart.discount > 0 && (
            <div className="summary-row discount">
              <span>Discount {cart.coupon ? `(${cart.coupon.code})` : ''}:</span>
              <span>-₹{cart.discount?.toFixed(0) || 0}</span>
            </div>
          )}

          <div className="summary-row">
            <span>Shipping:</span>
            <span>Free</span>
          </div>

          <div className="summary-row">
            <span>Tax (GST 5%):</span>
            <span>₹{cart.tax?.toFixed(0) || 0}</span>
          </div>

          <div className="summary-row total">
            <span>Total:</span>
            <span>₹{cart.total?.toFixed(0) || 0}</span>
          </div>

          <button className="btn btn-primary btn-full" disabled={loading}>
            Proceed to Checkout
          </button>
          <Link to="/shop" className="continue-shopping">Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
