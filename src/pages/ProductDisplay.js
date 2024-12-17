import React, { useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import Footer from './Footer';
import { ProductContext } from '../App';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ProductDisplay = () => {
  const { products } = useContext(ProductContext);

  if (!products || products.length === 0) {
    return <p>No products to display.</p>;
  }

  const chartData = {
    labels: products.map((item) => item.name),
    datasets: [
      {
        label: 'Quantity',
        data: products.map((item) => parseInt(item.quantity, 10)),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return (
    <div>
    <div style={{ padding: '20px' }}>
      <h2>Product List</h2>
      <table border="1" style={{ width: '100%', marginBottom: '20px' }}>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>SKU</th>
            <th>Amount</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.sku}</td>
              <td>{item.amount}</td>
              <td>{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ width: '60%', margin: '0 auto' }}>
        <Bar data={chartData} />
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default ProductDisplay;
