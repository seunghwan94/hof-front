import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import NewUsersChart from "./layout/NewUserChart";
import SalesChart from "./layout/SalesChart";
import CategorySalesChart from "./layout/CategorySalesChart";
import TopSellingChart from "./layout/TopSellingChart";
import VendorRankingChart from "./layout/VendorRankingChart";
import ActivityChart from "./layout/ActivityChart";

function Home() {
  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4 fw-bold">대시보드</h2>
      <Row className="g-4">
        

      <Col xs={12} md={6} lg={4}>
          <Card className="p-3 shadow-lg border-0 rounded-3 h-100">
            <Card.Title className="text-center">카테고리별 판매</Card.Title>
            <CategorySalesChart />
          </Card>
        </Col>
        <Col xs={12} md={6} lg={4}>
          <Card className="p-3 shadow-lg border-0 rounded-3 h-100">
            <Card.Title className="text-center">방문자 수</Card.Title>
            <ActivityChart />
          </Card>
        </Col>



        <Col xs={12} md={6} lg={4}>
          <Card className="p-3 shadow-lg border-0 rounded-3 h-100">
            <Card.Title className="text-center">가장 많이 팔린 상품</Card.Title>
            <TopSellingChart />
          </Card>
        </Col>

        <Col xs={12} md={6} lg={4}>
          <Card className="p-3 shadow-lg border-0 rounded-3 h-100">
            <Card.Title className="text-center">업체 순위</Card.Title>
            <VendorRankingChart />
          </Card>
        </Col>
        <Col xs={12} md={6} lg={4}>
          <Card className="p-3 shadow-lg border-0 rounded-3 h-100">
            <Card.Title className="text-center">상품 판매량</Card.Title>
            <SalesChart />
          </Card>
        </Col>


        <Col xs={12} md={6} lg={4}>
          <Card className="p-3 shadow-lg border-0 rounded-3 h-100">
            <Card.Title className="text-center">신규 가입자</Card.Title>
            <NewUsersChart />
          </Card>
        </Col>

      </Row>
    </Container>
  );
}

export default Home;
