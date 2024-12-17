import React, { useState } from "react";
import auth from "../auth";
import Footer from './Footer';
import './RegisterCard.css';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Register user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;

      // Save additional user details to Realtime Database
      const db = getDatabase();
      await set(ref(db, `users/${userId}`), {
        name,
        email,
        telephone,
      });

      console.log("User registered:", userCredential.user);
      alert("Registration successful!");
    } catch (error) {
      console.error("Error registering user:", error.message);
      alert(error.message);
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Telephone"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="form-button">
            Register
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );  
};

export default Register;
