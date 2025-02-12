import React from "react";
import { Line } from "react-chartjs-2";

const ActivityChart = () => {
  const data = {
    labels: ["1월", "2월", "3월", "4월", "5월", "6월"],
    datasets: [
      {
        label: "방문자 횟수",
        data: [300, 450, 600, 800, 650, 900],
        borderColor: "rgba(255,99,132,1)",
        backgroundColor: "rgba(255,99,132,0.2)",
        fill: true,
      },
    ],
  };

  return <Line data={data} />;
};

export default ActivityChart;