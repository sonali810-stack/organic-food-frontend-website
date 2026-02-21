import React from 'react';
import { Link } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import './Wishlist.css';

function Wishlist() {
  const { user } = useAuth();
  const { addToCart, loading: cartLoading } = useCart();
  const { wishlist, loading, removeFromWishlist } = useWishlist();

  const handleAddToCart = async (product) => {
    const productId = product._id || product.id;
    await addToCart(productId, 1);
  };

  const handleRemove = async (product) => {
    const productId = product._id || product.id;
    await removeFromWishlist(productId);
  };

  // Show login prompt if not authenticated
  if (!user) {
    return (
      <div className="wishlist-empty">
        <h2>Please Login</h2>
        <p>You need to be logged in to view your wishlist.</p>
        <Link to="/login" className="btn btn-primary">Login</Link>
      </div>
    );
  }

  if (loading && !wishlist) {
    return (
      <div className="wishlist-empty">
        <h2>Loading Wishlist...</h2>
      </div>
    );
  }

  if (!wishlist || !wishlist.items || wishlist.items.length === 0) {
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
      <h1>My Wishlist ({wishlist.items.length})</h1>
      <div className="wishlist-container">
        {wishlist.items.map(item => {
          const product = item.product;
          const productId = product._id || product.id;
          const price = typeof product.price === 'number' ? `₹${product.price}` : product.price;

          return (
            <div key={productId} className="wishlist-item">
              <img src={product.image} alt={product.name} />
              <div className="wishlist-info">
                <h3>{product.name}</h3>
                <p className="wishlist-price">{price}</p>
                <div className="wishlist-actions">
                  <button
                    className="btn btn-primary"
                    onClick={() => handleAddToCart(product)}
                    disabled={cartLoading}
                  >
                    {cartLoading ? 'Adding...' : 'Add to Cart'}
                  </button>
                  <button
                    className="btn-remove"
                    onClick={() => handleRemove(product)}
                    disabled={loading}
                  >
                    <FiTrash2 /> Remove
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Wishlist;
