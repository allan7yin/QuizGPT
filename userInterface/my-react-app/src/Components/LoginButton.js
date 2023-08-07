import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/LoginButton.css";

const LoginButton = () => {
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <button className="login-button" onClick={handleLoginClick}>
      Login
    </button>
  );
};

export default LoginButton;
