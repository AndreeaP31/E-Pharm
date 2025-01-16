import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CourierPage.css";

const CourierPage = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleLogout = async () => {
    try {
      await logout();
      console.log("Curierul s-a deconectat cu succes");
      navigate("/");
    } catch (error) {
      console.error("Eroare la deconectare:", error);
    }
  };

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/orders/all");
      setOrders(response.data);
    } catch (err) {
      console.error("Eroare la preluarea comenzilor:", err.message);
      setError("Nu s-au putut prelua comenzile. Încearcă din nou mai târziu.");
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      const response = await axios.put("http://localhost:5000/api/orders/update-status", { orderId, status });

      // Dacă statusul este "livrată" sau "anulată", eliminăm comanda din listă
      if (status === "livrată" || status === "anulată") {
        setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
      } else {
        // Actualizăm statusul comenzii în listă
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: response.data.order.status } : order
          )
        );
      }
    } catch (err) {
      console.error("Eroare la actualizarea statusului comenzii:", err.message);
      setError("Nu s-a putut actualiza statusul comenzii.");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="courier-page">
      {/* Header */}
      <header className="header">
        <h1 className="logo">Panoul Curierului</h1>
        <nav className="nav">
          {isAuthenticated && user ? (
            <>
              <button onClick={handleLogout} className="logout-button">
                <i className="fas fa-sign-out-alt"></i> Deconectează-te
              </button>
              <p className="welcome-message">
                <strong>Bun venit, {user.name}!</strong>
              </p>
            </>
          ) : (
            <p className="welcome-message">Neautentificat</p>
          )}
        </nav>
      </header>

      {/* Comenzi */}
      <div className="orders-section">
        <h2>Toate Comenzile</h2>
        {loading ? (
          <p>Se încarcă...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : orders.length > 0 ? (
          <ul className="orders-list">
            {orders.map((order) => (
              <li key={order._id} className="order-card">
                <h3>Comanda #{order._id}</h3>
                <p>
                  <strong>Status:</strong>
                  <span className="status">{order.status}</span> {/* Afișează statusul colorat */}
                </p>
                <p><strong>Nume:</strong> {order.name}</p>
                <p><strong>Telefon:</strong> {order.phone}</p>
                <p><strong>Adresă:</strong> {order.address}</p>
                <p><strong>Total:</strong> ${order.totalPrice.toFixed(2)}</p>
                <h4>Produse:</h4>
                <ul>
                  {order.products.map((item) => (
                    <li key={item.product._id}>
                      {item.product.name} - Cantitate: {item.quantity}
                    </li>
                  ))}
                </ul>
                <div className="order-actions">
                {order.status === "plasata" && (
                    <button
                      onClick={() => updateOrderStatus(order._id, "preluată")}
                      className="accept-button"
                    >
                      Marchează ca Preluată
                    </button>
                  )}
                  {order.status === "acceptată" && (
                    <button
                      onClick={() => updateOrderStatus(order._id, "preluată")}
                      className="accept-button"
                    >
                      Marchează ca Preluată
                    </button>
                  )}
                  {order.status === "preluată" && (
                    <button
                      onClick={() => updateOrderStatus(order._id, "livrată")}
                      className="accept-button"
                    >
                      Marchează ca Livrată
                    </button>
                  )}
                  {order.status !== "livrată" && (
                    <button
                      onClick={() => updateOrderStatus(order._id, "anulată")}
                      className="decline-button"
                    >
                      Anulează Comanda
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Nu există comenzi.</p>
        )}
      </div>
    </div>
  );
};

export default CourierPage;
