import React from "react";
import { Line } from "react-chartjs-2";

const VendorRankingChart = () => {
  const data = {
    labels: ["업체1", "업체2", "업체3", "업체4", "업체5"],
    datasets: [
      {
        label: "전화 클릭 수",
        data: [90, 80, 70, 60, 50],
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        fill: true,
      },
    ],
  };

  return <Line data={data} />;
};

export default VendorRankingChart;
