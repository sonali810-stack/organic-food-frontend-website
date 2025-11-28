import React, { useState, useMemo } from 'react';
import { FiHeart, FiSearch, FiX } from 'react-icons/fi';
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

function Shop({ addToCart, toggleWishlist, isInWishlist }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [showQuickView, setShowQuickView] = useState(null);
  const [quickViewQuantity, setQuickViewQuantity] = useState(1);

  const products = useMemo(() => ([
    // VEGETABLES
    { id: 1, name: "Organic Broccoli", category: "vegetables", price: "₹249", image: "https://images.unsplash.com/photo-1628773822503-930a7eaecf80?w=400&h=400&fit=crop", rating: 4.8, reviews: 245, isNew: true, stock: 15 },
    { id: 4, name: "Organic Tomatoes", category: "vegetables", price: "₹80", image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&h=400&fit=crop", rating: 4.7, reviews: 410, stock: 25 },
    { id: 6, name: "Green Leafy Vegetables", category: "vegetables", price: "₹120", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=400&fit=crop", rating: 4.5, reviews: 155, stock: 18 },
    { id: 9, name: "Organic Carrots", category: "vegetables", price: "₹60", image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=400&fit=crop", rating: 4.6, reviews: 200, stock: 30 },
    { id: 17, name: "Bell Peppers", category: "vegetables", price: "₹100", image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&h=400&fit=crop", rating: 4.7, reviews: 190, stock: 20 },
    { id: 26, name: "Spinach", category: "vegetables", price: "₹45", image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=400&fit=crop", rating: 4.6, reviews: 140, stock: 24 },
    { id: 36, name: "Fresh Lettuce", category: "vegetables", price: "₹55", image: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400&h=400&fit=crop", rating: 4.5, reviews: 125, stock: 20 },
    { id: 37, name: "Kale", category: "vegetables", price: "₹85", image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=400&fit=crop", rating: 4.7, reviews: 160, stock: 15 },
    { id: 38, name: "Cucumber", category: "vegetables", price: "₹40", image: "https://images.unsplash.com/photo-1604977042946-1eecc30f269e?w=400&h=400&fit=crop", rating: 4.5, reviews: 180, stock: 28 },
    { id: 39, name: "Cabbage", category: "vegetables", price: "₹35", image: "https://plus.unsplash.com/premium_photo-1661963465934-55eeb52f64d2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170", rating: 4.4, reviews: 150, stock: 22 },

    // FRUITS
    { id: 2, name: "Fresh Avocado", category: "fruits", price: "₹189", image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&h=400&fit=crop", rating: 4.6, reviews: 180, isNew: true, stock: 8 },
    { id: 7, name: "Organic Apples", category: "fruits", price: "₹160", image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400&h=400&fit=crop", rating: 4.8, reviews: 200, stock: 22 },
    { id: 16, name: "Fresh Bananas", category: "fruits", price: "₹50", image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=400&h=400&fit=crop", rating: 4.6, reviews: 175, isNew: true, stock: 32 },
    { id: 18, name: "Strawberries", category: "fruits", price: "₹220", image: "https://images.unsplash.com/photo-1543528176-61b239494933?w=400&h=400&fit=crop", rating: 4.8, reviews: 240, stock: 9 },
    { id: 27, name: "Blueberries", category: "fruits", price: "₹380", image: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=400&h=400&fit=crop", rating: 4.9, reviews: 310, stock: 6 },
    { id: 29, name: "Fresh Oranges", category: "fruits", price: "₹140", image: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b3Jhbmdlc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600", rating: 4.7, reviews: 220, stock: 28 },
    { id: 40, name: "Grapes", category: "fruits", price: "₹180", image: "https://images.unsplash.com/photo-1423483641154-5411ec9c0ddf?w=400&h=400&fit=crop", rating: 4.7, reviews: 195, stock: 16 },
    { id: 41, name: "Mangoes", category: "fruits", price: "₹250", image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&h=400&fit=crop", rating: 4.9, reviews: 280, stock: 12 },

    // NUTS & SEEDS
    { id: 3, name: "Mixed Nuts", category: "nuts", price: "₹450", image: "https://images.unsplash.com/photo-1543158181-1274e5362710?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWl4ZWQlMjBudXRzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600", rating: 4.9, reviews: 320, stock: 20 },
    { id: 8, name: "Almonds", category: "nuts", price: "₹650", image: "https://plus.unsplash.com/premium_photo-1675237626334-5cf9d9d8b30c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YWxtb25kc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600", rating: 4.9, reviews: 350, stock: 10 },
    { id: 19, name: "Cashews", category: "nuts", price: "₹720", image: "https://images.unsplash.com/photo-1686721635283-70e6344183e1?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2FzaGV3c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600", rating: 4.9, reviews: 265, stock: 7 },
    { id: 28, name: "Walnuts", category: "nuts", price: "₹680", image: "https://images.unsplash.com/photo-1626012109496-21f579f648dd?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2FsbnV0c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600", rating: 4.8, reviews: 285, stock: 12 },
    { id: 42, name: "Pumpkin Seeds", category: "nuts", price: "₹320", image: "https://plus.unsplash.com/premium_photo-1726862518740-c20771e4e832?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHVtcGtpbiUyMHNlZWRzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600", rating: 4.7, reviews: 145, stock: 18 },
    { id: 43, name: "Chia Seeds", category: "nuts", price: "₹280", image: "https://images.unsplash.com/photo-1604768802835-899055f0e245?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hpYSUyMHNlZWRzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600", rating: 4.8, reviews: 165, stock: 14 },

    // HONEY & SWEETENERS
    { id: 5, name: "Raw Honey", category: "honey", price: "₹350", image: "https://images.unsplash.com/photo-1587049352851-8d4e89133924?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmF3JTIwaG9uZXl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600", rating: 4.9, reviews: 290, stock: 12 },
    { id: 23, name: "Maple Syrup", category: "honey", price: "₹450", image: "https://plus.unsplash.com/premium_photo-1663854478296-dd00b6257021?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWFwbGUlMjBzeXJ1cHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600", rating: 4.9, reviews: 220, stock: 11 },
    { id: 30, name: "Organic Jaggery", category: "honey", price: "₹120", image: "https://images.jdmagicbox.com/quickquotes/images_main/organic-jaggery-2227367956-ltxgg9d1.jpg", rating: 4.7, reviews: 165, stock: 15 },

    // GRAINS & CEREALS
    { id: 13, name: "Quinoa", category: "grains", price: "₹320", image: "https://plus.unsplash.com/premium_photo-1705207702007-7c6a3872ef25?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8UXVpbm9hfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600", rating: 4.7, reviews: 165, stock: 11 },
    { id: 20, name: "Organic Rice", category: "grains", price: "₹180", image: "https://plus.unsplash.com/premium_photo-1723925093264-40b6b957c44d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8T3JnYW5pYyUyMFJpY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600", rating: 4.7, reviews: 310, stock: 35 },
    { id: 31, name: "Oats", category: "grains", price: "₹140", image: "https://plus.unsplash.com/premium_photo-1671130295244-b058fc8d86fe?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8T2F0c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600", rating: 4.6, reviews: 180, stock: 22 },
    { id: 44, name: "Brown Rice", category: "grains", price: "₹160", image: "https://images.unsplash.com/photo-1613728913341-8f29b02b8253?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QnJvd24lMjBSaWNlfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600", rating: 4.6, reviews: 195, stock: 26 },

    // DAIRY & EGGS
    { id: 11, name: "Organic Milk", category: "dairy", price: "₹75", image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=400&fit=crop", rating: 4.8, reviews: 280, stock: 25 },
    { id: 15, name: "Organic Eggs", category: "dairy", price: "₹120", image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&h=400&fit=crop", rating: 4.9, reviews: 295, stock: 28 },
    { id: 21, name: "Fresh Cheese", category: "dairy", price: "₹340", image: "https://images.unsplash.com/photo-1452195100486-9cc805987862?w=400&h=400&fit=crop", rating: 4.8, reviews: 185, stock: 13 },
    { id: 32, name: "Organic Yogurt", category: "dairy", price: "₹95", image: "https://static.wixstatic.com/media/4c4dcc_0e90722cd22c4c5c98b873a7ab82ac79~mv2.jpg/v1/fit/w_500,h_500,q_90/file.jpg", rating: 4.7, reviews: 210, stock: 18 },
    { id: 45, name: "Butter", category: "dairy", price: "₹280", image: "https://plus.unsplash.com/premium_photo-1700440539073-c769891a9e3f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8QnV0dGVyfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600", rating: 4.7, reviews: 175, stock: 15 },

    // HERBS & SPICES
    { id: 10, name: "Fresh Herbs Bundle", category: "herbs", price: "₹90", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfltOi3f-h4SdOvsuxcpIlS3O71ESp31h1kQ&s", rating: 4.7, reviews: 120, stock: 16 },
    { id: 22, name: "Basil", category: "herbs", price: "₹70", image: "https://images.unsplash.com/photo-1618375569909-3c8616cf7733?w=400&h=400&fit=crop", rating: 4.6, reviews: 95, stock: 17 },
    { id: 33, name: "Organic Turmeric", category: "herbs", price: "₹150", image: "https://plus.unsplash.com/premium_photo-1726876987962-17ef4dd597ff?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8T3JnYW5pYyUyMFR1cm1lcmljfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600", rating: 4.8, reviews: 175, stock: 20 },
    { id: 46, name: "Cinnamon", category: "herbs", price: "₹180", image: "https://plus.unsplash.com/premium_photo-1666174326693-8e0eb439d839?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Q2lubmFtb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600", rating: 4.7, reviews: 155, stock: 18 },

    // OILS & VINEGARS
    { id: 12, name: "Olive Oil", category: "oils", price: "₹580", image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop", rating: 4.9, reviews: 310, stock: 14 },
    { id: 24, name: "Coconut Oil", category: "oils", price: "₹380", image: "https://images.unsplash.com/photo-1588413333412-82148535db53?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Q29jb251dCUyME9pbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600", rating: 4.8, reviews: 275, stock: 16 },
    { id: 34, name: "Sesame Oil", category: "oils", price: "₹420", image: "https://plus.unsplash.com/premium_photo-1663936756798-ead5c2609856?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8U2VzYW1lJTIwT2lsfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600", rating: 4.7, reviews: 145, stock: 11 },
    { id: 47, name: "Mustard Oil", category: "oils", price: "₹320", image: "https://cdn.shopify.com/s/files/1/0552/5159/9557/files/iriola-mustard-oil_1024x1024.jpg?v=1680066130", rating: 4.6, reviews: 130, stock: 13 },

    // BEVERAGES
    { id: 14, name: "Green Tea", category: "beverages", price: "₹280", image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400&h=400&fit=crop", rating: 4.8, reviews: 225, stock: 19 },
    { id: 25, name: "Herbal Tea", category: "beverages", price: "₹220", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1KahhBr4-8sd1KO7IldTYpqFk0gEYX8rQEQ&s", rating: 4.7, reviews: 180, stock: 21 },
    { id: 35, name: "Organic Coffee", category: "beverages", price: "₹350", image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=400&fit=crop", rating: 4.9, reviews: 290, stock: 13 },
  ]), []);

  const [quantities, setQuantities] = useState(() => products.reduce((acc, product) => {
    acc[product.id] = 1;
    return acc;
  }, {}));

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

  const handleAddToCartWithQuantity = (product, quantity, totalPriceValue, basePriceValue) => {
    if (!addToCart) return;
    addToCart({
      ...product,
      quantity,
      totalPrice: totalPriceValue,
      basePrice: basePriceValue,
    });
  };

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const priceString = product.price.replace(/[^0-9]/g, '');
      const price = priceString ? parseInt(priceString, 10) : 0;
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

          {filteredProducts.length === 0 ? (
            <div className="no-products">
              <p>No products found. Try adjusting your filters!</p>
            </div>
          ) : (
            <div className="shop-products-grid">
              {filteredProducts.map((product, index) => {
                const quantity = getQuantity(product.id);
                const basePrice = parseInt(product.price.replace(/[^0-9]/g, ''), 10) || 0;
                const totalPriceValue = basePrice * quantity;
                const totalPriceLabel = formatCurrency(totalPriceValue);
                const basePriceLabel = formatCurrency(basePrice);
                const measurement = getMeasurementMeta(product.category);

                return (
                  <div
                    key={product.id}
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
                          className={`wishlist-btn ${isInWishlist(product.id) ? 'active' : ''}`}
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
                          onClick={() => adjustQuantity(product.id, -1)}
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
                            updateQuantity(product.id, parsedValue);
                          }}
                          aria-label="Quantity"
                        />
                        <button
                          type="button"
                          className="qty-btn"
                          onClick={() => adjustQuantity(product.id, 1)}
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
                          onClick={() => handleAddToCartWithQuantity(product, quantity, totalPriceValue, basePrice)}
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
                    <p className="quick-view-price">{formatCurrency((parseInt(showQuickView.price.replace(/[^0-9]/g, ''), 10) || 0) * quickViewQuantity)}</p>
                    <span className="quick-view-unit-price">{formatCurrency(parseInt(showQuickView.price.replace(/[^0-9]/g, ''), 10) || 0)} {measurement.label}</span>
                  </div>
                  <div className="quick-view-quantity" aria-label={`Adjust ${measurement.unit} quantity for ${showQuickView.name}`}>
                    <button
                      type="button"
                      className="qty-btn"
                      onClick={() => {
                        const next = clampQuantity(quickViewQuantity - 1);
                        setQuickViewQuantity(next);
                        updateQuantity(showQuickView.id, next);
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
                        updateQuantity(showQuickView.id, parsedValue);
                      }}
                      aria-label="Quantity"
                    />
                    <button
                      type="button"
                      className="qty-btn"
                      onClick={() => {
                        const next = clampQuantity(quickViewQuantity + 1);
                        setQuickViewQuantity(next);
                        updateQuantity(showQuickView.id, next);
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
                      const basePriceValue = parseInt(showQuickView.price.replace(/[^0-9]/g, ''), 10) || 0;
                      const totalPriceValue = basePriceValue * quickViewQuantity;
                      handleAddToCartWithQuantity(showQuickView, quickViewQuantity, totalPriceValue, basePriceValue);
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
