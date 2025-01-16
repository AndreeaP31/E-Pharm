import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./OrderStatusPage.css";

function OrderStatusPage() {
  const { userId } = useParams(); // Extrage userId din URL
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  console.log("Extracted userId from params:", userId);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/orders/user/${userId}`);
        setOrders(response.data);
      } catch (err) {
        setError("Failed to fetch orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  if (loading) {
    return <p className="loading">Loading...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="order-status-page">
      <h1>Your Orders</h1>
      {orders.length > 0 ? (
        <ul className="orders-list">
          {orders.map((order) => (
            <li key={order._id} className="order-card">
              <h2>Order #{order._id}</h2>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}</p>
              <p><strong>Address:</strong> {order.address}</p>
              <p><strong>Phone:</strong> {order.phone}</p>
              <h3>Products:</h3>
              <ul>
                {order.products.map((item) => (
                  <li key={item.product._id}>
                    {item.product.name} - Quantity: {item.quantity}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-orders">You have no orders.</p>
      )}
    </div>
  );
}

export default OrderStatusPage;
