import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Container, Row, Col, Card } from "react-bootstrap";
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
    <Container className=" mt-5 d-flex justify-content-center">
      {isMobile ? (
        // 📌 모바일 레이아웃 (위쪽 Sidebar + 아래 Content)
        <div className="myinfo-mobile">
          <Sidebar />
          <div className="myinfo-content">
            <Outlet />
          </div>
        </div>
      ) : (
        // 📌 데스크탑 레이아웃 (좌측 Sidebar + 우측 Content)
        <Container fluid className="myinfo-desktop">
          <Row className="myinfo-row">
            <Col md={3} className="sidebar-col">
              <Sidebar />
            </Col>
            <Col md={9} className="content-col">
              <Outlet />
            </Col>
          </Row>
        </Container>
      )}
    </Container>
  );
}

export default Myinfo;
