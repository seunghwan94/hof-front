import React from "react";
import { Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faChair, faShirt, faShop, faToiletPortable, faBoxes } from "@fortawesome/free-solid-svg-icons";

function Category() {
  const categories = [
    { name: "침대", icon: faBed },
    { name: "의자", icon: faChair },
    { name: "책상", icon: faShop },
    { name: "수납장", icon: faToiletPortable },
    { name: "옷장", icon: faShirt },
    { name: "기타", icon: faBoxes },
  ];

  return (
    <>
      <h4>카테고리</h4>
      <Row className="justify-content-center">
        {categories.map((category, index) => (
          <Col key={index} xs={6} sm={4} md={3} lg={2} className="text-center p-4">
            <a href="/" className="text-hof d-flex flex-column align-items-center text-decoration-none">
              <FontAwesomeIcon 
                icon={category.icon} 
                className="mb-2" 
                style={{ fontSize: "2rem" }}
              />
              {category.name}
            </a>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Category;
