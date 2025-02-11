import React from "react";
import { Form } from "react-bootstrap";
import Logo from "../../components/layout/Logo";

function LoginInput(){

  return (    

    <form>
      <div>
        <div style={{border: "solid 2px #eee", borderRadius:"25px" , padding: "35px 25px", width:"80%"}}>
          <div className="mt-2 mb-4" style={{textAlign: "center"}}>
            <Logo />
          </div>
          <div>
            <Form.Control className="mt-1" type="email" placeholder="아이디" />
          </div>
          <div>
            <Form.Control className="mt-1" type="email" placeholder="비밀번호" />
          </div>
          <div>
            <button className="btn btn-hof w-100 my-3" >로그인</button>
            <div className="d-flex">
              <div>
                <input type="checkbox" className="checkbox-hof"/>
                <a>자동로그인</a>
              </div>
              <div className="px-3">
                <a>아이디찾기/비밀번호변경</a>
                <a>회원가입</a>
              </div>
            </div>
          </div>
          
          <hr/>

          <div>
            <button className="btn btn-outline-hof w-100 mt-3" >구글 로그인</button>
            <button className="btn btn-outline-hof w-100 mt-2" >깃허브 로그인</button>
            <button className="btn btn-outline-hof w-100 mt-2" >카카오 로그인</button>
            <button className="btn btn-outline-hof w-100 mt-2" >네이버 로그인</button>
          </div>                            
        </div>
      </div>

    </form>

  );
}





export default LoginInput;