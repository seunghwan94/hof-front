import React, { useState, useEffect } from "react";

const PageLoader = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500); // 2초 후 로딩 종료
  }, []);

  return (
    <>
      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default PageLoader;
