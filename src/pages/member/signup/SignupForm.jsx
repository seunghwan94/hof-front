import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Logo from '../../../components/layout/Logo';
import useAxios from '../../../hooks/useAxios';

const SignupForm = () => {
  const [id, setId] = useState('');
  const [idValidCheck, setIdValidCheck] = useState('');
  const [idAvailable, setIdAvailable] = useState(false);

  const [password, setPassword] = useState('');
  const [passwordValidCheck, setPasswordValidCheck] = useState('');

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const { data, error, req } = useAxios();
  // const navigate = useNavigate();

  // id 유효성 검사
  const validId = (enteredID) => {
    const regex = /^[a-z0-9]{5,20}$/;
    return regex.test(enteredID);
  };

  // 비밀번호 유효성 검사
  const validPassword = (enteredPassword) => {
    const regex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/; // 영문, 숫자 포함, 8자 이상
    return regex.test(enteredPassword);
  };

  // id 입력 처리
  const handleIdChange = (e) => {
    const enteredID = e.target.value;
    setId(enteredID);
    // setIdAvailable(false);
    // setIdValidCheck('');
  };

  // 비밀번호 입력 처리
  const handlePasswordChange = (e) => {
    const enteredPassword = e.target.value;
    setPassword(enteredPassword);

    // 비밀번호 유효성 검사
    if (!validPassword(enteredPassword)) {
      setPasswordValidCheck('비밀번호는 영문, 숫자를 포함하여 8자 이상이어야 합니다.');
    } else {
      setPasswordValidCheck('');
    }

  }

  // 중복 체크 버튼 클릭 시 실행
  const handleIdCheck = async () => {
    // 유효성 검사
    if (!validId(id)) {
      setIdAvailable(false);
      setIdValidCheck('아이디는 5~10자의 영문 소문자와 숫자만 가능합니다.');
      return;
    }

    try {
      const response = await req('POST', 'signup/checkid', { id });
      console.log("response확인로그",data);
        if (response === '사용 가능한 아이디입니다.') {
          setIdAvailable(true);
          setIdValidCheck('사용 가능한 아이디입니다.');
        } else if (response === '사용 중인 아이디입니다.') {
          setIdAvailable(false);
          setIdValidCheck('사용 중인 아이디입니다.');
        } else {
          setIdAvailable(false);
          setIdValidCheck('알 수 없는 오류가 발생했습니다.');
        }

    } catch (error) {
      console.error('아이디 중복 체크 오류', error);
      setIdAvailable(false);
      setIdValidCheck('아이디 중복 체크 중 오류 발생');
    }
  };

  // 회원가입 처리
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!idAvailable) {
      setIdValidCheck('아이디를 확인해주세요.');
      return;
    }
    if (passwordValidCheck) {
      setPasswordValidCheck('비밀번호를 확인해주세요.');
      return;
    }

    req('POST', 'signup', { id, password, email, name, gender });
  };

  // 이메일 인증 요청
  const handleEmailVerification = () => {
    req('POST', 'email/verify', { email });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="py-5" style={{ border: 'solid 2px #fff', backgroundColor: '#fff', borderRadius: '25px', padding: '35px 25px', width: '60%' }}>
        <div className="mt-2 mb-5" style={{ textAlign: 'center' }}>
          <Link to="/" className="text-hof" style={{ textDecoration: 'none' }}>
            <Logo />
          </Link>
        </div>

        <Form.Control className="mt-1 py-2" type="text" value={id} onChange={handleIdChange} placeholder="아이디" />
        <div className='mx-2 mb-1'> {idValidCheck && (<p className='my-1' style={{ fontSize: "15px" ,color: idAvailable === false || idValidCheck ? 'red' : 'green', minHeight: '12px' }}>{idValidCheck}</p>)} </div>
        <button type="button" className="btn btn-hof w-100 mb-2" onClick={handleIdCheck}>아이디 중복 체크</button>

        <Form.Control className="mt-1 py-2" type="password" value={password} onChange={handlePasswordChange} placeholder="비밀번호" />
        {passwordValidCheck && (<p style={{color: "red", fontSize: "15px"}}>{passwordValidCheck}</p>)}

        <Form.Control className="mt-1 py-2" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="이메일" />
        <button type="button" className="btn btn-hof w-100 my-2" onClick={handleEmailVerification}>이메일 인증 요청</button>
        <Form.Control className="mt-1 py-2" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="이름(닉네임)" />
        <div className="d-flex justify-content-around mt-3 mb-4">
          <button type="button" className={`btn ${gender === 'male' ? 'btn-hof' : 'btn-outline-hof'}`} onClick={() => setGender('male')}>남자</button>
          <button type="button" className={`btn ${gender === 'female' ? 'btn-hof' : 'btn-outline-hof'}`} onClick={() => setGender('female')}>여자</button>
          <button type="button" className={`btn ${gender === 'none' ? 'btn-hof' : 'btn-outline-hof'}`} onClick={() => setGender('none')}>선택하지 않음</button>
        </div>

        <button className="btn btn-hof w-100 my-3 py-2">회원가입</button>
        {error && <p style={{ fontSize: '0.9rem', color: 'red', textAlign: 'center' }}>회원가입에 실패했습니다.</p>}
      </div>
    </form>
  );
};

export default SignupForm;
