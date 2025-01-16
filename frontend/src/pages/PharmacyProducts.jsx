import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"; // Importăm Link
import axios from "axios";
import "./PharmacyProducts.css";
import { useCartStore } from "../store/cartStore"; // Importăm magazinul pentru coș

function PharmacyProducts() {
  const { id } = useParams();
  const [pharmacy, setPharmacy] = useState(null);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterBy, setFilterBy] = useState(""); // Criteriul de filtrare

  const addToCart = useCartStore((state) => state.addToCart); // Funcția pentru a adăuga produse în coș

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pharmacyResponse = await axios.get(`http://localhost:5000/api/pharmacy/${id}`);
        setPharmacy(pharmacyResponse.data);

        const productsResponse = await axios.get(`http://localhost:5000/api/products/pharmacy/${id}`);
        setProducts(productsResponse.data);
        setFilteredProducts(productsResponse.data); // Inițializare cu toate produsele
      } catch (err) {
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Funcție pentru a filtra produsele după "use"
  const handleFilterChange = (event) => {
    const selectedValue = event.target.value;
    setFilterBy(selectedValue);

    if (selectedValue) {
      const filtered = products.filter((product) => product.use === selectedValue);
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products); // Resetare la toate produsele
    }
  };

  if (loading) {
    return <p className="loading">Loading...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="pharmacy-products">
      <div className="pharmacy-header">
        <div className="header-top">
          <h1>{pharmacy?.name}</h1>
          <Link to="/cart" className="cart-link">View Cart</Link>
        </div>
        <p><strong>Address:</strong> {pharmacy?.address}</p>
        <p><strong>Phone:</strong> {pharmacy?.phoneNumber || "N/A"}</p>
      </div>

      <div className="filter-section">
        <label htmlFor="filter" className="filter-label">Filter by use:</label>
        <select id="filter" value={filterBy} onChange={handleFilterChange} className="filter-select">
          <option value="">All</option>
          <option value="dureri cap">Dureri cap</option>
          <option value="febra">Febra</option>
          <option value="raceala">Raceala</option>
          <option value="dureri musculare">Dureri musculare</option>
        </select>
      </div>

      <h2 className="products-title">Products</h2>
      {filteredProducts.length > 0 ? (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <div className="product-card" key={product._id}>
              <h3>{product.name}</h3>
              <p>{product.description || "No description available."}</p>
              <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
              <p><strong>Use:</strong> {product.use}</p>
              <button onClick={() => addToCart(product, pharmacy)} className="add-to-cart-btn">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-products">No products available for the selected filter.</p>
      )}
    </div>
  );
}

export default PharmacyProducts;
