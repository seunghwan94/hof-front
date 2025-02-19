import React from "react";
// import { Card } from "react-bootstrap";


function Footer() {

  return (
    <>
      <hr className="w-100" style={{color:"black"}}/>
      <div className="container footer-content d-flex flex-column flex-md-row justify-content-around align-items-center text-light">
        
        {/* 회사 정보 */}
        <div className="footer-info text-center text-md-start" style={{color:"black"}}>
          <div className="mb-3">
            정의서 / WBS / ERD / 프로토타입 / PPT <br />
            Swagger / Jacoco /
          </div>
          <small>
            서울 구로구 디지털로 306 대륭포스트타워 2차 203호<br />
            대표번호: 010-xxxx-xxxx<br />
            Copyright ⓒ 2024 - 2024 dcinside. All rights reserved.
          </small>
        </div>

        {/* 앱 다운로드 아이콘 */}
        <div className="footer-icons d-flex gap-3">
            <img 
              src="https://hof-bucket.s3.ap-northeast-2.amazonaws.com/assets/github-icon.svg" 
              alt="앱 다운로드 아이콘" 
              className="footer-icon"
            />
          <img 
            src="https://hof-bucket.s3.ap-northeast-2.amazonaws.com/assets/google-icon.svg" 
            alt="앱 다운로드 아이콘" 
            className="footer-icon"
          />
          <img 
            src="https://hof-bucket.s3.ap-northeast-2.amazonaws.com/assets/kakao-icon.svg" 
            alt="앱 다운로드 아이콘" 
            className="footer-icon"
          />
        </div>

      </div>
    </>
  );
}

export default Footer;
