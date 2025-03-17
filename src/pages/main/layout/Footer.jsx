import React from "react";
import "../../../styles/footer.scss";


function Footer() {
  // 환경에 따라 Swagger URL 결정
  const swaggerUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:8080/api/v1/swagger-ui/index.html"
      : "/api/v1/swagger-ui/index.html";


  return (
    <>
      <hr className="w-100" style={{ color: "black" }} />
      <div className="container footer-content d-flex flex-column flex-md-row justify-content-around align-items-center text-light">
        
        {/* 회사 정보 */}
        <div className="footer-info text-center text-md-start" style={{ color: "black" }}>
          <div className="mb-3">
            {/* 파일 다운로드 링크 */}
            <a href="https://hof-bucket.s3.ap-northeast-2.amazonaws.com/assets/%EC%A0%95%EC%9D%98%EC%84%9C.xlsx" download="정의서.xlsx" target="_blank" rel="noopener noreferrer">정의서</a> /{" "}
            <a href="https://hof-bucket.s3.ap-northeast-2.amazonaws.com/assets/WBS.xlsx" download="WBS.xlsx" target="_blank" rel="noopener noreferrer">WBS</a> /{" "}
            <a href="https://hof-bucket.s3.ap-northeast-2.amazonaws.com/assets/ERD.xlsx" download="ERD.xlsx" target="_blank" rel="noopener noreferrer">ERD</a> /{" "}
            <a href="https://youtu.be/X1xhnW_Am7w" target="_blank" rel="noopener noreferrer">Prototype</a> /{" "}
            <a href="https://docs.google.com/presentation/d/106Bbp9wGKJkDONSXwj8kMHOLIopljb1A/edit?usp=sharing&ouid=104512884664028305458&rtpof=true&sd=true" target="_blank" rel="noopener noreferrer">PPT(발표자료)</a> /{" "}<br />
            {/* 환경에 따라 Swagger URL 변경 */}
            <a href={swaggerUrl} target="_blank" rel="noopener noreferrer">Swagger</a> /{" "}
            <a href="https://hof.lshwan.com/jacoco/index.html" target="_blank" rel="noopener noreferrer"> Jacoco</a> / 
            <a href="https://github.com/seunghwan94" target="_blank" rel="noopener noreferrer"> GitHub </a>[
            <a href="https://github.com/seunghwan94/hof-front" target="_blank" rel="noopener noreferrer"> Front </a>|
            <a href="https://github.com/seunghwan94/hof-back" target="_blank" rel="noopener noreferrer"> Back </a>]<br />
          </div>
          <small>
            서울 구로구 디지털로 306 대륭포스트타워 2차 203호<br />
            대표번호: 010-xxxx-xxxx<br />
            Copyright ⓒ 2024 - 2024 dcinside. All rights reserved.
          </small>
        </div>

        {/* 앱 다운로드 아이콘 */}
        <div className="footer-icons d-flex gap-3">
          {/* GitHub 링크 */}
          <a href="https://github.com/seunghwan94" target="_blank" rel="noopener noreferrer">
            <img 
              src="https://hof-bucket.s3.ap-northeast-2.amazonaws.com/assets/github-icon.svg" 
              alt="GitHub 아이콘" 
              className="footer-icon"
            />
          </a>

          {/* Gmail 링크 */}
          <a href="mailto:seunghwan94.dev@gmail.com">
            <img 
              src="https://hof-bucket.s3.ap-northeast-2.amazonaws.com/assets/Gmail_icon.svg" 
              alt="Gmail 아이콘" 
              className="footer-icon"
            />
          </a>
          <a href="https://hof-bucket.s3.ap-northeast-2.amazonaws.com/assets/app-release.apk">
            <img 
              src="https://hof-bucket.s3.ap-northeast-2.amazonaws.com/assets/AppLogo2.png" 
              alt="Hof 아이콘" 
              className="footer-icon"
            />
          </a>
        </div>

      </div>
    </>
  );
}

export default Footer;
