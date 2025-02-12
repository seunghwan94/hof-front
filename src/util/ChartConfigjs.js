import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";

// ✅ Chart.js 전역 등록
ChartJS.register(
  CategoryScale, // 🟢 X축 (category scale) 추가!
  LinearScale,   // Y축
  PointElement,  // 포인트 요소 (LineChart)
  LineElement,   // 라인 요소 (LineChart)
  BarElement,    // 막대 요소 (BarChart)
  ArcElement,    // 도넛/파이 차트 요소
  Title, 
  Tooltip, 
  Legend
);