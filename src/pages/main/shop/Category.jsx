import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faChair, faShirt, faShop, faToiletPortable, faBoxes } from "@fortawesome/free-solid-svg-icons";

function Category() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const currentCategory = queryParams.get("category");

  const categories = [
    { name: "침대", query: "bed", icon: faBed },
    { name: "의자", query: "chair", icon: faChair },
    { name: "책상", query: "desk", icon: faShop },
    { name: "수납장", query: "storage", icon: faToiletPortable },
    { name: "옷장", query: "wardrobe", icon: faShirt },
    { name: "기타", query: "other", icon: faBoxes },
  ];

  const handleCategoryClick = (categoryQuery) => {
    queryParams.set("category", categoryQuery);
    navigate(`/shop?${queryParams.toString()}`, { replace: true });
  };

  return (
    <>
      <h4>카테고리</h4>
      <Row className="justify-content-center">
        {categories.map((category, index) => {
          const isActive = currentCategory === category.query;

          return (
            <Col key={index} xs={6} sm={4} md={3} lg={2} className="text-center p-4 d-flex justify-content-center">
              <button
                className={`category-button text-hof d-flex flex-column align-items-center text-decoration-none ${
                  isActive ? "active-category" : ""
                }`}
                onClick={() => handleCategoryClick(category.query)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "0",
                }}
              >
                <FontAwesomeIcon
                  icon={category.icon}
                  className="mb-2"
                  style={{ fontSize: "2rem" }}
                />
                {category.name}
              </button>
            </Col>
          );
        })}
      </Row>
    </>
  );
}

export default Category;
