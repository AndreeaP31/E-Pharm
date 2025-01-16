import React, { useState } from "react";
import { useCartStore } from "../store/cartStore";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./OrderDetailsPage.css";

function OrderDetailsPage() {
  const cart = useCartStore((state) => state.cart); // Accesăm coșul
  const clearCart = useCartStore((state) => state.clearCart); // Funcția pentru a goli coșul
  const navigate = useNavigate(); // Navigare către alte pagini

  const [address, setAddress] = useState(""); // Starea pentru adresă
  const [phone, setPhone] = useState(""); // Starea pentru telefon
  const [name, setName] = useState(""); // Starea pentru nume
  const [error, setError] = useState(""); // Mesaj de eroare

  // Funcția pentru a plasa comanda
  const handlePlaceOrder = async () => {
    if (!address || !phone || !name) {
      setError("All fields are required!"); // Validare de bază
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/orders/create", {
        userId: "63e7f2a5c8a456f123456789", // Exemplu de utilizator autentificat
        pharmacyId: cart[0].pharmacy._id, // ID-ul farmaciei
        products: cart.map((item) => ({
          productId: item.product._id, // ID-ul produsului
          price: item.product.price,
          quantity: item.quantity,
        })),
        address,
        phone,
        name,
      });

      alert("Order placed successfully!");
      clearCart(); // Golește coșul după plasarea comenzii
      navigate("/"); // Navighează către pagina principală
    } catch (error) {
      console.error("Error placing order:", error.message);
      alert("Failed to place order. Please try again later.");
    }
  };

  return (
    <div className="order-details-page">
      <h1>Order Details</h1>
      <form className="order-form" onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your delivery address"
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button onClick={handlePlaceOrder} className="place-order-btn">
          Confirm Order
        </button>
      </form>
    </div>
  );
}

export default OrderDetailsPage;
