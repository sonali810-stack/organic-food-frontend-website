import React from 'react';
import { Link } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi';
import './Wishlist.css';

function Wishlist({ wishlist, toggleWishlist, addToCart }) {
  if (wishlist.length === 0) {
    return (
      <div className="wishlist-empty">
        <h2>Your Wishlist is Empty</h2>
        <p>Save your favorite products to your wishlist!</p>
        <Link to="/shop" className="btn btn-primary">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <h1>My Wishlist ({wishlist.length})</h1>
      <div className="wishlist-container">
        {wishlist.map(product => (
          <div key={product.id} className="wishlist-item">
            <img src={product.image} alt={product.name} />
            <div className="wishlist-info">
              <h3>{product.name}</h3>
              <p className="wishlist-price">{product.price}</p>
              <div className="wishlist-actions">
                <button 
                  className="btn btn-primary"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
                <button 
                  className="btn-remove"
                  onClick={() => toggleWishlist(product)}
                >
                  <FiTrash2 /> Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
