import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";
import Logo from "../../../components/layout/Logo";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

function LoginForm() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
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
      localStorage.setItem("member", JSON.stringify(data.member));
      const role = data.member?.role;

      if (role === "admin" || role === "master") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
  }, [data, navigate]);


    // const handleGoogleSuccess = (response) => {
    //   console.log("구글 로그인 성공", response);
    //   const token = response.credential; // Google로부터 받은 JWT token
    //   localStorage.setItem("jwt", token);
    //   // 이후 사용자 정보 저장 및 리디렉션 처리
    // };
  
    // const handleGoogleFailure = (error) => {
    //   console.error("구글 로그인 실패", error);
    // };

  const socialLogins = [
    { platform: "구글", icon: "google-icon.svg", loginType: "google" },
    { platform: "깃허브", icon: "github-icon.svg" },
    { platform: "카카오", icon: "kakao-icon.svg" },
    { platform: "네이버", icon: "naver_icon.svg" },
  ];


  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div
          className="py-5"
          style={{
            border: "solid 2px #fff", backgroundColor: "#fff", borderRadius: "25px", padding: "35px 25px", width: "100%",
          }}
        >
          <div className="mt-2 mb-5" style={{ textAlign: "center" }}>
            <Link to="/" className="text-hof" style={{ textDecoration: "none" }}>
              <Logo />
            </Link>
          </div>
          <div>
            <Form.Control
              className="mt-1 py-2"
              type="text"
              id="id"
              name="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="아이디"
            />
          </div>
          <div>
            <Form.Control
              className="mt-1 py-2"
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호"
            />
          </div>
          <div className="mb-4">
            <button
              className="btn btn-hof w-100 my-3 py-2"
              disabled={loading}
            >
              {loading ? "로그인 중" : "로그인"}
            </button>
            {error && (
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "red",
                  textAlign: "center",
                }}
              >
                아이디 또는 비밀번호가 잘못 되었습니다.
              </p>
            )}
            <div
              className="d-flex"
              style={{ justifyContent: "space-between", alignItems: "center" }}
            >
              <div className="d-flex ps-1 pe-2" style={{ alignItems: "center" }}>
                <input type="checkbox" className="checkbox-hof me-1" />
                <label style={{fontSize: "0.9rem"}}>자동로그인</label>
              </div>
              <div className="pe-1">
                <Link
                  to="/signup"
                  className="text-hof me-1"
                  style={{ textDecoration: "none", fontSize: "0.9rem" }}
                >
                  아이디찾기/비밀번호변경
                </Link>
                <Link
                  to="/signup"
                  className="text-hof"
                  style={{ textDecoration: "none", fontSize: "0.9rem" }}
                >
                  회원가입
                </Link>
              </div>
            </div>
          </div>

          <hr />

          <div className="mt-4">
          {/* <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleFailure}/> */}
            {socialLogins.map((login, index) => (
              <button key={index} className="btn btn-outline-hof w-100 mt-2">
                <img
                  src={`https://hof-bucket.s3.ap-northeast-2.amazonaws.com/assets/${login.icon}`}
                  style={{ width: "23px", marginRight: "10px" }}
                  alt="로그인"
                />
                {login.platform}로 로그인
              </button>
            ))} 
          </div>
        </div>
      </div>
    </form>
  );
}

export default LoginForm;
