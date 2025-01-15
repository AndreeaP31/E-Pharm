import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import "./HomePage.css";
import { Link, useNavigate} from "react-router-dom";


function HomePage() {

    return (
        <div className="homepage">
            {/* Header */}
            <header className="header">
                <h1 className="logo">E-Pharm</h1>
                <nav className="nav">
                    <button>
                        <i className="fas fa-book"></i> Ghid
                    </button>
                    <button>
                        <i className="fas fa-shopping-cart"></i> Cosul meu
                    </button>
                    <button>
                    <Link to="/signup" className="button-link">
                     <i className="fas fa-user"></i> Contul meu
                    </Link>
                    </button>
                    
                </nav>
            </header>

      {/* Wrapper for Menu Section and About Section */}
      <div className="content-wrapper">
        {/* Menu and Image Section */}
        <div className="menu-section">
          {/* Menu */}
          <aside className="menu">
            <h2>Farmacii</h2>
            <ul>
              <li>Farmacia Tei</li>
              <li>Dr. Max</li>
              <li>Sensiblu</li>
              <li>Help Net</li>
            </ul>
          </aside>

                {/* Image */}
                <div className="menu-image">
                    <img
                        src="F:\Facultate\An3\IS\E-Pharm\public\resources\ilustratie-medicamente.jpg" // Path relative to the public folder
                        alt="Pharmacy illustration"
                        className="pharmacy-illustration"
                    />
                </div>
            </div>
            {/* About Section */}
            <div className="about-section">
                <h2>Despre noi</h2>
                <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur.
                </p>
            </div>

        {/* Guide Section */}
        <div className="guide-section">
          <h2>Ghid Medicamente</h2>
          <div className="guide-buttons">
            <button>Dureri de cap</button>
            <button>Febra</button>
            <button>Raceala</button>
            <button>Dureri musculare</button>
          </div>
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
