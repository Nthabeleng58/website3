import React, { useState, useEffect } from "react";
import Products from "./Products";
import ProductChart from "./ProductChart";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

const Dashboard = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const productsSnapshot = await getDocs(collection(db, "products"));
    const productsList = productsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProducts(productsList);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <Products />
      <ProductChart products={products} />
    </div>
  );
};

export default Dashboard;
