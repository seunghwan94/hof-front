import React from 'react';
import LoginLeft from './LoginLeft';
import LoginForm from './LoginForm';
import '../../../styles/login/login.scss';

function Login() {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {/* 흐림 효과 추가 */}
      <div
        style={{
          position: "absolute",
          backgroundSize: "cover",
          zIndex: "-1",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          border: "solid 2px #fff",
          backgroundColor: "#fff",
          opacity: "30%",
        }}
      />
      {/* 배경 이미지 추가 */}
      <div
        style={{
          position: "absolute",
          backgroundImage:
            "url('https://hof-bucket.s3.ap-northeast-2.amazonaws.com/assets/intro.png')",
          backgroundSize: "cover", // 화면에 맞춰 자동 크기 조정
          backgroundPosition: "center center", // 중앙 정렬
          filter: "blur(5px)",
          zIndex: "-2",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          minHeight: "100vh", // 배경이 최소한 화면 크기만큼 차지하도록 설정
          backgroundAttachment: "fixed", // 스크롤에 배경이 고정되도록 설정
        }}
      />

      <div
        className="d-flex flex-column flex-lg-row"
        style={{
          alignItems: "center",
          justifyContent: "center",
          gap: "10vw", // 비율로 gap 설정
          minHeight: "100vh", // 최소 높이 설정
          flexDirection: "row",
          overflow: "auto", // 스크롤 허용
        }}
      >
        {/* Left Content */}
        <div
          style={{
            flexShrink: 0,
            width: "100%",
            maxWidth: "800px", // 고정 크기
            textAlign: "left",
            padding: "0rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LoginLeft />
        </div>

        {/* Login Form */}
        <div
          style={{
            flexShrink: 0,
            width: "100%",
            maxWidth: "395px", // 고정 크기
            minHeight: "450px", // 최소 높이
            height: "auto", // 높이 자동 조정
          }}
        >
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default Login;










// import React from "react";
// import LoginForm from "./LoginForm";
// import LoginLeft from "./LoginLeft";

// function Login(){

//   return (
//     <div style={{position: "relative", width: "100%", height: "100vh" }}>
//       <div style={{position: "absolute", backgroundSize: "cover", zIndex: "-1", top:"0",left:"0",right:"0",bottom:"0", border: "soild 2px #fff", backgroundColor: "#fff", opacity: "30%"}}/>
//       <div style={{position: "absolute" , backgroundImage: "url('https://hof-bucket.s3.ap-northeast-2.amazonaws.com/assets/intro.png')", backgroundSize: "cover", filter: "blur(5px)", zIndex: "-2", top:"0",left:"0",right:"0",bottom:"0"}}/>

//       <div className="d-flex" style={{ alignItems: "center", justifyContent: "center", gap: "11rem", height: "100vh" }}>      

//         <div style={{ flexShrink: 0, width: "800px", minHeight: "190px" }}>
//           <LoginLeft />
//         </div>
//         <div style={{ flexShrink: 0, width: "700px", minHeight: "500px" }}>
//           <LoginForm />
//         </div>
//       </div>
//     </div>   
//   );
// }

// export default Login;