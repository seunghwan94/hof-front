import React from "react";
import { Line } from "react-chartjs-2";

const SalesChart = () => {
  const data = {
    labels: ["1월", "2월", "3월", "4월", "5월", "6월"],
    datasets: [
      {
        label: "상품 판매량",
        data: [500, 800, 1200, 1500, 1800, 2200],
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: true,
      },
    ],
  };

  return <Line data={data} />;
};

export default SalesChart;
