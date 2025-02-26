import React from "react";

function LoginLeft() {
  return (
    <div className="login-left">
      <h1>House of Furniture</h1>
      <h3>가구의 집에서 여러분만의 인테리어 소품을 찾아보세요</h3>
      <div className="mt-5">
        <img
          src="https://hof-bucket.s3.ap-northeast-2.amazonaws.com/assets/github-icon.svg"
          style={{ width: "50px", marginRight: "10px" }}
          alt="이미지"
        />
      </div>
    </div>
  );
}

export default LoginLeft;








// import React from "react";

// function LoginLeft(){

//   return (    

//     <form>
//         <div style={{}}>
//           <h1 style={{ fontSize: "5rem", fontWeight: "bold", color:"#222"}}>House of Furniture</h1>
//           <h3>가구의 집에서 여러분만의 인테리어 소품을 찾아보세요</h3>
//         </div>
//         {/* <hr style={{border: "0", height: "3px", background: "#000"}}/> */}
//         <div className="mt-5">
//           <img src="https://hof-bucket.s3.ap-northeast-2.amazonaws.com/assets/github-icon.svg" style={{width: "50px", marginRight: "10px"}} alt="이미지"/>
//         </div>
//     </form>

//   );
// }

// export default LoginLeft;