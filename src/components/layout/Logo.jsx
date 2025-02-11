import React from "react";

const Logo = ({ color = "black" }) => {
  return (
    <h3
      style={{
        fontFamily: "KCC-Ganpan",
        transform: "scaleY(1.5)",
        color: color, // props로 받은 색상 적용
      }}

    > 
      가구의집
    </h3>
  );
};

export default Logo;
