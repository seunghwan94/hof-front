import React from "react";
import { useRoutes, useLocation } from "react-router-dom";
import Header from "./Header";
import Intro from "../Intro";
import Shop from "../shop/Shop";
import Community from "../Community";
import Interior from "../Interior";
import NotFound from "../../not-found/NotFound"; 

function Index() {
  const location = useLocation(); // 현재 경로 가져오기

  const routesConfig = [
    { path: "/", element: <Intro /> },
    { path: "/Intro", element: <Intro /> },
    { path: "/shop", element: <Shop /> },
    { path: "/community", element: <Community /> },
    { path: "/Interior", element: <Interior /> },
  ];

  const isValidRoute = routesConfig.some(route => route.path === location.pathname);
  const isNotFound = !isValidRoute; // 유효한 경로가 아니면 404

  const routes = useRoutes([...routesConfig, { path: "*", element: <NotFound /> }]);
  return (
    <>
      {!isNotFound && <Header fixed={location.pathname === "/" || location.pathname === "/Intro"} />}   
      {routes}
    </>
  );
}

export default Index;
