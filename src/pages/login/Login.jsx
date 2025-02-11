import React from "react";
import LoginInput from "./LoginInput";
import LoginLeft from "./LoginLeft";

function Login(){

  return (   
    <div className="d-flex" style={{alignItems: "center", justifyContent: "space-around", height: "100vh"}}>      
      <div >
        <LoginLeft />
      </div>
      <div >
        <LoginInput />
      </div>
    </div>
  );
}





export default Login;