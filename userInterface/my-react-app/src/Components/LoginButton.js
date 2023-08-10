import { React } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/LoginButton.css";
// import { useAuth0 } from "@auth0/auth0-react";

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
