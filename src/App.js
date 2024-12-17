import React, { useState, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from './pages/Footer'; 
import Home from "./pages/Home";
import ProductManagement from "./pages/ProductManagement";
import UserManagement from "./pages/UserManagement";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductDisplay from './pages/ProductDisplay';
import './pages/styles.css';

export const ProductContext = createContext();

function App() {
  const [products, setProducts] = useState([]);

  return (
    <div>
    <ProductContext.Provider value={{ products, setProducts }}>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productManagement" element={<ProductManagement />} />
        <Route path="/userManagement" element={<UserManagement />} />
        <Route path="/display" element={<ProductDisplay />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </Router>
    </ProductContext.Provider>
    <Footer />
    </div>
  );
}

export default App;
