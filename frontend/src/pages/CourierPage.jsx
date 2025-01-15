import React from "react";
import { useAuthStore } from "../store/authStore";
import "./CourierPage.css"; // Importăm CSS-ul dedicat

const CourierPage = () => {
    const { user, isAuthenticated, logout } = useAuthStore();

    const handleLogout = async () => {
        try {
            await logout();
            console.log("Courier logged out successfully");
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <div className="courier-page">
            {/* Header */}
            <header className="header">
                <h1 className="logo">Courier Dashboard</h1>
                <nav className="nav">
                    {isAuthenticated && user ? (
                        <>
                            <button onClick={handleLogout} className="logout-button">
                                <i className="fas fa-sign-out-alt"></i> Deconectează-te
                            </button>
                            <p className="welcome-message">
                                <strong>Hello, {user.name}!</strong>
                            </p>
                        </>
                    ) : (
                        <p className="welcome-message">Not authenticated</p>
                    )}
                </nav>
            </header>
        </div>
    );
};

export default CourierPage;
