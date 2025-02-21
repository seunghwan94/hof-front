import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Container, Row, Col } from "react-bootstrap";
import "../../../styles/myinfo/myinfo.scss";

function Myinfo() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // 화면 크기 변경 감지
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {isMobile ? (
        // 모바일 레이아웃 (Container 제거)
        <div className="myinfo-mobile">
          <Sidebar/>
          <div className="main-content">
            <Outlet />
          </div>
        </div>
      ) : (
        // 데스크탑 레이아웃 (Container 사용)
        <Container>
          <Row className="myinfo-row">
            <Col md={2} className="sidebar-col">
              <Sidebar />
            </Col>
            <Col md={10} className="content-col">
              <Outlet />
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}

export default Myinfo;
