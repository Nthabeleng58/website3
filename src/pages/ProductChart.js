import React from "react";
import { Bar } from "react-chartjs-2";
import Footer from './Footer';
import { Chart as ChartJS } from "chart.js/auto";

const ProductChart = ({ products }) => {
  const data = {
    labels: products.map((product) => product.productName),
    datasets: [
      {
        label: "Quantity",
        data: products.map((product) => product.quantity),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Amount",
        data: products.map((product) => product.amount),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
    ],
  };

  return (
    <div>
    <div className="chart-container">
      <h3>Product Chart</h3>
      <Bar data={data} />
      </div>
      <Footer />
    </div>
  );
};

export default ProductChart;
