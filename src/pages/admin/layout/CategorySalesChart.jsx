import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import useAxios from "../../../hooks/useAxios";

const CategorySalesChart = () => {
  const { req } = useAxios();
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "카테고리별 판매량",
        data: [],
        backgroundColor: [
          "rgba(255, 179, 186, 0.7)", // 핑크
          "rgba(186, 217, 255, 0.7)", // 블루
          "rgba(186, 255, 201, 0.7)", // 그린
          "rgba(255, 255, 186, 0.7)", // 옐로우
        ],
        borderColor: [
          "rgba(255, 179, 186, 1)",
          "rgba(186, 217, 255, 1)",
          "rgba(186, 255, 201, 1)",
          "rgba(255, 255, 186, 1)",
        ],
      },
    ],
  });

  useEffect(() => {
    const fetchCategorySales = async () => {
      try {
        const data = await req("get", "admin/dashboard/category"); // ✅ useAxios 사용
        if (!data) return;
        console.log(data);
        setChartData({
          labels: data.map((item) => `카테고리 : ${item.category_type}`),
          datasets: [
            {
              ...chartData.datasets[0],
              data: data.map((item) => item.total_sales),
            },
          ],
        });
      } catch (error) {
        console.error("판매 데이터 로드 실패:", error);
      }
    };

    fetchCategorySales();
  }, [req]);

  return <Doughnut data={chartData} options={{ responsive: true, plugins: { legend: { position: "top" } } }} />;
};

export default CategorySalesChart;
