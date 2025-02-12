import React from "react";
import { Doughnut } from "react-chartjs-2";

const CategorySalesChart = () => {
  const data = {
    labels: ["침대", "소파", "책상", "조명"],
    datasets: [
      {
        label: "카테고리별 판매",
        data: [500, 300, 200, 150],
        backgroundColor: ["red", "blue", "green", "yellow"],
      },
    ],
  };
  const options = {
    responsive: true, // 반응형 차트
    plugins: {
      legend: { position: "top" }, // 범례 위치
      title: { display: true, text: "월별 판매량" }, // 차트 제목
    },
  };
  return <Doughnut data={data} options={options} />;
};

export default CategorySalesChart;
