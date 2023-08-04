import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginButton = () => {
    const navigate = useNavigate(); 
    const handleLoginClick = () => {
        navigate('/login');
    };

  return <button onClick={handleLoginClick}>Login</button>;
};

export default LoginButton;
