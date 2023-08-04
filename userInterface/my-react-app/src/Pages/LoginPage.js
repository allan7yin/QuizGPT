import React, { useState } from 'react';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const loginData = {
          Username: username,
          Password: password,
        };
    
        try {
          const response = await fetch('localhost:8080', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
          });
    
          if (response.ok) {
            // Handle successful login here
          } else {
            // Handle login error (e.g., incorrect credentials)
          }
        } catch (error) {
          // Handle fetch error (e.g., network issue)
        }
      };

    return (
        <div className="login-container">
          <div className="login-box">
            <div className="logo">
              {/* Insert your logo here */}
            </div>
            <h2>Sign in</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Username</label>
                <input type="username" id="username" name="username" required value={username} onChange={(e) => setUsername(e.target.value)}/>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
              </div>
              <button type="submit">Sign in</button>
            </form>
            <div className="links">
              <a href="/">Forgot password?</a>
            </div>
          </div>
        </div>
      );
    };

export default LoginPage;