import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "1em", backgroundColor: "#333", color: "#fff" }}>
      <ul style={{ listStyle: "none", display: "flex", gap: "1em" }}>
        <li><Link to="/" style={{ color: "white", textDecoration: "none" }}>Home</Link></li>
        <li><Link to="/productManagement" style={{ color: "white", textDecoration: "none" }}>Product Management</Link></li>
        <li><Link to="/userManagement" style={{ color: "white", textDecoration: "none" }}>User Management</Link></li>
        <li><Link to="/login" style={{ color: "white", textDecoration: "none" }}>Login</Link></li>
        <li><Link to="/register" style={{ color: "white", textDecoration: "none" }}>Register</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
