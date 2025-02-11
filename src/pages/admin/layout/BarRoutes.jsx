// import React from 'react';
// import CategoryBar from '../CategoryBar';
// import { useLocation } from 'react-router-dom';

// const BarRoutes = () => {
//   const location = useLocation(); 

//   // CategoryBar가 보일 경로 목록
//   const routesConfig = [
//     { path: "/dashboard" },
//     { path: "/member" },
//     { path: "/prod" },
//     { path: "/popup" },
//     { path: "/cash" },
//     { path: "/qna" },
//     { path: "/fwl" }
//   ];

//   // 현재 경로가 routesConfig에 포함되는지 확인
//   const isValidRoute = routesConfig.some(route => location.pathname.startsWith(route.path));
  
//   return (
//     <>
//       {isValidRoute && <CategoryBar />}
//     </>
//   );
// }

// export default BarRoutes;
