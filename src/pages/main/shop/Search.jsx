import React from "react";
import { Container, Form, InputGroup, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function Category() {
  return (
    <Container className="p-4">
      <Form>
        <Form.Group>
          <InputGroup>
            <Form.Select className="custom-width">
              <option>- 선택 -</option>
              <option value="bed">침대</option>
              <option value="chair">의자</option>
              <option value="shirt">의류</option>
              <option value="toilet">욕실</option>
              <option value="storage">수납</option>
            </Form.Select>

            <Form.Control type="text" placeholder="검색할 키워드를 입력하세요" />

            <Button className="btn-hof">
              <FontAwesomeIcon icon={faSearch} />
            </Button>
            
          </InputGroup>
        </Form.Group>
      </Form>
    </Container>
  );
}

export default Category;
