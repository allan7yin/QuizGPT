import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const LogoutButton = () => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem("authToken");

    // Call the Auth0 logout function
    logout({ returnTo: window.location.origin });
  };

  return <button onClick={handleLogout}>Log Out</button>;
};

export default LogoutButton;
