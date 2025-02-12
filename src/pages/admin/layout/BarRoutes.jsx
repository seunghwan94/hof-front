import React, { useState } from 'react';
import CategoryBar from '../CategoryBar';
import { useLocation, useRoutes } from 'react-router-dom';
import Home from "../Home";
import Member from "../Member";
import Prod from "../Prod";
import Popup from "../Popup";
import Cash from "../Cash";
import Qna from "../Qna";
import FWL from "../FWL";
import { FaBars } from 'react-icons/fa';
import { Offcanvas } from 'react-bootstrap';
import { width } from '@fortawesome/free-solid-svg-icons/faStar';

const BarRoutes = () => {
  const location = useLocation(); 
  const [sidebarOpen,setSidebarOpen] = useState(false);
  // CategoryBar가 보일 경로 목록
  const routesConfig = [
    { path: "dashboard", element: <Home />  },
    { path: "member", element: <Member />},
    { path: "prod" , element: <Prod/>},
    { path: "popup", element: <Popup/>},
    { path: "cash", element: <Cash/>},
    { path: "qna", element: <Qna/>},
    { path: "fwl", element: <FWL/>}
  ];

  // const isValidRoute = routesConfig.some(route => route.path === location.pathname);
  const isValidRoute = routesConfig.some(route => route.path === location.pathname.replace("/admin", ""));
  // routesConfig.some(route => console.log(route.path))
  const isNotFound = !isValidRoute; // 유효한 경로가 아니면 404
  const routes = useRoutes(routesConfig);
  // 현재 경로가 routesConfig에 포함되는지 확인

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }
    const closeSidebar = () => {
      setSidebarOpen(false);
    };
  
  return (
        <div className="d-flex" style={{ height: "100vh" }}>
         {/*햄버거 전용*/}
           <button className="hamburger-btn d-lg-none" onClick={toggleSidebar}>
            <FaBars size={24} />
          </button> 
       {/* ✅ Offcanvas (부트스트랩 사이드바) */}
       <Offcanvas show={sidebarOpen} onHide={() => closeSidebar(false)} responsive="lg" className="bg-dark text-white d-lg-none"  backdrop={false} style={{width:268 } }>
        <Offcanvas.Header>
          <Offcanvas.Title>가구의집</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body style={{background:"#212529"}}>
          <CategoryBar />
        </Offcanvas.Body>
      </Offcanvas>

        <div style={{ flex: "0 0 250px", minWidth: "250px", background: "#f8f9fa" }} className={`d-none d-lg-block ${sidebarOpen ? 'd-none' : ''}` }>
          
          <CategoryBar />
        </div>
  
        <div className="ms-5 " style={{ flex: "1", padding: "20px", overflowX: "auto" }}>
          {routes}
        </div>
  
      </div>
  );
}

export default BarRoutes;
