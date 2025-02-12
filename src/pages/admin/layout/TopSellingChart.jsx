import React from "react";
import { Bar } from "react-chartjs-2";

const TopSellingChart = () => {
  const data = {
    labels: ["상품 A", "상품 B", "상품 C", "상품 D", "상품 E"],
    datasets: [
      {
        label: "판매량",
        data: [150, 120, 100, 90, 80],
        backgroundColor: "rgba(255, 206, 86, 0.6)",
        borderColor: "rgba(255, 206, 86, 1)",
        borderWidth: 1,
      },
    ],
  };

  return <Bar data={data} />;
};

export default TopSellingChart;
