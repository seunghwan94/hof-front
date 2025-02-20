import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Logo from '../../../components/layout/Logo';

const SignupTerms = ({onNext}) => {
  const [allChecked, setAllChecked] = useState(false);
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [allowNotification, setAllowNotification] = useState(false);
  // const navigate = useNavigate();

  const handleAllChecked = () => {
    const newValue = !allChecked;
    setAllChecked(newValue);
    setAllowNotification(newValue);
    setPrivacyConsent(newValue);
    setMarketingConsent(newValue);
  };

  const handleNext = () => {
    if (!privacyConsent) {
      alert('필수 약관에 동의해야 합니다.');
      return;
    }
    onNext();
    // navigate('/signup');
  };


  return (

    <form >
      <div >
        <div className="py-5" style={{ border: "solid 2px #fff", backgroundColor: "#fff", borderRadius: "25px", padding: "35px 25px", width: "60%"}}>
          <div className="mt-2 mb-5" style={{textAlign: "center"}}>
            <Link to="/"className="text-hof" style={{textDecoration:"none"}}><Logo /></Link>            
          </div>
          <h5 className="mb-4 text-center" style={{fontWeight: "bold"}}>회원가입 약관 동의</h5>
          <div className="d-flex align-items-center mb-2">
            <input type="checkbox" className="checkbox-hof me-2" onChange={handleAllChecked} checked={allChecked} />
            <label style={{fontWeight: "600"}}>전체 동의</label>
          </div>
          <p className='mb-4' style={{fontSize: "0.9rem", color: "#888"}}>마케팅 정보 수신 동의(선택)을 포함합니다.</p>

          <div className="d-flex align-items-center mb-2">
            <input type="checkbox" className="checkbox-hof me-2" onChange={() => setPrivacyConsent(!privacyConsent)} checked={privacyConsent} />
            <label style={{fontWeight: "600", fontSize: "0.9rem", color: "#35c5f0"}}>[필수]</label>
            <label style={{fontWeight: "600"}}>개인정보 처리방침</label>
          </div>
          <div>
            <Form.Group className="mb-4" controlId="exampleForm.ControlTextarea1">
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </div>

          <div className="d-flex align-items-center mb-2">
            <input type="checkbox" className="checkbox-hof me-2" onChange={() => setMarketingConsent(!marketingConsent)} checked={marketingConsent} />
            <label style={{fontWeight: "600", fontSize: "0.9rem", color: "#888"}}>[선택]</label>
            <label style={{fontWeight: "600"}}>마케팅 정보 수신 동의</label>
          </div>
          <div>
            <Form.Group className="mb-4 " controlId="exampleForm.ControlTextarea1" style={{width: ""}}>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </div>

          <div className="d-flex align-items-center mb-2">
            <input type="checkbox" className="checkbox-hof me-2" onChange={() => setAllowNotification(!allowNotification)} checked={allowNotification} />
            <label style={{fontWeight: "600", fontSize: "0.9rem", color: "#888"}}>[선택]</label>
            <label style={{fontWeight: "600"}}>알림 허용</label>
          </div>
          <div>
            <Form.Group className="mb-4 " controlId="exampleForm.ControlTextarea1" style={{width: ""}}>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </div>

          <button className="btn btn-hof w-100 my-3 py-2" onClick={handleNext}>다음</button>
        </div>
      </div>
    </form>
  );
};

export default SignupTerms;