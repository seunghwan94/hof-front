# House Of Furniture (가구의 집)  
> [BackEnd Repository 바로가기](https://github.com/seunghwan94/hof-back)

**팀명**: 우아한 3형제 (이승환, 함형준, 김용태)  
**서비스 종류**: 인테리어 소품 판매 및 시공업체 소개  
**서비스 설명**: 다양한 인테리어 소품 판매와 여러 인테리어 시공업체를 소개해주는 시스템  
**프로젝트 일정**: 2025.01.31 - 2025.03.06  

---

![Project Image](https://github.com/user-attachments/assets/ebc1c1b9-b5dd-498d-a3ca-e9e7c1213475)

---

## 프로젝트 개요  
House Of Furniture는 인테리어 제품을 판매하고, 인테리어 시공업체를 소개하는 서비스입니다.  
참고 서비스: **이케아, 오늘의 집, 홈스타일러**  

### **주요 기능**  
- **인테리어 소품 판매**: 다양한 인테리어 소품을 추천 및 판매  
- **시공업체 소개**: 여러 인테리어 시공업체를 소개  
- **커뮤니티 기능**: 게시판, 댓글, 좋아요 기능  
- **결제 시스템**: IAMPORT 결제 시스템 연동  

---

## 기술 스택  

### **Frontend**  
- **React** (Yarn, Bootstrap SCSS, Axios, Debounce)  

### **Backend**  
- **Spring Boot**  
  - 데이터 관리: JPA, MyBatis  
  - 보안: Security (OAuth2, Starter Mail)  
  - API 문서화: Swagger  
  - 테스트 및 코드 커버리지: Jacoco  
  - 비동기 요청: WebClient, WebSocket  
  - 이미지 분석: Vision API  
  - 웹 자동화 및 크롤링: Selenium  

- **Database**  
  - **MariaDB (RDS)** → 주요 서비스 데이터 저장  
  - **MongoDB (EC2)** → 검색 기록 및 비정형 데이터 저장  

### **DevOps**  
- **CI/CD**: GitHub Actions, Docker, AWS (EC2, S3, RDS)  
- **보안**: Reverse Proxy (Nginx), SSL, Cloudflare (DNS 연결)  
- **모니터링**: Prometheus, Grafana  
- **배포 알림**: Discord  

---

## CI/CD 및 배포 구조  

**GitHub Actions 실행 내역**: [GitHub Actions](https://github.com/seunghwan94/hof-back/actions)  

### **배포 방식**  
- **Git Branch 이원관리** (Merge Commit 이력 보존)  
- `master` 브랜치에 push 시 자동 배포  
  - Docker 이미지 빌드 및 Docker Hub에 배포 (**Docker Compose 미사용**)  
  - **Discord 연동** → 배포 성공/실패 알림  

### **서버 구성**  
#### **EC2 (Ubuntu)**
- **Nginx**로 Reverse Proxy 설정  
- **Cloudflare**를 이용한 도메인 연결  
- **SSL 적용** (Backend, Frontend, Prometheus, Grafana)  

#### **S3 (AWS)**
- 이미지 및 파일 저장소  

#### **RDS (AWS)**
- **MariaDB** 사용  
- 보안을 위해 **퍼블릭 액세스 차단**, EC2에서만 접근 가능  

---

## **설치 및 실행 방법**  

### **백엔드 실행**  
```bash
# 프로젝트 클론
git clone https://github.com/seunghwan94/hof-back.git
cd hof-back

# 실행 (Spring Boot)
./gradlew bootRun
```

### **프론트엔드 실행**
```
git clone https://github.com/seunghwan94/hof-front.git
cd hof-front

# 실행 (React)
yarn install
yarn start
```

### **Docker 기반 배포 (서버 환경)**
```
# Docker 이미지 빌드
docker build -t hof-backend .

# 컨테이너 실행
docker run -d -p 8080:8080 --name hof-backend hof-backend
```

### **GitHub Actions - Secrets & Variables**
프로젝트 보안을 위해 GitHub Actions에서 아래 변수들을 관리
|Name|Description
|------|---|
|AWS_ACCESS_KEY_ID|AWS 접근 키|
|AWS_REGION|	AWS 리전|
|AWS_S3_BUCKET_NAME|	S3 버킷 이름|
|AWS_SECRET_ACCESS_KEY|	AWS 비밀 접근 키|
|DB_PASSWORD|	데이터베이스 비밀번호|
|DB_URL|	데이터베이스 연결 URL|
|DB_USERNAME|	데이터베이스 사용자명|
|DOCKER_HUB_TOKEN|	Docker Hub 토큰|
|DOCKER_PASSWORD|	Docker 비밀번호|
|DOCKER_USERNAME|	Docker 사용자명|
|EC2_PUBLIC_IP|	EC2 퍼블릭 IP|
|EC2_SSH_PRIVATE_KEY|	EC2 SSH 개인 키|
|EC2_USERNAME|	EC2 사용자명|
|GOOGLE_CLIENT_EMAIL|	Google API 클라이언트 이메일|
|GOOGLE_CLIENT_ID|	Google 클라이언트 ID|
|GOOGLE_OAUTH_CLIENT_ID|	Google OAuth 클라이언트 ID|
|GOOGLE_OAUTH_CLIENT_SECRET|	Google OAuth 비밀 키|
|GOOGLE_PRIVATE_KEY|	Google API 개인 키|
|GOOGLE_PRIVATE_KEY_ID|	Google 개인 키 ID|
|GOOGLE_PROJECT_ID|	Google 프로젝트 ID|
|IAMPORT_API_KEY|	IAMPORT 결제 API 키|
|IAMPORT_API_SECRET|	IAMPORT 결제 API 비밀 키|
|MONGO_URL|	MongoDB 연결 URL|
|MONGO_USERNAME|	MongoDB 사용자명|

### **API 문서 & 시스템 설계**
[요구 사항 정의서](https://hof-bucket.s3.ap-northeast-2.amazonaws.com/assets/%EC%A0%95%EC%9D%98%EC%84%9C.xlsx) / 
[WBS](https://hof-bucket.s3.ap-northeast-2.amazonaws.com/assets/WBS.xlsx) / 
[ERD](https://hof-bucket.s3.ap-northeast-2.amazonaws.com/assets/ERD.xlsx) /
[RESTful API 문서(Swagger)](http://hof.lshwan.com/api/v1/swagger-ui/index.html) /
[Java Code Coverage(Jacoco)](https://hof.lshwan.com/jacoco/index.html) / 
[Paper Prototype]() /
[PPT(발표자료)]()
