import React, { useEffect, useState } from "react";
import useAxios from "../../../../hooks/useAxios";
import "../../../../styles/myinfo/profile.scss";
import AddressModal from "../../../../components/layout/AddressModal"; // 카카오 주소 검색 컴포넌트 추가

function Profile() {
  const mno = JSON.parse(localStorage.getItem("member"))?.mno;
  const { data, loading, error, req } = useAxios();
  const [memberDetail, setMemberDetail] = useState(null);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [allowNotification, setAllowNotification] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);

  useEffect(() => {
    if (mno) {
      req("GET", `common/member/${mno}`).then((data) => {
        if (data) {
          setMemberDetail(data);
          setMarketingConsent(data.marketingConsent || false);
          setAllowNotification(data.allowNotification || false);
          setAddresses(data.addresses || []);

          // 기본 주소 (default: true) 찾기
          const defaultIndex = data.addresses?.findIndex((addr) => addr.default) ?? 0;
          setSelectedAddressIndex(defaultIndex);
        }
      }).catch(() => {
        setMemberDetail({});
      });
    }
  }, [mno, req]);

  const handleToggle = (field, value) => {
    if (field === "marketingConsent") {
      setMarketingConsent(value);
    } else {
      setAllowNotification(value);
    }
  };

  const handleAddressChange = (index) => {
    setSelectedAddressIndex(index);
  };

  const handleAddAddress = (newAddress) => {
    setAddresses([...addresses, newAddress]);
  };

  const handleSave = async () => {
    if (!memberDetail) return;

    // 선택된 주소를 default: true로 변경
    const updatedAddresses = addresses.map((addr, idx) => ({
      ...addr,
      default: idx === selectedAddressIndex,
    }));

    const updatedMemberDetailDto = {
      ...memberDetail,
      marketingConsent,
      allowNotification,
      addresses: updatedAddresses,
    };  console.log(updatedMemberDetailDto);

    await req("PUT", `common/member/${mno}`, updatedMemberDetailDto);
    alert("정보가 저장되었습니다!");
  };

  if (loading) return <div className="profile-container p-5">로딩 중...</div>;
  if (error) return <div className="profile-container p-5">오류 발생: {error.message}</div>;
  if (!memberDetail) return <div className="profile-container p-5">회원 정보를 불러올 수 없습니다.</div>;

  return (
    <div className="profile-container p-5">
      {/* 상단 기본 정보 */}
      <div className="profile-header">
        <div className="profile-info">
          <h3 className="profile-name">{memberDetail?.name || "이름 없음"}</h3>
          <p className="profile-email">{memberDetail?.email || "이메일 없음"}</p>
        </div>
      </div>

      {/* 기본 정보 섹션 */}
      <div className="profile-section">
        <h4>기본 정보</h4>
        <div className="profile-item">
          <span>이름</span>
          <span className="profile-value">{memberDetail?.name || "이름 없음"}</span>
        </div>
        <div className="profile-item">
          <span>이메일</span>
          <span className="profile-value">{memberDetail?.email || "이메일 없음"}</span>
        </div>
        <div className="profile-item">
          <span>성별</span>
          <span className="profile-value">
            {memberDetail?.gender === "MALE" ? "남성" : "여성"}
          </span>
        </div>
        <div className="profile-item">
          <span>회원 역할</span>
          <span className="profile-value">{memberDetail?.role || "정보 없음"}</span>
        </div>
      </div>

      {/* 알림 설정 섹션 */}
      <div className="profile-section">
        <h4>알림 설정</h4>
        <div className="profile-item d-flex justify-content-between align-items-center">
          <span>마케팅 동의</span>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              checked={marketingConsent}
              onChange={(e) => handleToggle("marketingConsent", e.target.checked)}
            />
          </div>
        </div>
        <div className="profile-item d-flex justify-content-between align-items-center">
          <span>푸시 알림</span>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              checked={allowNotification}
              onChange={(e) => handleToggle("allowNotification", e.target.checked)}
            />
          </div>
        </div>
      </div>

      {/* 주소 관리 섹션 */}
      <div className="profile-section">
        <h4 style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          주소 관리
          <AddressModal onComplete={handleAddAddress} />
        </h4>
        {addresses.length > 0 ? (
          addresses.map((addr, index) => (
            <div key={index} className="profile-item d-flex align-items-center">
              <div>
                <input
                  type="radio"
                  className="form-check-input me-2"
                  name="address"
                  checked={selectedAddressIndex === index}
                  onChange={() => handleAddressChange(index)}
                />
                {!selectedAddressIndex.default? "기본 주소" : ""}
              </div>
              <div>
                <span className="profile-value">{`${addr.roadAddr} (${addr.detailAddr})`}</span>
                <span className="profile-zipcode d-block">우편번호: {addr.zipcode}</span>
              </div>
            </div>
          ))
        ) : (
          <p>등록된 주소가 없습니다.</p>
        )}
      </div>

      {/* 저장 버튼 */}
      <div className="profile-section text-end" style={{borderBottom : "0px" }}>
        <button className="btn btn-hof" onClick={handleSave}>
          저장
        </button>
      </div>
    </div>
  );
}

export default Profile;
