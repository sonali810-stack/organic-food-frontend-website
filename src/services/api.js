// ============================================
// API SERVICE - Frontend to Backend Communication
// ============================================
// This file handles all HTTP requests to the backend API

// Base URL of your backend server
// Automatically uses production URL when deployed, localhost when developing
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get the JWT token from localStorage
 * This token is sent with every protected request
 */
const getToken = () => {
    return localStorage.getItem('token');
};

/**
 * Save user data and token to localStorage
 * Called after successful login/registration
 */
const saveAuthData = (user, token) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
};

/**
 * Remove user data and token from localStorage
 * Called when user logs out
 */
const clearAuthData = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
};

/**
 * Get stored user data from localStorage
 */
const getStoredUser = () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
};

// ============================================
// AUTHENTICATION APIs
// ============================================

/**
 * Register a new user
 * @param {Object} userData - { name, email, password }
 * @returns {Promise} - User data and JWT token
 */
export const register = async (userData) => {
    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Registration failed');
        }

        // Save token and user data to localStorage
        saveAuthData(data.data.user, data.data.token);

        return data.data;
    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
};

/**
 * Login user
 * @param {Object} credentials - { email, password }
 * @returns {Promise} - User data and JWT token
 */
export const login = async (credentials) => {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Login failed');
        }

        // Save token and user data to localStorage
        saveAuthData(data.data.user, data.data.token);

        return data.data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

/**
 * Logout user
 * Clears localStorage
 */
export const logout = () => {
    clearAuthData();
};

/**
 * Get current user profile
 * @returns {Promise} - User data
 */
export const getCurrentUser = async () => {
    try {
        const token = getToken();
        if (!token) {
            throw new Error('No token found');
        }

        const response = await fetch(`${API_URL}/auth/me`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to get user');
        }

        return data.data;
    } catch (error) {
        console.error('Get user error:', error);
        throw error;
    }
};

// ============================================
// PRODUCT APIs
// ============================================

/**
 * Get all products with optional filters
 * @param {Object} filters - { category, minPrice, maxPrice, search, sort }
 * @returns {Promise} - Array of products
 */
export const getProducts = async (filters = {}) => {
    try {
        // Build query string from filters
        const queryParams = new URLSearchParams();

        if (filters.category && filters.category !== 'all') {
            queryParams.append('category', filters.category);
        }
        if (filters.minPrice) {
            queryParams.append('minPrice', filters.minPrice);
        }
        if (filters.maxPrice) {
            queryParams.append('maxPrice', filters.maxPrice);
        }
        if (filters.search) {
            queryParams.append('search', filters.search);
        }
        if (filters.sort) {
            queryParams.append('sort', filters.sort);
        }

        const url = `${API_URL}/products${queryParams.toString() ? '?' + queryParams.toString() : ''}`;

        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch products');
        }

        return data.data;
    } catch (error) {
        console.error('Get products error:', error);
        throw error;
    }
};

/**
 * Get single product by ID
 * @param {string} productId - Product ID
 * @returns {Promise} - Product data
 */
export const getProductById = async (productId) => {
    try {
        const response = await fetch(`${API_URL}/products/${productId}`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch product');
        }

        return data.data;
    } catch (error) {
        console.error('Get product error:', error);
        throw error;
    }
};

// ============================================
// CART APIs
// ============================================

/**
 * Get user's cart
 * @returns {Promise} - Cart data with items and summary
 */
export const getCart = async () => {
    try {
        const token = getToken();
        if (!token) {
            throw new Error('Please login to view cart');
        }

        const response = await fetch(`${API_URL}/cart`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch cart');
        }

        return data.data;
    } catch (error) {
        console.error('Get cart error:', error);
        throw error;
    }
};

/**
 * Add item to cart
 * @param {string} productId - Product ID
 * @param {number} quantity - Quantity to add
 * @returns {Promise} - Updated cart data
 */
export const addToCart = async (productId, quantity = 1) => {
    try {
        const token = getToken();
        if (!token) {
            throw new Error('Please login to add items to cart');
        }

        const response = await fetch(`${API_URL}/cart/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ productId, quantity }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to add to cart');
        }

        return data.data;
    } catch (error) {
        console.error('Add to cart error:', error);
        throw error;
    }
};

/**
 * Update cart item quantity
 * @param {string} productId - Product ID
 * @param {number} quantity - New quantity
 * @returns {Promise} - Updated cart data
 */
export const updateCartItem = async (productId, quantity) => {
    try {
        const token = getToken();
        if (!token) {
            throw new Error('Please login to update cart');
        }

        const response = await fetch(`${API_URL}/cart/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ productId, quantity }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to update cart');
        }

        return data.data;
    } catch (error) {
        console.error('Update cart error:', error);
        throw error;
    }
};

/**
 * Remove item from cart
 * @param {string} productId - Product ID
 * @returns {Promise} - Updated cart data
 */
export const removeFromCart = async (productId) => {
    try {
        const token = getToken();
        if (!token) {
            throw new Error('Please login to remove items');
        }

        const response = await fetch(`${API_URL}/cart/remove/${productId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to remove item');
        }

        return data.data;
    } catch (error) {
        console.error('Remove from cart error:', error);
        throw error;
    }
};

/**
 * Apply coupon code to cart
 * @param {string} couponCode - Coupon code
 * @returns {Promise} - Updated cart with discount
 */
export const applyCoupon = async (couponCode) => {
    try {
        const token = getToken();
        if (!token) {
            throw new Error('Please login to apply coupon');
        }

        const response = await fetch(`${API_URL}/cart/apply-coupon`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ couponCode }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to apply coupon');
        }

        return data.data;
    } catch (error) {
        console.error('Apply coupon error:', error);
        throw error;
    }
};

/**
 * Remove coupon from cart
 * @returns {Promise} - Updated cart without discount
 */
export const removeCoupon = async () => {
    try {
        const token = getToken();
        if (!token) {
            throw new Error('Please login');
        }

        const response = await fetch(`${API_URL}/cart/remove-coupon`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to remove coupon');
        }

        return data.data;
    } catch (error) {
        console.error('Remove coupon error:', error);
        throw error;
    }
};

/**
 * Clear entire cart
 * @returns {Promise} - Empty cart
 */
export const clearCart = async () => {
    try {
        const token = getToken();
        if (!token) {
            throw new Error('Please login');
        }

        const response = await fetch(`${API_URL}/cart/clear`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to clear cart');
        }

        return data.data;
    } catch (error) {
        console.error('Clear cart error:', error);
        throw error;
    }
};

// ============================================
// ORDER APIs
// ============================================

/**
 * Create order from cart
 * @param {Object} orderData - { shippingAddress, paymentMethod }
 * @returns {Promise} - Created order data
 */
export const createOrder = async (orderData) => {
    try {
        const token = getToken();
        if (!token) {
            throw new Error('Please login to place order');
        }

        const response = await fetch(`${API_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(orderData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to create order');
        }

        return data.data;
    } catch (error) {
        console.error('Create order error:', error);
        throw error;
    }
};

/**
 * Get user's order history
 * @returns {Promise} - Array of orders
 */
export const getOrders = async () => {
    try {
        const token = getToken();
        if (!token) {
            throw new Error('Please login to view orders');
        }

        const response = await fetch(`${API_URL}/orders`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch orders');
        }

        return data.data;
    } catch (error) {
        console.error('Get orders error:', error);
        throw error;
    }
};

// ============================================
// AI CHAT APIs
// ============================================

/**
 * Send a message to the AI assistant
 * @param {string} message - User message
 * @param {Array} history - Recent chat messages
 * @returns {Promise} - AI reply and suggested questions
 */
export const sendChatMessage = async (message, history = []) => {
    try {
        const response = await fetch(`${API_URL}/ai/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message, history }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to get chatbot response');
        }

        return data.data;
    } catch (error) {
        console.error('AI chat error:', error);
        throw error;
    }
};

/**
 * Get single order by ID
 * @param {string} orderId - Order ID
 * @returns {Promise} - Order data
 */
export const getOrderById = async (orderId) => {
    try {
        const token = getToken();
        if (!token) {
            throw new Error('Please login to view order');
        }

        const response = await fetch(`${API_URL}/orders/${orderId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch order');
        }

        return data.data;
    } catch (error) {
        console.error('Get order error:', error);
        throw error;
    }
};

// ============================================
// WISHLIST APIs
// ============================================

/**
 * Get user's wishlist
 * @returns {Promise} - Wishlist data
 */
export const getWishlist = async () => {
    try {
        const token = getToken();
        if (!token) {
            throw new Error('Please login to view wishlist');
        }

        const response = await fetch(`${API_URL}/wishlist`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch wishlist');
        }

        return data.data;
    } catch (error) {
        console.error('Get wishlist error:', error);
        throw error;
    }
};

/**
 * Add product to wishlist
 * @param {string} productId - Product ID
 * @returns {Promise} - Updated wishlist
 */
export const addToWishlist = async (productId) => {
    try {
        const token = getToken();
        if (!token) {
            throw new Error('Please login to add to wishlist');
        }

        const response = await fetch(`${API_URL}/wishlist/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ productId }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to add to wishlist');
        }

        return data.data;
    } catch (error) {
        console.error('Add to wishlist error:', error);
        throw error;
    }
};

/**
 * Remove product from wishlist
 * @param {string} productId - Product ID
 * @returns {Promise} - Updated wishlist
 */
export const removeFromWishlist = async (productId) => {
    try {
        const token = getToken();
        if (!token) {
            throw new Error('Please login to remove from wishlist');
        }

        const response = await fetch(`${API_URL}/wishlist/remove/${productId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to remove from wishlist');
        }

        return data.data;
    } catch (error) {
        console.error('Remove from wishlist error:', error);
        throw error;
    }
};

/**
 * Clear entire wishlist
 * @returns {Promise} - Empty wishlist
 */
export const clearWishlist = async () => {
    try {
        const token = getToken();
        if (!token) {
            throw new Error('Please login to clear wishlist');
        }

        const response = await fetch(`${API_URL}/wishlist/clear`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to clear wishlist');
        }

        return data.data;
    } catch (error) {
        console.error('Clear wishlist error:', error);
        throw error;
    }
};

// ============================================
// EXPORT HELPER FUNCTIONS
// ============================================

export { getStoredUser, saveAuthData, clearAuthData, getToken };
