import React from 'react';
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Chart.js에서 사용될 요소들을 등록해야 함
ChartJS.register(
  CategoryScale, // X축
  LinearScale, // Y축
  BarElement, // 막대 그래프
  Title,
  Tooltip,
  Legend
);
const ChartBar = () => {
  const data = {
    labels: ["2019", "2020", "2021", "2022", "2023"],
    datasets: [
      {
        label: "회원 수",
        data: [500, 800, 1200, 1500, 1800], // 데이터 값
        backgroundColor: "rgba(54, 162, 235, 0.6)", // 바 색상
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true, // 반응형 차트
    plugins: {
      legend: { position: "top" }, // 범례 위치
      title: { display: true, text: "연도별 회원 수 증가" }, // 차트 제목
    },
  };
  return (
    <Bar data={data} options={options} />
  );
}

export default ChartBar;
