import React, { useState } from "react";
import "../Styles/LoginPage.css";
import Navbar from "../Components/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    // only need to go make login api call if jwt is not in local storage
    e.preventDefault();

    const loginData = {
      username: username,
      password: password,
      email: "plz@uwaterloo.ca",
    };

    try {
      const response = await fetch("http://localhost:8080/api/account/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const data = await response.json();
        const jwt = data.token;
        localStorage.setItem("jwt", jwt);
        // redirect to create quiz page
        navigate("/");
      } else {
        // Handle login error (e.g., incorrect credentials)
        console.log(response);
      }
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  // Check if the JWT is expired
  const jwt = localStorage.getItem("jwt");
  const decodedJwt = jwt ? JSON.parse(atob(jwt.split(".")[1])) : null;
  const expirationTime = decodedJwt ? decodedJwt.exp * 1000 : null; // Convert to milliseconds

  if (expirationTime && Date.now() > expirationTime) {
    localStorage.removeItem("jwt");
    // Redirect to the login page or perform other actions
    // window.location.href = '/login';
  }

  return (
    <>
      <div className="login-container">
        <div className="login-box">
          <h2>Sign in</h2>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="login-input-label" htmlFor="email">
                Username
              </label>
              <input
                className="login-input"
                type="username"
                id="username"
                name="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="login-input-label" htmlFor="password">
                Password{" "}
              </label>
              <input
                className="login-input"
                type="password"
                id="password"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="login-page-button-container">
              <button className="auth-button" type="submit">
                Log in
              </button>
              <button className="auth-button">
                {" "}
                <FontAwesomeIcon icon={faGoogle} /> Google{" "}
              </button>
              <button className="auth-button"> Sign Up </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
