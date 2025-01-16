import React, { useState, useEffect } from "react";
import "./HomePage.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import axios from "axios";

function HomePage() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  console.log("User object:", user);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Fetch pharmacies from backend
  useEffect(() => {
    const fetchPharmacies = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/pharmacy");
        setPharmacies(response.data);
      } catch (err) {
        setError("Failed to fetch pharmacies.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPharmacies();
  }, []);

  return (
    <div className="homepage">
      <header className="header">
        <h1 className="logo">E-Pharm</h1>
        <nav className="nav">
          <button>
            <i className="fas fa-book"></i> Ghid
          </button>
          <button>
            <Link to="/cart" className="button-link">
              <i className="fas fa-shopping-cart"></i> Coșul meu
            </Link>
          </button>

          {isAuthenticated && user?._id && (
            <button>
              <Link to={`/orders/${user._id}`} className="button-link">
                <i className="fas fa-box"></i> Status comenzi
              </Link>
            </button>
          )}

          {isAuthenticated ? (
            <>
              <button
                onClick={handleLogout}
                className="button-link logout-button"
              >
                <i className="fas fa-sign-out-alt"></i> Deconectează-te
              </button>
              <p className="welcome-message">
                <strong>Hello, {user?.name}!</strong>
              </p>
            </>
          ) : (
            <button>
              <Link to="/selectrole" className="button-link">
                <i className="fas fa-user"></i> Conectează-te
              </Link>
            </button>
          )}
        </nav>
      </header>

      {/* Wrapper for Menu Section */}
      <div className="content-wrapper">
        <div className="menu-section">
          <aside className="menu">
            <h2>Farmacii</h2>
            {/* Lista farmaciilor */}
            {loading ? (
              <p>Se încarcă...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <ul>
                {pharmacies.map((pharmacy) => (
                  <li key={pharmacy._id}>
                    {/* Transmite ID-ul farmaciei */}
                    <Link to={`/pharmacy/${pharmacy._id}`}>
                      {pharmacy.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </aside>
        </div>
        <div className="about-section">
          <h2>Despre noi</h2>
          <p>
            Bine ai venit pe E-Pharm, platforma care îți aduce farmacia direct
            acasă! Descoperă o gamă variată de produse farmaceutice și de
            îngrijire personală din farmacii de top, toate disponibile într-un
            singur loc. Cu E-Pharm, poți naviga ușor printre farmacii, consulta
            medicamentele disponibile și comanda rapid produsele de care ai
            nevoie, fără să părăsești confortul casei tale. Fie că ai nevoie de
            remedii rapide pentru răceală, vitamine pentru imunitate sau produse
            cosmetice de calitate, E-Pharm îți oferă soluțiile ideale, doar la
            câteva clickuri distanță. Începe acum experiența simplă și sigură a
            cumpărăturilor online în farmacii E-Pharm îți aduce sănătatea mai
            aproape ca niciodată!
          </p>
        </div>
      </div>

      <footer className="footer">
        <h1>E-Pharm</h1>
        <div className="footer-icon">
          <i className="fas fa-envelope"></i>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;