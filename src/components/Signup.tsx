import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (username && password) {
      try {
        const response = await fetch(`${ import.meta.env.VITE_API_BASE_URL}/auth/signup`, { // Adjust the URL as necessary
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
          throw new Error('User already exists');
        }

        alert('User created successfully! You can now log in.');
        navigate('/login'); // Redirect to login after successful signup
      } catch (error) {
        alert(error.message);
      }
    } else {
      alert('Please enter both username and password');
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Signup</button>
      </form>
      <p>Already have an account? <a href="/login">Log in here</a></p>
    </div>
  );
};

export default Signup;