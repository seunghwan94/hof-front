import React from "react";

const AddressModal = ({ onComplete }) => {
  const openPostcode = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        let fullAddress = data.roadAddress; // 기본 주소
        let extraAddress = ""; // 참고 항목

        if (data.bname && /[동|로|가]$/g.test(data.bname)) {
          extraAddress += data.bname;
        }
        if (data.buildingName && data.apartment === "Y") {
          extraAddress += extraAddress ? `, ${data.buildingName}` : data.buildingName;
        }
        if (extraAddress) {
          fullAddress += ` (${extraAddress})`;
        }
        console.log(data)
        onComplete({
          zipcode: data.zonecode,
          roadAddr: data.roadAddress,
          detailAddr: data.query,
        });
      },
    }).open();
  };

  return (
    <button className="btn btn-outline-hof" onClick={openPostcode}>
      주소 등록
    </button>
  );
};

export default AddressModal;
