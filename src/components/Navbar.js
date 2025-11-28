import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiUser, FiShoppingCart, FiMenu, FiX, FiHeart } from 'react-icons/fi';
import './Navbar.css';

function Navbar({ user, cartCount = 0, wishlistCount = 0 }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">🌿 ORGAMIC</Link>
        
        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/shop" onClick={() => setIsMenuOpen(false)}>Shop</Link>
          <Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
          <Link to="/chester" onClick={() => setIsMenuOpen(false)}>Chester</Link>
        </div>

        <div className="nav-icons">
          <button className="icon-btn"><FiSearch /></button>
          {user ? (
            <div className="user-info">
              <FiUser />
              <span>{user.name}</span>
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
