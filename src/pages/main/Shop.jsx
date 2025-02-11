import React from "react";
import { Col, Container, Row } from "react-bootstrap";

function Shop(){
  const categories = ["침대", "의자", "책상", "수납장", "옷장", "기타"];

  return (
    <div className="container mt-4 pt-5">
      <h1 className="text-center">Shop index</h1>
      <Container>
        <Row className="justify-content-center">
          {categories.map((category, index) => (
            <Col key={index} className="text-center">{category}</Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Shop;