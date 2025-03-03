import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../../components/layout/Logo';
import useAxios from '../../../hooks/useAxios';
import CustomAlert from '../../../components/custom/CustomAlert';

const SignupForm = ({ termsAccepted }) => {

  const navigate = useNavigate();
  const { privacyConsent, marketingConsent, allowNotification } = termsAccepted;

  const [id, setId] = useState('');
  const [idValidCheck, setIdValidCheck] = useState('');
  const [idAvailable, setIdAvailable] = useState(false);

  const [pw, setPw] = useState('');
  const [passwordValidCheck, setPasswordValidCheck] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordValidCheck, setConfirmPasswordValidCheck] = useState('');

  const [email, setEmail] = useState('');
  const [emailValidCheck, setEmailValidCheck] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationValid, setVerificationValid] = useState(false);

  const [name, setName] = useState('');
  const [gender, setGender] = useState('OTHER');
  const { data, error, req } = useAxios();

  // // 커스텀 얼럿 상태 관리
  // const [alertVisible, setAlertVisible] = useState(false);
  // const [alertType, setAlertType] = useState('error');
  // const [alertMessage, setAlertMessage] = useState('');

  // 아이디 유효성 검사
  const validId = (enteredID) => {
    const regex = /^[a-z0-9]{5,20}$/;
    return regex.test(enteredID);
  };

  // 비밀번호 유효성 검사
  const validPassword = (enteredPassword) => {
    const regex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/; // 영문, 숫자 포함, 8자 이상
    return regex.test(enteredPassword);
  };

  // 이메일 유효성 검사
  const validEmail = (enteredEmail) => {
    const regex = /^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$/;
    return regex.test(enteredEmail);
  };

  // 아이디 입력 처리
  const handleIdChange = (e) => {
    const enteredID = e.target.value;
    setId(enteredID);
  };

  // 비밀번호 입력 처리
  const handlePasswordChange = (e) => {
    const enteredPassword = e.target.value;
    setPw(enteredPassword);

    // 비밀번호 유효성 검사
    if (!validPassword(enteredPassword)) {
      setPasswordValidCheck('비밀번호는 영문, 숫자를 포함하여 8자 이상이어야 합니다.');
    } else {
      setPasswordValidCheck('');
    }

    // 비밀번호 확인란과 일치하는지 검사
    if (enteredPassword !== confirmPassword) {
      setConfirmPasswordValidCheck('비밀번호가 일치하지 않습니다.');
    } else {
      setConfirmPasswordValidCheck('');
    }
  };

  // 아이디 중복 확인 버튼 클릭 시 실행
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

  // 비밀번호 확인 입력 처리
  const handleConfirmPasswordChange = (e) => {
    const enteredConfirmPassword = e.target.value;
    setConfirmPassword(enteredConfirmPassword);

    // 비밀번호 일치 확인
    if (enteredConfirmPassword !== pw) {
      setConfirmPasswordValidCheck('비밀번호가 일치하지 않습니다.');
    } else {
      setConfirmPasswordValidCheck('');
    }
  };

  // 이메일 입력 처리
  const handleEmailChange = (e) => {
    const enteredEmail = e.target.value;
    setEmail(enteredEmail);

    // 이메일 유효성 검사
    if (!validEmail(enteredEmail)) {
      setEmailValidCheck('이메일 형식이 올바르지 않습니다.');
    } else {
      setEmailValidCheck('');
    }
  };

  

  // 회원가입 처리
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!id || id.trim() === "") {
      alert("아이디를 입력해주세요.");
      return;
    }
    if (!pw || pw.trim() === "") {
      alert("비밀번호를 입력해주세요.");
      return;
    }
    if (!confirmPassword || confirmPassword.trim() === "") {
      alert("비밀번호 확인을 입력해주세요.");
      return;
    }
    if (pw !== confirmPassword) {
      alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }
    if (!email || email.trim() === "") {
      alert("이메일을 입력해주세요.");
      return;
    }
    if (!name || name.trim() === "") {
      alert('이름을 입력해주세요.');
      return;
    }
    if (!verificationCode || verificationCode.trim() === "") {
      alert("이메일 인증 코드가 비어 있습니다. 인증 후 회원가입을 진행해주세요.");
      return;  // 인증 코드가 없으면 서버로 요청을 보내지 않음
    }


    if (!idAvailable) {
      setIdValidCheck('아이디를 확인해주세요.');
      return;
    }
    if (passwordValidCheck) {
      setPasswordValidCheck('비밀번호를 확인해주세요.');
      return;
    }
    if (confirmPassword !== pw) {
      setConfirmPasswordValidCheck('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (emailValidCheck) {
      setEmailValidCheck('이메일을 확인해주세요.');
      return;
    }

    if (!privacyConsent) {
      alert('필수 약관에 동의해야 합니다.');
      return;
    }
  
    // 이메일 인증 여부 확인
    if (!verificationValid) {
      alert('이메일 인증을 완료해주세요.');
      return;
    }
  
    const reqMemberData = {
      id,
      pw,
      name,
      memberDetail: {
        email,
        gender,
        privacyConsent,
        marketingConsent,
        allowNotification
      }
    };
  
    try {
      const response = await req('POST', 'signup', reqMemberData);
      console.log(reqMemberData);
      console.log("reqMemberData확인")
      alert(response);  // 회원가입 성공 여부를 알림으로 표시
      navigate('/login');
    } catch (error) {
      console.error("회원가입 실패:", error);
    // 에러 객체의 전체 구조를 확인합니다.
    console.log("Error object:", error);

    // error.response와 error.response.data가 있는지 확인하고 처리합니다.
    if (error.response && error.response.data) {
        if (error.response.data === '이메일 인증이 완료되지 않았습니다. 인증 후 회원가입을 진행해주세요.') {
            alert('이메일 인증이 완료되지 않았습니다. 인증 후 회원가입을 진행해주세요.');
        } else {
            alert("회원가입에 실패했습니다.");
        }
    } else {
        alert("알 수 없는 오류가 발생했습니다.");
    }
    }
  };

  // 이메일 인증 요청
  const handleEmailVerification = async () => {
    if (!validEmail(email)) {
      alert("이메일 형식이 올바르지 않습니다.");
      return;  // 이메일 형식이 잘못된 경우 요청을 중단
    }
  
    try {
      const response = await req('POST', 'signup/emailsend', { email });
      console.log("이메일인증요청!!!!!:", email);
      console.log("서버 응답:", response);  // 서버 응답 전체 로그 출력

      
      // 응답 메시지를 alert로 표시
      if (response && response.data) {
        alert(response.data);  // 서버에서 보내는 응답 메시지를 표시
      } else {
        alert("이메일 인증 코드가 발송되었습니다.");  // 응답이 없으면 기본 메시지 표시
      }
  
      setVerificationValid(true);  // 이메일 인증 코드 입력란 표시
    } catch (error) {
      console.error("이메일 인증 요청 실패:", error);
      
      // 오류 응답이 있을 경우 해당 메시지를 alert로 표시
      if (error.response && error.response.data) {
        alert(error.response.data);  // 서버에서 보내는 에러 메시지 표시
      } else {
        alert("이미 사용중인 이메일입니다.");
      }
    }
  };
  // 인증 코드 입력 처리
  const handleVerificationCodeChange = (e) => {
    setVerificationCode(e.target.value);
  };

  // 이메일 인증 코드 검증 처리
  const handleVerifyCodeSubmit = async () => {
    try {
      const response = await req('POST', 'signup/verify', {
        email,  // 이메일 추가
        verificationCode  // 인증 코드 추가
      });
      if (response === '이메일 인증 성공') {  // 서버에서 성공 메시지를 받았는지 확인
        alert('이메일 인증이 완료되었습니다.');
        setVerificationValid(true);
      } else {
        alert('인증 코드가 일치하지 않습니다.');
        setVerificationValid(false); // 실패 시 false로 설정
      }
    } catch (error) {
      console.error('이메일 인증 코드 검증 실패:', error);
      alert('인증 코드 검증에 실패했습니다.');
      setVerificationValid(false); // 예외 발생 시 false로 설정
    }
  };

  // // 커스텀 얼럿 
  // const showAlert = (message, type) => {
  //   setAlertMessage(message);
  //   setAlertType(type);
  //   setAlertVisible(true);
  // };

  // // 커스텀 얼럿 닫기
  // const handleCloseAlert = () => {
  //   setAlertVisible(false);
  // };

  return (
    <form onSubmit={handleSubmit}>
      <div className="py-5" style={{ border: 'solid 2px #fff', backgroundColor: '#fff', borderRadius: '25px', padding: '35px 25px', width: '60%' }}>
        <div className="mt-2 mb-5" style={{ textAlign: 'center' }}>
          <Link to="/" className="text-hof" style={{ textDecoration: 'none' }}>
            <Logo />
          </Link>
        </div>

        <Form.Control className="mt-1 py-2" type="text" value={id} onChange={handleIdChange} placeholder="아이디" />
        <div className='mx-2 mb-2'> {idValidCheck && (<p className='my-1' style={{ fontSize: "14px" ,color: idAvailable === false || idValidCheck ? 'red' : 'green', minHeight: '12px' }}>{idValidCheck}</p>)} </div>
        <button type="button" className="btn btn-hof w-100 mb-2" onClick={handleIdCheck}>아이디 중복 체크</button>

        <Form.Control className="mt-1 py-2" type="password" value={pw} onChange={handlePasswordChange} placeholder="비밀번호" />
        <div className='mx-2 mb-2'> {passwordValidCheck && (<p className='my-1' style={{color: "red", fontSize: "14px"}}>{passwordValidCheck}</p>)} </div>
        <Form.Control className="mt-1 py-2" type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} placeholder="비밀번호 확인" />
        <div className='mx-2 mb-2'> {confirmPasswordValidCheck && (<p className='my-1' style={{ color: "red", fontSize: "14px" }}>{confirmPasswordValidCheck}</p>)} </div>


        <Form.Control className="mt-1 py-2" type="email" value={email} onChange={handleEmailChange} placeholder="이메일" />
        <div className='mx-2 mb-2'> {emailValidCheck && (<p className='my-1' style={{ color: "red", fontSize: "14px" }}>{emailValidCheck}</p>)} </div>
        <button type="button" className="btn btn-hof w-100 my-2" onClick={handleEmailVerification}>이메일 인증 요청</button>
        {verificationValid && (
        <>
          <Form.Control className="mt-1 py-2" type="text" value={verificationCode} onChange={handleVerificationCodeChange} placeholder="인증 코드 입력" />
          <button type="button" className="btn btn-hof w-100 my-2" onClick={handleVerifyCodeSubmit}>인증 코드 확인</button>
        </>
      )}

        <Form.Control className="mt-1 py-2" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="이름(닉네임)" />
        {/* <div className="d-flex justify-content-around mt-3 mb-4">
          <button type="button" className={`btn ${gender === 'MALE' ? 'btn-hof' : 'btn-outline-hof'}`} onClick={() => setGender('MALE')}>남자</button>
          <button type="button" className={`btn ${gender === 'FEMALE' ? 'btn-hof' : 'btn-outline-hof'}`} onClick={() => setGender('FEMALE')}>여자</button>
          <button type="button" className={`btn ${gender === 'OTHER' ? 'btn-hof' : 'btn-outline-hof'}`} onClick={() => setGender('OTHER')}>선택하지 않음</button>
        </div> */}
        <ButtonGroup className="d-flex justify-content-around mt-3 mb-4" aria-label="성별 선택">
          <Button 
            className={`w-100 ${gender === 'MALE' ? 'btn-hof' : 'btn-outline-hof'}`} 
            onClick={() => setGender('MALE')}
          >
            남자
          </Button>
          <Button 
            className={`w-100 ${gender === 'FEMALE' ? 'btn-hof' : 'btn-outline-hof'}`} 
            onClick={() => setGender('FEMALE')}
          >
            여자
          </Button>
          <Button 
            className={`w-100 ${gender === 'OTHER' ? 'btn-hof' : 'btn-outline-hof'}`} 
            onClick={() => setGender('OTHER')}
          >
            선택하지 않음
          </Button>
        </ButtonGroup>

        <button type='submit' className="btn btn-hof w-100 my-3 py-2">회원가입</button>
        {error && <p style={{ fontSize: '0.9rem', color: 'red', textAlign: 'center' }}>회원가입에 실패했습니다.</p>}
      </div>

      {/* <CustomAlert
        show={alertVisible}
        message={alertMessage}
        type={alertType}
        onClose={handleCloseAlert}
      /> */}
    </form>
  );
};

export default SignupForm;
