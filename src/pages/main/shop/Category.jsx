import React from "react";
import { Col, Container, Row } from "react-bootstrap";
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
      <Container className="mt-1">
        <h4>카테고리</h4>
        <Row className="justify-content-center pt-3"> {/* ✅ Row도 중앙 정렬 */}
          {categories.map((category, index) => (
            <Col key={index} xs={6} sm={4} md={3} lg={2} className="text-center">
              <a href="#" className="text-hof d-flex flex-column align-items-center text-decoration-none">
                <FontAwesomeIcon 
                  icon={category.icon} 
                  className="mb-2" 
                  style={{ fontSize: "2rem" }} // ✅ 크기 조절
                />
                {category.name}
              </a>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default Category;
