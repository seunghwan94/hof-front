import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js";  // 🔹 ChartJS 추가!
const NewUsersChart = () => {
  const data = {
    labels: ["1월", "2월", "3월", "4월", "5월", "6월"],
    datasets: [
      {
        label: "신규 가입자",
        data: [120, 190, 300, 500, 400, 600],
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        fill: true,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "월별 신규 가입자" },
    },
  };
// ✅ 컴포넌트가 언마운트될 때 기존 차트 정리
useEffect(() => {
  return () => {
    if (ChartJS.instances.length > 0) {
      ChartJS.instances.forEach((chart) => chart.destroy());
    }
  };
}, []);

  return <Line data={data} options={options} />;
};

export default NewUsersChart;
