import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getOrders } from '../services/api';
import './Orders.css';

function Orders() {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user) {
            fetchOrders();
        }
    }, [user]);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const data = await getOrders();
            setOrders(data);
            setError(null);
        } catch (err) {
            console.error('Error fetching orders:', err);
            setError('Failed to load orders');
        } finally {
            setLoading(false);
        }
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'delivered':
                return 'status-delivered';
            case 'shipped':
                return 'status-shipped';
            case 'processing':
                return 'status-processing';
            case 'pending':
                return 'status-pending';
            case 'cancelled':
                return 'status-cancelled';
            default:
                return '';
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Show login prompt if not authenticated
    if (!user) {
        return (
            <div className="orders-empty">
                <h2>Please Login</h2>
                <p>You need to be logged in to view your orders.</p>
                <Link to="/login" className="btn btn-primary">Login</Link>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="orders-empty">
                <h2>Loading Orders...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="orders-empty">
                <h2>Error Loading Orders</h2>
                <p>{error}</p>
                <button onClick={fetchOrders} className="btn btn-primary">Try Again</button>
            </div>
        );
    }

    if (!orders || orders.length === 0) {
        return (
            <div className="orders-empty">
                <h2>No Orders Yet</h2>
                <p>You haven't placed any orders yet.</p>
                <Link to="/shop" className="btn btn-primary">Start Shopping</Link>
            </div>
        );
    }

    return (
        <div className="orders-page">
            <h1>My Orders</h1>
            <div className="orders-container">
                {orders.map((order) => (
                    <div key={order._id} className="order-card">
                        <div className="order-header">
                            <div className="order-info">
                                <h3>Order #{order._id.slice(-8).toUpperCase()}</h3>
                                <p className="order-date">{formatDate(order.createdAt)}</p>
                            </div>
                            <span className={`order-status ${getStatusClass(order.status)}`}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                        </div>

                        <div className="order-items">
                            {order.items.map((item, index) => (
                                <div key={index} className="order-item">
                                    <img src={item.product.image} alt={item.product.name} />
                                    <div className="order-item-details">
                                        <h4>{item.product.name}</h4>
                                        <p>Quantity: {item.quantity}</p>
                                        <p className="order-item-price">₹{item.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="order-summary">
                            <div className="summary-row">
                                <span>Subtotal:</span>
                                <span>₹{order.subtotal}</span>
                            </div>
                            {order.discount > 0 && (
                                <div className="summary-row discount">
                                    <span>Discount:</span>
                                    <span>-₹{order.discount}</span>
                                </div>
                            )}
                            <div className="summary-row">
                                <span>Tax:</span>
                                <span>₹{order.tax}</span>
                            </div>
                            <div className="summary-row total">
                                <span>Total:</span>
                                <span>₹{order.total}</span>
                            </div>
                        </div>

                        <div className="order-shipping">
                            <h4>Shipping Address</h4>
                            <p>{order.shippingAddress.fullName}</p>
                            <p>{order.shippingAddress.address}</p>
                            <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}</p>
                            <p>{order.shippingAddress.phone}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Orders;
