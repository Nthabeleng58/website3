import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from '../App';
import Footer from './Footer';
import './ProductManagement.css';

const ProductManagement = () => {
  const { products, setProducts } = useContext(ProductContext);
  const [product, setProduct] = useState({
    name: '',
    sku: '',
    amount: '',
    quantity: '',
  });
  const [editIndex, setEditIndex] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleAddOrUpdateProduct = (e) => {
    e.preventDefault();

    if (!product.name || !product.sku || !product.amount || !product.quantity) {
      alert('Please fill in all fields!');
      return;
    }

    if (editIndex !== null) {
      // Update product
      const updatedProducts = products.map((p, index) =>
        index === editIndex ? product : p
      );
      setProducts(updatedProducts);
      setEditIndex(null);
    } else {
      // Add new product
      setProducts([...products, { ...product }]);
    }

    setProduct({ name: '', sku: '', amount: '', quantity: '' });
  };

  const handleDeleteProduct = (index) => {
    const filteredProducts = products.filter((_, i) => i !== index);
    setProducts(filteredProducts);
  };

  const handleEditProduct = (index) => {
    setProduct(products[index]);
    setEditIndex(index);
  };

  return (
    <div>
    <div className="product-management-container">
      <h2>Product Management</h2>
      <nav>
        <Link to="/">Add Product</Link>
        <Link to="/display">View Products</Link>
      </nav>

      <div className="add-product-card">
        <h3>{editIndex !== null ? 'Update Product' : 'Add Product'}</h3>
        <form onSubmit={handleAddOrUpdateProduct}>
          <div>
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={product.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="sku"
              placeholder="SKU"
              value={product.sku}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={product.amount}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={product.quantity}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">
            {editIndex !== null ? 'Update Product' : 'Add Product'}
          </button>
        </form>
      </div>

      <table className="product-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>SKU</th>
            <th>Amount</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod, index) => (
            <tr key={index}>
              <td>{prod.name}</td>
              <td>{prod.sku}</td>
              <td>{prod.amount}</td>
              <td>{prod.quantity}</td>
              <td>
                <button onClick={() => handleEditProduct(index)}>Edit</button>
                <button onClick={() => handleDeleteProduct(index)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <Footer />
    </div>
  );
};

export default ProductManagement;
