import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import * as api from '../services/api';

const WishlistContext = createContext();

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error('useWishlist must be used within WishlistProvider');
    }
    return context;
};

export const WishlistProvider = ({ children }) => {
    const { user } = useAuth();
    const [wishlist, setWishlist] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch wishlist when user logs in
    useEffect(() => {
        if (user) {
            fetchWishlist();
        } else {
            setWishlist(null);
        }
    }, [user]);

    const fetchWishlist = async () => {
        try {
            setLoading(true);
            const data = await api.getWishlist();
            setWishlist(data);
            setError(null);
        } catch (err) {
            console.error('Error fetching wishlist:', err);
            setError('Failed to load wishlist');
            // Initialize empty wishlist if fetch fails
            setWishlist({ items: [] });
        } finally {
            setLoading(false);
        }
    };

    const addToWishlist = async (productId) => {
        if (!user) {
            setError('Please login to add to wishlist');
            return false;
        }

        try {
            setLoading(true);
            const data = await api.addToWishlist(productId);
            setWishlist(data);
            setError(null);
            return true;
        } catch (err) {
            console.error('Error adding to wishlist:', err);
            setError(err.message || 'Failed to add to wishlist');
            return false;
        } finally {
            setLoading(false);
        }
    };

    const removeFromWishlist = async (productId) => {
        if (!user) return false;

        try {
            setLoading(true);
            const data = await api.removeFromWishlist(productId);
            setWishlist(data);
            setError(null);
            return true;
        } catch (err) {
            console.error('Error removing from wishlist:', err);
            setError('Failed to remove from wishlist');
            return false;
        } finally {
            setLoading(false);
        }
    };

    const toggleWishlist = async (product) => {
        const productId = product._id || product.id;
        const isInWishlist = wishlist?.items?.some(
            item => item.product._id === productId || item.product === productId
        );

        if (isInWishlist) {
            return await removeFromWishlist(productId);
        } else {
            return await addToWishlist(productId);
        }
    };

    const isInWishlist = (productId) => {
        if (!wishlist || !wishlist.items) return false;
        return wishlist.items.some(
            item => (item.product._id || item.product) === productId
        );
    };

    const clearWishlist = async () => {
        if (!user) return false;

        try {
            setLoading(true);
            await api.clearWishlist();
            setWishlist({ items: [] });
            setError(null);
            return true;
        } catch (err) {
            console.error('Error clearing wishlist:', err);
            setError('Failed to clear wishlist');
            return false;
        } finally {
            setLoading(false);
        }
    };

    const getWishlistCount = () => {
        if (!wishlist || !wishlist.items) return 0;
        return wishlist.items.length;
    };

    const value = {
        wishlist,
        loading,
        error,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        clearWishlist,
        getWishlistCount,
        refreshWishlist: fetchWishlist,
    };

    return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};
