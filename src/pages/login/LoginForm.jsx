import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Logo from "../../components/layout/Logo";
import useAxios from "../../hooks/useAxios";
import { useNavigate } from "react-router-dom";

function LoginForm(){
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const { data, loading, error, req } = useAxios();

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    req("POST", "login", { username: id, password });
  };

  // 로그인 성공 시 accessToken 저장 및 페이지 이동
  useEffect(() => {
    if (data?.accessToken) {
      localStorage.setItem("jwt", data.accessToken);
      console.log("로그인 후 생성된 토큰", data);
      navigate("/");
    }
  }, [data]);
  

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
            <button className="btn btn-hof w-100 my-3 py-2" disabled={loading}>{loading ? "로그인 중" : "로그인"}</button>
            {error && <p style={{ fontSize: "0.9rem", color: "red", textAlign: "center" }}>아이디 또는 비밀번호가 잘못 되었습니다.</p>}
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