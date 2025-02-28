import React, { useState } from "react";
import { Container, Form, InputGroup, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import useAxios from "../../hooks/useAxios";

function MemberSearch({ onSearchResults }) {
  const { req } = useAxios();
  const [searchType, setSearchType] = useState("id"); // 기본값: ID 검색
  const [keyword, setKeyword] = useState("");

  

  // 검색 실행 함수
  const handleSearch = async () => {
    if (!keyword.trim()) {
      alert("검색어를 입력하세요.");
      return;
    }

    // 검색 컬럼 설정
    let searchColumns = [];
    if (searchType === "id") {
      searchColumns = ["id"];
    } else if (searchType === "name") {
      searchColumns = ["name"];
    } else {
      searchColumns = ["id", "name"]; // ID + 이름 검색
    }

    const requestData = {
      tableName: "tbl_member", // 회원 테이블
      keyword: keyword,
      searchColumns: searchColumns, // 선택된 검색 컬럼
      sortColumn: "reg_date", // 최신 등록 순 정렬
      sortOrder: "DESC",
    };

    const res = await req("post", "search", requestData);

    if (res) {
      console.log("🔹 검색 결과:", res);
      onSearchResults(res); // 🔹 부모 컴포넌트로 검색 결과 전달
    }
    // 🔹 Enter 키 입력 시 검색 실행

  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // 기본 폼 제출 방지
      handleSearch();
    }
  };

  return (
    <Container className="p-4">
      <Form onSubmit={(e) => e.preventDefault()}>
        <Form.Group>
          <InputGroup>
            {/* 검색 기준 선택 */}
            <Form.Select
              className="custom-width"
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
            >
              <option value="id">ID 검색</option>
              <option value="name">이름 검색</option>
              <option value="id+name">ID + 이름 검색</option>
            </Form.Select>

            {/* 검색어 입력 */}
            <Form.Control
              type="text"
              placeholder="검색할 키워드를 입력하세요"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={handleKeyPress}
            />

            {/* 검색 버튼 */}
            <Button className="btn-hof" onClick={handleSearch}>
              <FontAwesomeIcon icon={faSearch} />
            </Button>
          </InputGroup>
        </Form.Group>
      </Form>
    </Container>
  );
}

export default MemberSearch;
