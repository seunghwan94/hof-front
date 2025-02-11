import React from "react";

const Logo = ({ color = "black" }) => {
  return (
    <h1
      style={{
        fontFamily: "KCC-Ganpan",
        transform: "scaleY(1.5)",
        color: color, // props로 받은 색상 적용
      }}
      className="py-2 m-0 ps-4"
    >
      가구의집
    </h1>
  );
};

export default Logo;
