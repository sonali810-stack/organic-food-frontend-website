import React, { useState, useMemo, useEffect } from 'react';
import { FiHeart, FiSearch, FiX } from 'react-icons/fi';
import { getProducts } from '../services/api';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import './Shop.css';

const currencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

const clampQuantity = (value, min = 1, max = 20) => {
  if (Number.isNaN(value)) return min;
  return Math.min(Math.max(value, min), max);
};

const measurementMeta = {
  vegetables: { unit: 'kg', label: 'per kg' },
  fruits: { unit: 'kg', label: 'per kg' },
  grains: { unit: 'kg', label: 'per kg' },
  nuts: { unit: 'kg', label: 'per kg' },
  honey: { unit: 'kg', label: 'per kg' },
  herbs: { unit: 'kg', label: 'per kg' },
  oils: { unit: 'litre', label: 'per litre' },
  dairy: { unit: 'litre', label: 'per litre' },
  beverages: { unit: 'box', label: 'per box' },
  default: { unit: 'kg', label: 'per kg' },
};

const getMeasurementMeta = (category) => measurementMeta[category] || measurementMeta.default;

function Shop() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [showQuickView, setShowQuickView] = useState(null);
  const [quickViewQuantity, setQuickViewQuantity] = useState(1);

  // NEW: State for products from API
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use cart context
  const { addToCart: addToCartAPI, loading: cartLoading } = useCart();

  // Use wishlist context
  const { toggleWishlist, isInWishlist } = useWishlist();

  // NEW: Fetch products from backend on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const [quantities, setQuantities] = useState({});

  // Update quantities when products load
  useEffect(() => {
    if (products.length > 0) {
      const initialQuantities = products.reduce((acc, product) => {
        acc[product._id] = 1;
        return acc;
      }, {});
      setQuantities(initialQuantities);
    }
  }, [products]);

  const formatCurrency = (value) => currencyFormatter.format(value);

  const getQuantity = (id) => quantities[id] ?? 1;

  const updateQuantity = (id, value) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: clampQuantity(value),
    }));
  };

  const adjustQuantity = (id, delta) => {
    const nextValue = getQuantity(id) + delta;
    updateQuantity(id, nextValue);
  };

  const handleAddToCart = async (product, quantity) => {
    const productId = product._id || product.id;
    const success = await addToCartAPI(productId, quantity);
    if (success) {
      // Optionally show a success message
      console.log('Added to cart successfully!');
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Backend products have price as a number, not a string with ₹
      const price = typeof product.price === 'number' ? product.price : parseInt(product.price?.replace(/[^0-9]/g, ''), 10) || 0;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesPrice = price >= priceRange[0] && price <= priceRange[1];

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [products, selectedCategory, searchTerm, priceRange]);

  const renderStars = (rating) => {
    return (
      <div className="star-rating">
        {'⭐'.repeat(Math.floor(rating))}
        <span className="rating-number">({rating})</span>
      </div>
    );
  };

  const getStockStatus = (stock) => {
    if (stock <= 5) return { text: 'Low Stock', class: 'low-stock' };
    if (stock > 20) return { text: 'In Stock', class: 'in-stock' };
    return { text: 'Limited', class: 'limited' };
  };

  return (
    <div className="shop-page">
      <div className="shop-header">
        <h1>Our Organic Shop</h1>
        <p>Fresh, healthy, and 100% organic products</p>
      </div>

      <div className="shop-container">
        <aside className="shop-sidebar">
          <div className="search-box">
            <FiSearch />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <FiX
                className="clear-search"
                onClick={() => setSearchTerm('')}
              />
            )}
          </div>

          <h3>Categories</h3>
          <ul className="category-list">
            <li className={selectedCategory === 'all' ? 'active' : ''} onClick={() => setSelectedCategory('all')}>All Products</li>
            <li className={selectedCategory === 'vegetables' ? 'active' : ''} onClick={() => setSelectedCategory('vegetables')}>Vegetables</li>
            <li className={selectedCategory === 'fruits' ? 'active' : ''} onClick={() => setSelectedCategory('fruits')}>Fruits</li>
            <li className={selectedCategory === 'nuts' ? 'active' : ''} onClick={() => setSelectedCategory('nuts')}>Nuts & Seeds</li>
            <li className={selectedCategory === 'grains' ? 'active' : ''} onClick={() => setSelectedCategory('grains')}>Grains</li>
            <li className={selectedCategory === 'dairy' ? 'active' : ''} onClick={() => setSelectedCategory('dairy')}>Dairy & Eggs</li>
            <li className={selectedCategory === 'herbs' ? 'active' : ''} onClick={() => setSelectedCategory('herbs')}>Herbs & Spices</li>
            <li className={selectedCategory === 'honey' ? 'active' : ''} onClick={() => setSelectedCategory('honey')}>Honey</li>
            <li className={selectedCategory === 'oils' ? 'active' : ''} onClick={() => setSelectedCategory('oils')}>Oils</li>
            <li className={selectedCategory === 'beverages' ? 'active' : ''} onClick={() => setSelectedCategory('beverages')}>Beverages</li>
          </ul>

          <div className="price-filter">
            <h3>Price Range</h3>
            <div className="price-inputs">
              <input
                type="number"
                placeholder="Min"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
              />
              <span>-</span>
              <input
                type="number"
                placeholder="Max"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              />
            </div>
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              className="price-slider"
            />
            <p className="price-label">₹{priceRange[0]} - ₹{priceRange[1]}</p>
          </div>
        </aside>

        <main className="shop-main">
          <div className="products-header">
            <div className="products-count">
              Showing {filteredProducts.length} products
            </div>
          </div>

          {loading ? (
            <div className="loading-state">
              <p>Loading products...</p>
            </div>
          ) : error ? (
            <div className="error-state">
              <p>{error}</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="no-products">
              <p>No products found. Try adjusting your filters!</p>
            </div>
          ) : (
            <div className="shop-products-grid">
              {filteredProducts.map((product, index) => {
                const productId = product._id || product.id; // Support both database and hardcoded products
                const quantity = getQuantity(productId);
                const basePrice = typeof product.price === 'number' ? product.price : parseInt(product.price?.replace(/[^0-9]/g, ''), 10) || 0;
                const totalPriceValue = basePrice * quantity;
                const totalPriceLabel = formatCurrency(totalPriceValue);
                const basePriceLabel = formatCurrency(basePrice);
                const measurement = getMeasurementMeta(product.category);

                return (
                  <div
                    key={productId}
                    className="shop-product-card"
                    style={{ '--card-index': index }}
                  >
                    {product.isNew && <div className="new-badge">NEW</div>}
                    <div className="shop-product-image-wrapper">
                      <img src={product.image} alt={product.name} />
                      <span className="shop-badge">Organic</span>
                      <span className={`stock-status ${getStockStatus(product.stock).class}`}>
                        {getStockStatus(product.stock).text}
                      </span>
                    </div>
                    <div className="shop-product-info">
                      <div className="product-header">
                        <h3>{product.name}</h3>
                        <button
                          className={`wishlist-btn ${isInWishlist(productId) ? 'active' : ''}`}
                          onClick={() => toggleWishlist(product)}
                        >
                          <FiHeart />
                        </button>
                      </div>
                      <div className="product-rating">
                        {renderStars(product.rating)}
                        <span className="review-count">({product.reviews})</span>
                      </div>
                      <p className="shop-price">{totalPriceLabel}</p>
                      <p className="shop-price-meta">{basePriceLabel} {measurement.label}</p>
                      <div className="quantity-control" aria-label={`Adjust ${measurement.unit} quantity for ${product.name}`}>
                        <button
                          type="button"
                          className="qty-btn"
                          onClick={() => adjustQuantity(productId, -1)}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <input
                          type="number"
                          min="1"
                          max="20"
                          value={quantity}
                          onChange={(event) => {
                            const parsedValue = parseInt(event.target.value, 10);
                            updateQuantity(productId, parsedValue);
                          }}
                          aria-label="Quantity"
                        />
                        <button
                          type="button"
                          className="qty-btn"
                          onClick={() => adjustQuantity(productId, 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                        <span className="quantity-unit">{measurement.unit}</span>
                      </div>
                      <div className="product-actions">
                        <button
                          className="btn-quick-view"
                          onClick={() => {
                            setShowQuickView(product);
                            setQuickViewQuantity(quantity);
                          }}
                        >
                          Quick View
                        </button>
                        <button
                          className="add-to-cart"
                          onClick={() => handleAddToCart(product, quantity)}
                          disabled={cartLoading}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>

      {showQuickView && (() => {
        const measurement = getMeasurementMeta(showQuickView.category);
        return (
          <div
            className="quick-view-modal"
            onClick={() => {
              setShowQuickView(null);
              setQuickViewQuantity(1);
            }}
          >
            <div className="quick-view-content" onClick={(e) => e.stopPropagation()}>
              <button
                className="close-btn"
                onClick={() => {
                  setShowQuickView(null);
                  setQuickViewQuantity(1);
                }}
              >
                ✕
              </button>
              <div className="quick-view-body">
                <div className="quick-view-image">
                  <img src={showQuickView.image} alt={showQuickView.name} />
                </div>
                <div className="quick-view-details">
                  <h2>{showQuickView.name}</h2>
                  <div className="product-rating">
                    {renderStars(showQuickView.rating)}
                  </div>
                  <div className="quick-view-price-block">
                    <p className="quick-view-price">{formatCurrency((typeof showQuickView.price === 'number' ? showQuickView.price : parseInt(showQuickView.price?.replace(/[^0-9]/g, ''), 10) || 0) * quickViewQuantity)}</p>
                    <span className="quick-view-unit-price">{formatCurrency(typeof showQuickView.price === 'number' ? showQuickView.price : parseInt(showQuickView.price?.replace(/[^0-9]/g, ''), 10) || 0)} {measurement.label}</span>
                  </div>
                  <div className="quick-view-quantity" aria-label={`Adjust ${measurement.unit} quantity for ${showQuickView.name}`}>
                    <button
                      type="button"
                      className="qty-btn"
                      onClick={() => {
                        const next = clampQuantity(quickViewQuantity - 1);
                        setQuickViewQuantity(next);
                        updateQuantity(showQuickView._id || showQuickView.id, next);
                      }}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={quickViewQuantity}
                      onChange={(event) => {
                        const parsedValue = clampQuantity(parseInt(event.target.value, 10));
                        setQuickViewQuantity(parsedValue);
                        updateQuantity(showQuickView._id || showQuickView.id, parsedValue);
                      }}
                      aria-label="Quantity"
                    />
                    <button
                      type="button"
                      className="qty-btn"
                      onClick={() => {
                        const next = clampQuantity(quickViewQuantity + 1);
                        setQuickViewQuantity(next);
                        updateQuantity(showQuickView._id || showQuickView.id, next);
                      }}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                    <span className="quantity-unit">{measurement.unit}</span>
                  </div>
                  <p className="quick-view-desc">
                    100% organic, farm-fresh {showQuickView.name.toLowerCase()}. Sourced directly from local farmers. No pesticides, no chemicals. Pure natural goodness.
                  </p>
                  <div className="stock-info">
                    <span className={`status ${getStockStatus(showQuickView.stock).class}`}>
                      {getStockStatus(showQuickView.stock).text}
                    </span>
                    <span className="quantity">Only {showQuickView.stock} left in stock!</span>
                  </div>
                  <button
                    className="add-to-cart btn-full"
                    onClick={() => {
                      handleAddToCart(showQuickView, quickViewQuantity);
                      setShowQuickView(null);
                      setQuickViewQuantity(1);
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}

export default Shop;
