import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import * as api from '../services/api';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const { user } = useAuth();
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch cart when user logs in
    useEffect(() => {
        if (user) {
            fetchCart();
        } else {
            setCart(null);
        }
    }, [user]);

    const fetchCart = async () => {
        try {
            setLoading(true);
            const data = await api.getCart();

            // Backend returns { cart, summary }
            // Merge them for easier access
            const mergedCart = {
                ...data.cart,
                subtotal: data.summary?.subtotal || 0,
                discount: data.summary?.discount || 0,
                tax: data.summary?.tax || 0,
                total: data.summary?.total || 0,
                coupon: data.cart?.appliedCoupon || null
            };

            setCart(mergedCart);
            setError(null);
        } catch (err) {
            console.error('Error fetching cart:', err);
            setError('Failed to load cart');
            // Initialize empty cart if fetch fails
            setCart({ items: [], subtotal: 0, tax: 0, total: 0, discount: 0 });
        } finally {
            setLoading(false);
        }
    };

    const addToCart = async (productId, quantity = 1) => {
        if (!user) {
            setError('Please login to add items to cart');
            alert('Please login to add items to cart');
            return false;
        }

        try {
            setLoading(true);
            const data = await api.addToCart(productId, quantity);

            // Merge cart data with calculated totals
            const mergedCart = {
                ...data,
                subtotal: data.items?.reduce((sum, item) => sum + (item.price * item.quantity), 0) || 0,
                discount: 0,
                tax: 0,
                total: data.items?.reduce((sum, item) => sum + (item.price * item.quantity), 0) || 0,
                coupon: data.appliedCoupon || null
            };

            // Calculate tax
            mergedCart.tax = (mergedCart.subtotal - mergedCart.discount) * 0.05;
            mergedCart.total = mergedCart.subtotal - mergedCart.discount + mergedCart.tax;

            setCart(mergedCart);
            setError(null);
            return true;
        } catch (err) {
            console.error('Error adding to cart:', err);
            setError('Failed to add item to cart');
            return false;
        } finally {
            setLoading(false);
        }
    };

    const updateCartItem = async (productId, quantity) => {
        if (!user) return false;

        try {
            setLoading(true);
            const data = await api.updateCartItem(productId, quantity);

            // Recalculate totals
            const subtotal = data.items?.reduce((sum, item) => sum + (item.price * item.quantity), 0) || 0;
            const discount = 0;
            const tax = (subtotal - discount) * 0.05;
            const total = subtotal - discount + tax;

            const mergedCart = {
                ...data,
                subtotal,
                discount,
                tax,
                total,
                coupon: data.appliedCoupon || null
            };

            setCart(mergedCart);
            setError(null);
            return true;
        } catch (err) {
            console.error('Error updating cart:', err);
            setError('Failed to update cart');
            return false;
        } finally {
            setLoading(false);
        }
    };

    const removeFromCart = async (productId) => {
        if (!user) return false;

        try {
            setLoading(true);
            const data = await api.removeFromCart(productId);

            // Recalculate totals
            const subtotal = data.items?.reduce((sum, item) => sum + (item.price * item.quantity), 0) || 0;
            const discount = 0;
            const tax = (subtotal - discount) * 0.05;
            const total = subtotal - discount + tax;

            const mergedCart = {
                ...data,
                subtotal,
                discount,
                tax,
                total,
                coupon: data.appliedCoupon || null
            };

            setCart(mergedCart);
            setError(null);
            return true;
        } catch (err) {
            console.error('Error removing from cart:', err);
            setError('Failed to remove item');
            return false;
        } finally {
            setLoading(false);
        }
    };

    const applyCoupon = async (couponCode) => {
        if (!user) return false;

        try {
            setLoading(true);
            const data = await api.applyCoupon(couponCode);

            // Backend returns { cart, summary }
            const mergedCart = {
                ...data.cart,
                subtotal: data.summary?.subtotal || 0,
                discount: data.summary?.discount || 0,
                tax: data.summary?.tax || 0,
                total: data.summary?.total || 0,
                coupon: data.cart?.appliedCoupon || null
            };

            setCart(mergedCart);
            setError(null);
            return true;
        } catch (err) {
            console.error('Error applying coupon:', err);
            setError(err.message || 'Invalid coupon code');
            return false;
        } finally {
            setLoading(false);
        }
    };

    const removeCoupon = async () => {
        if (!user) return false;

        try {
            setLoading(true);
            const data = await api.removeCoupon();

            // Recalculate without coupon
            const subtotal = data.items?.reduce((sum, item) => sum + (item.price * item.quantity), 0) || 0;
            const discount = 0;
            const tax = (subtotal - discount) * 0.05;
            const total = subtotal - discount + tax;

            const mergedCart = {
                ...data,
                subtotal,
                discount,
                tax,
                total,
                coupon: null
            };

            setCart(mergedCart);
            setError(null);
            return true;
        } catch (err) {
            console.error('Error removing coupon:', err);
            setError('Failed to remove coupon');
            return false;
        } finally {
            setLoading(false);
        }
    };

    const clearCart = async () => {
        if (!user) return false;

        try {
            setLoading(true);
            await api.clearCart();
            setCart({ items: [], subtotal: 0, tax: 0, total: 0, discount: 0 });
            setError(null);
            return true;
        } catch (err) {
            console.error('Error clearing cart:', err);
            setError('Failed to clear cart');
            return false;
        } finally {
            setLoading(false);
        }
    };

    const getCartCount = () => {
        if (!cart || !cart.items) return 0;
        return cart.items.reduce((total, item) => total + item.quantity, 0);
    };

    const value = {
        cart,
        loading,
        error,
        addToCart,
        updateCartItem,
        removeFromCart,
        applyCoupon,
        removeCoupon,
        clearCart,
        getCartCount,
        refreshCart: fetchCart,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
