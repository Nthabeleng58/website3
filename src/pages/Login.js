import React, { useState } from "react";
import Footer from './Footer';
import './FormCard.css';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom"; 
import auth from "../auth"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in:", userCredential.user);
      alert("Login successful!");
      // Redirect to ProductManagement page after successful login
      navigate("/productmanagement"); 
    } catch (error) {
      console.error("Error logging in:", error.message);
      alert(error.message);
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
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
          <button type="submit" className="form-button">
            Login
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );  
};

export default Login;
