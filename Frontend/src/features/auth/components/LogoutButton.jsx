import React from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
    const { handleLogout } = useAuth();
    const navigate = useNavigate();

    const onLogout = async () => {
        await handleLogout();
        navigate("/login");
    };

    return (
        <button onClick={onLogout} className="button secondary-button">
            Logout
        </button>
    );
};

export default LogoutButton;