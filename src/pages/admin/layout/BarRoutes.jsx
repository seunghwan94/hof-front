import React, { useEffect, useState } from 'react';
import CategoryBar from '../CategoryBar';
import { useLocation, useNavigate, useRoutes } from 'react-router-dom';
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
import { elements } from 'chart.js';
import NotificationComponent from '../NotificationComponent';

const BarRoutes = () => {
  const location = useLocation(); 
  const [sidebarOpen,setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  // CategoryBar가 보일 경로 목록
  const routesConfig = [
    { path: "", element: <Home />  },
    { path: "dashboard", element: <Home />  },
    { path: "member", element: <Member />},
    { path: "prod" , element: <Prod/>},
    { path: "popup", element: <Popup/>},
    { path: "cash", element: <Cash/>},
    { path: "qna", element: <Qna/>},
    { path: "fwl", element: <FWL/>},
    { path: "notification", element: <NotificationComponent/>}
  ];

  // const isValidRoute = routesConfig.some(route => route.path === location.pathname);
  const isValidRoute = routesConfig.some(route => route.path === location.pathname.replace("/admin", ""));
  // routesConfig.some(route => console.log(route.path))
  const isNotFound = !isValidRoute; // 유효한 경로가 아니면 404
  const routes = useRoutes(routesConfig);
  // 현재 경로가 routesConfig에 포함되는지 확인
  const navigate = useNavigate();
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }
    const closeSidebar = () => {
      setSidebarOpen(false);
    };

    useEffect(() => {
      const memberData = localStorage.getItem("member");
      
      if (!memberData) {
        alert("로그인 후 이용해주세요.");
        navigate("/login", { replace: true }); 
        return;
      }
    
      try {
        const parsedMember = JSON.parse(memberData);
        if (parsedMember.role !== "admin") {
          alert("관리자만 접근 가능합니다.");
          navigate("/", { replace: true });
        }
      } catch (error) {
        console.error("❌ member 데이터 파싱 오류:", error);
        localStorage.removeItem("member"); // 잘못된 데이터 삭제
        navigate("/login", { replace: true });
      }
    }, [navigate]);



 useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth < 992);
  };

  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);

  return (
        <div className="d-flex" style={{ height: "100vh" }}>
         {/*햄버거 전용*/}
           <button className="hamburger-btn d-lg-none" onClick={toggleSidebar}>
            <FaBars size={24} />
          </button> 
       {/*  Offcanvas (부트스트랩 사이드바) */}
       <Offcanvas show={sidebarOpen} onHide={() => closeSidebar(false)} responsive="lg" className="bg-dark text-white d-lg-none"  backdrop={false} style={{width:268 } }>
        <Offcanvas.Header>
          <Offcanvas.Title>가구의집</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body style={{background:"#212529"}}>
          <CategoryBar closeSidebar={closeSidebar} />
        </Offcanvas.Body>
      </Offcanvas>

        <div style={{ flex: "0 0 250px", minWidth: "250px", background: "#f8f9fa" }} className={`d-none d-lg-block ${sidebarOpen ? 'd-none' : ''}` }>
          
          <CategoryBar closeSidebar={closeSidebar}/>
        </div>
  

      <div className={`content-container ${isMobile ? '' : 'ms-5'}`} style={{ flex: "1", padding: "20px", overflowX: "auto" }}>
        {routes}
      </div>
  
      </div>
  );
}

export default BarRoutes;
