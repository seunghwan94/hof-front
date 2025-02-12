import React, { useState } from "react";
import { Form } from "react-bootstrap";
import axios from 'axios';
import Logo from "../../components/layout/Logo";

function LoginForm(){
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  // const [data, loading, error, req] = useAxios("http://localhost:8080/api/")
  // const {login} = useAuth();

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const resp = await axios.post("http://localhost:8080/login",{username:id,password:password});
      if (resp.data.success){
      // if (resp.status === 200){
        window.location.href = "/intro";
      } else {
        alert("정보가 틀렸습니다")
      }
    }
    catch(error) {
      console.log("로그인 실패", error);
    }
  }

  const socialLogins = [
    { platform: "구글", icon: "google-icon.svg" },
    { platform: "깃허브", icon: "github-icon.svg" },
    { platform: "카카오", icon: "kakao-icon.svg" },
    { platform: "네이버", icon: "naver_icon.svg" }
  ]

  return (    

    <form onSubmit={handleSubmit}>
      <div>
        <div className="py-5" style={{border: "solid 2px #fff", backgroundColor: "#fff", borderRadius:"25px" , padding: "35px 25px", width:"60%"}}>
        {/* <div className="py-5" style={{padding: "35px 25px", width:"60%"}}> */}
          <div className="mt-2 mb-5" style={{textAlign: "center"}}>
            <Logo />
          </div>
          <div>
            <Form.Control className="mt-1 py-2" type="text" id="id" name="id" value={id} onChange={e => setId(e.target.value)} placeholder="아이디" />
          </div>
          <div>
            <Form.Control className="mt-1 py-2" type="password" id="password" name="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="비밀번호" />
          </div>
          <div className="mb-4">
            <button className="btn btn-hof w-100 my-3 py-2" >로그인</button>
            <div className="d-flex" style={{justifyContent: "space-between", alignItems: "center"}}>
              <div className="d-flex ps-1 pe-2" style={{alignItems: "center"}}>
                <input type="checkbox" className="checkbox-hof me-1"/>
                <label>자동로그인</label>
              </div>
              <div className="pe-1">
                <a href="#" className="px-2 text-hof" style={{textDecoration: "none"}}>아이디찾기/비밀번호변경</a>
                <a href="#" className="text-hof" style={{textDecoration: "none"}}>회원가입</a>
              </div>
            </div>
          </div>
          
          <hr/>

          <div className="mt-4">
            {socialLogins.map((login, index) => (
              <button key={index} className="btn btn-outline-hof w-100 mt-2">               
              <img src={`https://hof-bucket.s3.ap-northeast-2.amazonaws.com/assets/${login.icon}`} style={{width: "23px", marginRight: "10px"}} />{login.platform}로 로그인</button>
            ))}
          </div>                            
        </div>
      </div>

    </form>

  );
}





export default LoginForm;