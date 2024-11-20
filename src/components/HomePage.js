import React from "react";
import heroImage from '../assets/home_page_graphic.png'; // Importă imaginea

const HomePage = () => {
    return (
        <div>
            {/* Header Section */}
            <header style={styles.header}>
                <div style={styles.logo}>E-Pharm</div>
                <nav style={styles.nav}>
                    <a href="#home">Home</a>
                    <a href="#products">Products</a>
                    <a href="#services">Services</a>
                    <a href="#contact">Contact</a>
                </nav>
            </header>

            {/* Hero Section */}
            <section style={styles.hero}>
                {/* Imaginea redimensionată */}
                <img src={heroImage} alt="Hero Graphic" style={styles.heroImage} />
                {/*<button style={styles.button}>Shop Now</button>*/}
            </section>

            {/* Featured Products Section */}
            <section id="products" style={styles.section}>
                <h2>Medicine Guide</h2>
                <div style={styles.productGrid}>
                    <div style={styles.productCard}>Pain Relievers</div>
                    <div style={styles.productCard}>Vitamins & Supplements</div>
                    <div style={styles.productCard}>Cold & Flu Medicine</div>
                    <div style={styles.productCard}>Prescription Refills</div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" style={styles.section}>
                <h2>Our Services</h2>
                <ul>
                    <li>Free same-day delivery on orders over $50</li>
                    <li>24/7 customer support</li>
                    <li>Easy prescription management</li>
                </ul>
            </section>

            {/* Footer Section */}
            <footer style={styles.footer}>
                <p>&copy; 2024 PharmaDeliver. All rights reserved.</p>
                <p>Contact us: support@pharmadeliver.com</p>
            </footer>
        </div>
    );
};

// Styles (Updated styles for background color and image size)
const styles = {
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#FFC9B9",
        color: "#fff",
    },
    logo: { fontSize: "1.5rem", fontWeight: "bold" },
    nav: { display: "flex", gap: "15px" },
    hero: {
        textAlign: "center",
        padding: "50px 20px",
        backgroundColor: "#FEFEE3", // Fundalul secțiunii Hero
    },
    heroImage: {
        width: "50%",  // Ajustează lățimea imaginii (50% din lățimea containerului)
        maxWidth: "400px", // Poți pune o lățime maximă de exemplu de 400px
        height: "auto", // Păstrează proporțiile imaginii
        marginBottom: "20px", // Adaugă spațiu sub imagine
        objectFit: "contain", // Asigură-te că imaginea nu este distorsionată
    },
    button: {
        padding: "10px 20px",
        fontSize: "1rem",
        color: "#fff",
        backgroundColor: "#007BFF",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
    section: { padding: "30px 20px", textAlign: "center" },
    productGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "20px",
        marginTop: "20px",
    },
    productCard: {
        padding: "20px",
        backgroundColor: "#e9ecef",
        borderRadius: "8px",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    },
    footer: {
        textAlign: "center",
        padding: "10px",
        backgroundColor: "#343a40",
        color: "#fff",
    },
};


export default HomePage;