import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from '../../../components/layout/Logo';
import useAxios from '../../../hooks/useAxios';

const SignupForm = () => {
  const [id, setId] = useState('');
  const [idValidCheck, setIdValidCheck] = useState('');
  const [idAvailable, setIdAvailable] = useState(false);

  const [pw, setPw] = useState('');
  const [passwordValidCheck, setPasswordValidCheck] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordValidCheck, setConfirmPasswordValidCheck] = useState('');

  const [email, setEmail] = useState('');
  const [emailValidCheck, setEmailValidCheck] = useState('');
  // const [verificationToken, setVerificationToken] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationValid, setVerificationValid] = useState(false);

  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [allowNotification, setAllowNotification] = useState(false);

  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const { data, error, req } = useAxios();

  const location = useLocation();
  const { state } = location;

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

  // 이메일 유효성 검사
  const validEmail = (enteredEmail) => {
    const regex = /^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{1,7}$/;
    return regex.test(enteredEmail);
  };

  // 약관 동의 상태 가져오기
  useEffect(() => {
    if (state) {
      setPrivacyConsent(state.privacyConsent || false);
      setMarketingConsent(state.marketingConsent || false);
      setAllowNotification(state.allowNotification || false);
    }
  }, [state]);

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

  // 비밀번호 확인 입력 처리
  const handleConfirmPasswordChange = (e) => {
    const enteredConfirmPassword = e.target.value;
    setConfirmPassword(enteredConfirmPassword);

    // 비밀번호와 일치하는지 검사
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
    } catch (error) {
      console.error("회원가입 실패:", error);
      alert("회원가입에 실패했습니다.");
    }
  };

  // 이메일 인증 요청
  const handleEmailVerification = async () => {
    try {
      const response = await req('POST', 'signup/emailsend', { email });
      console.log("이메일인증요청!!!!!:", email);
      alert(response);  // 이메일 발송 성공 여부를 알림으로 표시
      setVerificationValid(true);  // 이메일 인증 코드 입력란 표시
    } catch (error) {
      console.error("이메일 인증 요청 실패:", error);
      alert("이메일 인증 요청에 실패했습니다.");
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
        email,
        verificationCode
      });
      alert(response);  // 인증 코드 검증 성공 여부를 알림으로 표시
      setVerificationValid(true); // 인증 성공 시 회원가입 가능 상태로 변경
    } catch (error) {
      console.error("이메일 인증 코드 검증 실패:", error);
      alert("인증 코드 검증에 실패했습니다.");
    }
  };
  // const handleVerifyCodeSubmit = async () => {
  //   try {
  //     const response = await req('POST', 'signup/verify', { verificationCode });
  //     alert(response);  // 인증 코드 검증 성공 여부를 알림으로 표시
  //   } catch (error) {
  //     console.error("이메일 인증 코드 검증 실패:", error);
  //     alert("인증 코드 검증에 실패했습니다.");
  //   }
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
        <Form.Control className="mt-1 py-2" type="text" value={verificationCode} onChange={handleVerificationCodeChange} placeholder="인증 코드 입력" />
        {verificationValid && (<button type="button" className="btn btn-hof w-100 my-2" onClick={handleVerifyCodeSubmit}>인증 코드 확인</button>)}

        <Form.Control className="mt-1 py-2" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="이름(닉네임)" />
        <div className="d-flex justify-content-around mt-3 mb-4">
          <button type="button" className={`btn ${gender === 'MALE' ? 'btn-hof' : 'btn-outline-hof'}`} onClick={() => setGender('MALE')}>남자</button>
          <button type="button" className={`btn ${gender === 'FEMALE' ? 'btn-hof' : 'btn-outline-hof'}`} onClick={() => setGender('FEMALE')}>여자</button>
          <button type="button" className={`btn ${gender === 'OTHER' ? 'btn-hof' : 'btn-outline-hof'}`} onClick={() => setGender('OTHER')}>선택하지 않음</button>
        </div>

        <button type='submit' className="btn btn-hof w-100 my-3 py-2">회원가입</button>
        {error && <p style={{ fontSize: '0.9rem', color: 'red', textAlign: 'center' }}>회원가입에 실패했습니다.</p>}
      </div>
    </form>
  );
};

export default SignupForm;
