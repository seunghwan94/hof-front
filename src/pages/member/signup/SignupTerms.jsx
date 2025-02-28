import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Logo from '../../../components/layout/Logo';

const SignupTerms = ({onNext}) => {
  const [allChecked, setAllChecked] = useState(false);
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [allowNotification, setAllowNotification] = useState(false);

  const handleAllChecked = () => {
    const newValue = !allChecked;
    setAllChecked(newValue);
    setAllowNotification(newValue);
    setPrivacyConsent(newValue);
    setMarketingConsent(newValue);
  };

  const handleNext = (e) => {
    e.preventDefault();
    onNext(privacyConsent, marketingConsent, allowNotification);
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
              <Form.Control 
                as="textarea" 
                rows={3} 
                readOnly 
                defaultValue={`개인정보 처리방침
최종 개정일: 2025년 2월 28일
적용 대상: ‘가구의 집’ 서비스

제 1 조 (목적)
본 개인정보 처리방침은 ‘가구의 집’ 서비스(이하 ‘회사’)가 회원의 개인정보를 어떻게 수집, 이용, 보관 및 보호하는지 설명합니다.

제 2 조 (수집하는 개인정보 및 이용 목적)
1. 회원가입 및 서비스 이용: 이름, 이메일, 비밀번호, 휴대전화번호, 주소 (회원 식별 및 서비스 제공)
2. 결제 및 주문 처리: 결제 정보(카드사명, 결제 승인번호 등), 주문 내역, 배송 정보 (상품 구매 및 배송 처리)
3. 서비스 개선 및 분석: 서비스 이용 기록, 접속 로그, 기기 정보, IP 주소 (서비스 품질 개선 및 맞춤형 서비스 제공)

제 3 조 (회원 탈퇴 및 계정 운영 정책)
- ‘가구의 집’ 서비스의 특성상 회원 탈퇴는 불가능합니다.
- 이메일(kyt4423@gmail.com)로 요청 시 계정을 휴면 처리할 수 있습니다.

제 4 조 (결제 및 환불 정책)
- IAMPORT를 통해 결제를 처리하며, 모든 결제는 즉시 확정됩니다.
- 부분 환불은 불가능하며, 전체 환불만 가능합니다.
- 환불을 원할 경우, 구매한 상품을 반품한 후 전액 환불을 요청할 수 있습니다.

제 5 조 (개인정보 보호 관련 문의)
- 이메일: kyt4423@gmail.com
- 전화번호: 010-1234-1234

본 개인정보 처리방침은 2025년 2월 28일부터 적용됩니다.
`} 
              />
            </Form.Group>
          </div>

          <div className="d-flex align-items-center mb-2">
            <input type="checkbox" className="checkbox-hof me-2" onChange={() => setMarketingConsent(!marketingConsent)} checked={marketingConsent} />
            <label style={{fontWeight: "600", fontSize: "0.9rem", color: "#888"}}>[선택]</label>
            <label style={{fontWeight: "600"}}>마케팅 정보 수신 동의</label>
          </div>
          <div>
  <Form.Group className="mb-4" controlId="marketingConsentText">
    <Form.Control 
      as="textarea" 
      rows={3} 
      readOnly 
      defaultValue={`마케팅 정보 수신 동의

본인은 ‘가구의 집’에서 제공하는 다양한 서비스 및 혜택에 대한 정보를 받는 것에 동의합니다.

제 1 조 (목적)
회사는 회원에게 맞춤형 정보 제공을 위해 마케팅 정보를 발송할 수 있습니다.

제 2 조 (수집 및 이용 항목)
1. 수집 정보: 이메일, 휴대전화번호
2. 이용 목적: 이벤트, 할인 혜택, 프로모션 정보 제공

제 3 조 (수신 거부 및 변경)
- 회원은 언제든지 마케팅 정보 수신을 거부 불가능합니다
- 수신 거부 방법: ‘내정보 > 내정보 관리’에서 변경 가능은 함

제 4 조 (문의)
- 이메일: kyt4423@gmail.com
- 전화번호: 070-1234-5678
`} 
    />
  </Form.Group>
</div>

          <div className="d-flex align-items-center mb-2">
            <input type="checkbox" className="checkbox-hof me-2" onChange={() => setAllowNotification(!allowNotification)} checked={allowNotification} />
            <label style={{fontWeight: "600", fontSize: "0.9rem", color: "#888"}}>[선택]</label>
            <label style={{fontWeight: "600"}}>알림 허용</label>
          </div>
          <div>
  <Form.Group className="mb-4" controlId="notificationConsentText">
    <Form.Control 
      as="textarea" 
      rows={3} 
      readOnly 
      defaultValue={`알림 허용 동의

본인은 ‘가구의 집’에서 제공하는 서비스 관련 알림을 받는 것에 동의합니다.

제 1 조 (목적)
회사는 회원에게 서비스 관련 주요 정보를 제공하기 위해 알림을 발송할 수 있습니다.

제 2 조 (수집 및 이용 항목)
1. 수집 정보: 휴대전화번호, 이메일, 푸시 알림 토큰
2. 이용 목적: 주문 상태 안내, 이벤트 및 혜택 알림, 서비스 공지

제 3 조 (수신 거부 및 변경)
- 회원은 언제든지 알림 수신을 거부불가능
- 수신 거부 방법: ‘내정보 > 내정보 관리’에서 변경은 가능

제 4 조 (문의)
- 이메일: kyt4423@gmail.com
- 전화번호: 070-1234-5678
`} 
    />
  </Form.Group>
</div>

          <button className="btn btn-hof w-100 my-3 py-2" onClick={handleNext} disabled={!privacyConsent}>다음</button>
        </div>
      </div>
    </form>
  );
};


export default SignupTerms;