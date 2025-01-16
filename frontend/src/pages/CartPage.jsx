import React from "react";
import { useCartStore } from "../store/cartStore";
import { useNavigate } from "react-router-dom";
import "./CartPage.css";

function CartPage() {
  const cart = useCartStore((state) => state.cart);
  const navigate = useNavigate();

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {cart.length > 0 ? (
        <>
          <ul className="cart-list">
            {cart.map((item) => (
              <li key={item.product._id}>
                <div>
                  <p><strong>{item.product.name}</strong></p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ${item.product.price.toFixed(2)}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="total-section">
            <p>Total: ${cart.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2)}</p>
            <button onClick={() => navigate("/order-details")} className="place-order-btn">
              Proceed to Order Details
            </button>
          </div>
        </>
      ) : (
        <p className="empty-cart">Your cart is empty.</p>
      )}
    </div>
  );
}

export default CartPage;
