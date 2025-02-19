import React from "react";
import { useRoutes, useLocation } from "react-router-dom";
import Header from "./layout/Header";
import Intro from "./Intro";
import Shop from "./shop/Shop";
import ShopDetail from "./shop/ShopDetail"; // ✅ ShopDetail 추가
import Community from "./community/Community";
import Interior from "./Interior";
import NotFound from "../not-found/NotFound"; 
import Footer from "./layout/Footer";
import Pay from "./pay/Pay";
import PayInfo from "./pay/PayInfo";

function Index() {
  const location = useLocation(); // 현재 경로 가져오기

  const routesConfig = [
    { path: "/", element: <Intro /> },
    { path: "/Intro", element: <Intro /> },
    { path: "/shop", element: <Shop /> },
    { path: "/shop/detail/:id", element: <ShopDetail /> },
    { path: "/community", element: <Community /> },
    { path: "/Interior", element: <Interior /> },
    { path: "/Pay", element: <Pay /> },
    { path: "/PayInfo", element: <PayInfo /> },
  ];

  // `location.pathname`이 `routesConfig` 중 하나와 일치하는지 확인
  const isValidRoute = routesConfig.some(route => location.pathname.startsWith(route.path));
  
  // fullPage.js를 사용하는 페이지에서는 헤더를 고정
  const isFullPageView = ["/", "/Intro"].includes(location.pathname);

  // `useRoutes`를 사용하여 라우트 설정
  const routes = useRoutes([...routesConfig, { path: "*", element: <NotFound /> }]);
  
  return (
    <>
      {!!isValidRoute && <Header fixed={isFullPageView}/>}
      {routes}
      {!!isValidRoute &&    
        <div className="footer" style={{ background: "white" }}><Footer /></div>
      }
    </>
  );
}

export default Index;
