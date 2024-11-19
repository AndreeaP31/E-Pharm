import React from "react";

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
                <h1>Get Your Medicines Delivered to Your Doorstep</h1>
                <p>Fast, reliable, and affordable pharmacy delivery services.</p>
                <button style={styles.button}>Shop Now</button>
            </section>

            {/* Featured Products Section */}
            <section id="products" style={styles.section}>
                <h2>Featured Products</h2>
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

// Styles (Simple inline styles for demonstration purposes)
const styles = {
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#007BFF",
        color: "#fff",
    },
    logo: { fontSize: "1.5rem", fontWeight: "bold" },
    nav: { display: "flex", gap: "15px" },
    hero: {
        textAlign: "center",
        padding: "50px 20px",
        backgroundColor: "#f8f9fa",
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
