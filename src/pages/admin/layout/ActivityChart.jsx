import React, { useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import { Line } from "react-chartjs-2";

const ActivityChart = () => {
  const { req } = useAxios();
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    req("GET", "admin/visit/stats")
      .then((response) => {
        if (response) {
          const labels = Object.keys(response); // 날짜 리스트
          const membersPC = [];
          const membersMobile = [];
          const guestsPC = [];
          const guestsMobile = [];
          const formattedLabels = labels.map(date => {
            const parsedDate = new Date(date);
            return parsedDate.toLocaleDateString("ko-KR", {

              month: "long",
              day: "numeric",
              weekday: "short" // "월" (월요일) 추가
            }).replace(/\.$/, ""); // 일부 브라우저에서 마지막 마침표 제거
          });
          
          labels.forEach(date => {
            const data = response[date];
            membersPC.push(data?.회원?.PC || 0);
            membersMobile.push(data?.회원?.모바일 || 0);
            guestsPC.push(data?.비회원?.PC || 0);
            guestsMobile.push(data?.비회원?.모바일 || 0);
          });

          setChartData({
            labels: formattedLabels,
            datasets: [
              { label: "회원 (PC)", data: membersPC, borderColor: "blue", backgroundColor: "lightblue", fill: true },
              { label: "회원 (모바일)", data: membersMobile, borderColor: "orange", backgroundColor: "lightorange", fill: true },
              { label: "비회원 (PC)", data: guestsPC, borderColor: "green", backgroundColor: "lightgreen", fill: true },
              { label: "비회원 (모바일)", data: guestsMobile, borderColor: "red", backgroundColor: "pink", fill: true }
            ],
          });
        }
      })
      .catch((error) => console.error("방문자 데이터 불러오기 실패:", error));
  }, []);

  return <Line data={chartData} />;
};

export default ActivityChart;
