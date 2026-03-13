import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiUser, FiShoppingCart, FiMenu, FiX, FiHeart, FiLogOut, FiPackage, FiMessageCircle } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import './Navbar.css';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, logout } = useAuth();
  const { getCartCount } = useCart();
  const { getWishlistCount } = useWishlist();
  const navigate = useNavigate();

  const cartCount = getCartCount();
  const wishlistCount = getWishlistCount();

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">🌿 ORGAMIC</Link>

        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/shop" onClick={() => setIsMenuOpen(false)}>Shop</Link>
          <Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
          <Link to="/chester" onClick={() => setIsMenuOpen(false)}>Chester</Link>
          <Link to="/assistant" onClick={() => setIsMenuOpen(false)}>AI Assistant</Link>
        </div>

        <div className="nav-icons">
          <button className="icon-btn"><FiSearch /></button>
          <Link to="/assistant" className="icon-btn assistant-icon" aria-label="Open AI assistant">
            <FiMessageCircle />
          </Link>
          {user ? (
            <div className="user-dropdown">
              <button
                className="user-info"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <FiUser />
                <span>{user.name}</span>
              </button>
              {showUserMenu && (
                <div className="user-menu">
                  <Link to="/orders" onClick={() => setShowUserMenu(false)}>
                    <FiPackage /> My Orders
                  </Link>
                  <button onClick={handleLogout}>
                    <FiLogOut /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="icon-btn"><FiUser /></Link>
          )}
          <Link to="/wishlist" className="icon-btn wishlist-icon">
            <FiHeart />
            {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
          </Link>
          <Link to="/cart" className="icon-btn cart-icon">
            <FiShoppingCart />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
        </div>

        <button className="mobile-menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
