import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpOrLogin = () => {
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between signup and login
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    // Save the user to localStorage
    localStorage.setItem('user', JSON.stringify({ username, email, password }));

    // Redirect to login page after successful registration
    setIsSignUp(false); // Switch to login form
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser && storedUser.username === loginUsername && storedUser.password === loginPassword) {
      // Successfully logged in, redirect to dashboard
      localStorage.setItem('loggedIn', 'true');
      navigate('/dashboard'); // Navigate to the dashboard
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div>
      <h2>{isSignUp ? 'Sign Up' : 'Log In'}</h2>
      
      {isSignUp ? (
        // Registration form
        <form onSubmit={handleRegisterSubmit}>
          <input 
            type="text" 
            placeholder="Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <input 
            type="password" 
            placeholder="Confirm Password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required 
          />
          {error && <p>{error}</p>}
          <button type="submit">Sign Up</button>
        </form>
      ) : (
        // Login form
        <form onSubmit={handleLoginSubmit}>
          <input 
            type="text" 
            placeholder="Username" 
            value={loginUsername} 
            onChange={(e) => setLoginUsername(e.target.value)} 
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={loginPassword} 
            onChange={(e) => setLoginPassword(e.target.value)} 
            required 
          />
          {error && <p>{error}</p>}
          <button type="submit">Log In</button>
        </form>
      )}

      <p>
        {isSignUp ? 'Already have an account? ' : 'Don\'t have an account? '}
        <button onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? 'Log In' : 'Sign Up'}
        </button>
      </p>
    </div>
  );
};

export default SignUpOrLogin;
