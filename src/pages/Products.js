import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { Line } from "react-chartjs-2"; 
import { Chart as ChartJS } from "chart.js/auto";
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [sku, setSku] = useState("");
  const [amount, setAmount] = useState("");
  const [quantity, setQuantity] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Fetch products from Firestore
  const fetchProducts = async () => {
    const productsSnapshot = await getDocs(collection(db, "products"));
    const productsList = productsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProducts(productsList);
  };

  // Use useEffect to fetch data when component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  // Add product to Firestore
  const addProduct = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "products"), {
      productName,
      sku,
      amount: parseFloat(amount),
      quantity: parseInt(quantity),
    });
    setProductName("");
    setSku("");
    setAmount("");
    setQuantity("");
    fetchProducts();

    console.log("Product to add:", productName, sku, amount, quantity);
  };

  // Edit product - populate form fields with existing data
  const editProduct = (product) => {
    setProductName(product.productName);
    setSku(product.sku);
    setAmount(product.amount);
    setQuantity(product.quantity);
    setEditingId(product.id);
  };

  // Update product in Firestore
  const updateProduct = async (e) => {
    e.preventDefault();
    const productDoc = doc(db, "products", editingId);
    await updateDoc(productDoc, {
      productName,
      sku,
      amount: parseFloat(amount),
      quantity: parseInt(quantity),
    });
    setProductName("");
    setSku("");
    setAmount("");
    setQuantity("");
    setEditingId(null);
    fetchProducts();

    console.log("Product to add:", productName, sku, amount, quantity);
  };

  // Delete product from Firestore
  const deleteProduct = async (id) => {
    const productDoc = doc(db, "products", id);
    await deleteDoc(productDoc);
    fetchProducts();
  };

  // Prepare data for the chart
  const chartData = {
    labels: products.map(product => product.productName),
    datasets: [
      {
        label: 'Product Amount',
        data: products.map(product => product.amount),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
      {
        label: 'Product Quantity',
        data: products.map(product => product.quantity),
        borderColor: 'rgb(153, 102, 255)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="product-management">
      <h2>Product Management</h2>

      {/* Product Form for Adding or Editing Products */}
      <form onSubmit={editingId ? updateProduct : addProduct} className="product-form">
  <input
    type="text"
    placeholder="Product Name"
    value={productName}
    onChange={(e) => setProductName(e.target.value)}
    required
  />
  <input
    type="text"
    placeholder="SKU"
    value={sku}
    onChange={(e) => setSku(e.target.value)}
    required
  />
  <input
    type="number"
    placeholder="Amount"
    value={amount}
    onChange={(e) => setAmount(e.target.value)}
    required
  />
  <input
    type="number"
    placeholder="Quantity"
    value={quantity}
    onChange={(e) => setQuantity(e.target.value)}
    required
  />
  <button type="submit">{editingId ? "Update" : "Add"} Product</button>
</form>

      {/* Product Table */}
      <h3>Products Table</h3>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>SKU</th>
            <th>Amount</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.productName}</td>
              <td>{product.sku}</td>
              <td>{product.amount}</td>
              <td>{product.quantity}</td>
              <td className="actions">
                <button onClick={() => editProduct(product)}>Edit</button>
                <button onClick={() => deleteProduct(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Product Chart */}
      <h3>Product Chart</h3>
      <Line data={chartData} />
    </div>
  );
};

export default Products;
