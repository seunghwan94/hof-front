import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import useAxios from "../../../hooks/useAxios"; // useAxios 훅 불러오기

const TopSellingChart = () => {
  const { data, loading, error, req } = useAxios(); // useAxios 사용
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "판매량",
        data: [],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await req("get", "admin/dashboard/topsell"); // useAxios를 통해 GET 요청
      console.log(result);
      if (result && result.length > 0) {
        setChartData({
          labels: result.map(item => item.product_name.length > 15 ? item.product_name.slice(0, 15) + "..." : item.product_name), // 긴 상품명 잘라서 표시
          datasets: [
            {
              label: "판매량",
              data: result.map(item => item.total_sales),
              backgroundColor: "rgba(54, 162, 235, 0.6)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
          ],
        });
      }
    };

    fetchData();
  }, [req]); // req 함수가 변경될 때만 실행

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>오류 발생: {error.message}</p>;

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <Bar
        data={chartData}
        options={{
          maintainAspectRatio: false, // 비율 유지 비활성화 (차트가 너무 작아지는 것 방지)
          responsive: true,
          scales: {
            y: {
              ticks: {
                beginAtZero: true, // Y축 값 0부터 시작
                stepSize: 1, // 정수 단위로 표시
              },
            },
          },
        }}
      />
    </div>
  );
};

export default TopSellingChart;
