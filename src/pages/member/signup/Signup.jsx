import React, { useState } from "react";
import SignupTerms from "./SignupTerms";
import LoginLeft from "../login/LoginLeft";
import SignupForm from "./SignupForm";

function Signup(){
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  const handleSignupNext = () => {
    setIsTermsAccepted(true);
  };

  return (
    <div style={{position: "relative", width: "100%", height: "100vh" }}>
      <div style={{position: "absolute", backgroundSize: "cover", zIndex: "-1", top:"0",left:"0",right:"0",bottom:"0", border: "soild 2px #fff", backgroundColor: "#fff", opacity: "30%"}}/>
      <div style={{position: "absolute" , backgroundImage: "url('https://hof-bucket.s3.ap-northeast-2.amazonaws.com/assets/intro.png')", backgroundSize: "cover", filter: "blur(5px)", zIndex: "-2", top:"0",left:"0",right:"0",bottom:"0"}}/>

      <div className="d-flex" style={{ alignItems: "center", justifyContent: "center", gap: "11rem", height: "100vh" }}>      

        <div style={{ flexShrink: 0, width: "800px", minHeight: "190px" }}>
          <LoginLeft />
        </div>
        <div style={{ flexShrink: 0, width: "700px", minHeight: "500px" }}>
          {/* <SignupTerms /> */}
          {isTermsAccepted ? <SignupForm /> : <SignupTerms onNext={handleSignupNext} />}
        </div>
      </div>
    </div>  
  );
}



export default Signup;