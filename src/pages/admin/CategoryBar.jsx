// src/components/CategoryBar.js
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome,  faCommentDots,faSackDollar,faSignsPost, faGift,faUser,faRectangleXmark,faArrowRightFromBracket,faDesktop, faMessage} from "@fortawesome/free-solid-svg-icons";
import Logo from "../../components/layout/Logo";


const CategoryBar = ({closeSidebar}) => {
  const location = useLocation();



const isActive = (path) => location.pathname.startsWith(path);

  //  모바일에서 메뉴 클릭 시 자동으로 사이드바 닫기
  const handleLinkClick = () => {
    if (window.innerWidth < 992 && closeSidebar) {
      closeSidebar();
    }
  };
  

  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 bg-dark text-white my-3 ms-3 rounded-3 shadow category-bar" style={{
      width: "250px",
      height: "95vh",
      maxHeight: "95vh",
      overflowY: "auto",  
      // overflow: "hidden",
      display: "flex",
    flexDirection: "column"
    }}>

      {/* <HofLogo  style={{ width:"125", height:"50"}} className = ""/> */}
      <div className="d-flex justify-content-center align-items-center w-100">
        <Logo color="white" className="py-2 m-0" />
      </div>

      <hr />
      <ul className="nav nav-pills flex-column mb-auto">

        <li className="nav-item" style={{ backgroundColor: isActive("/admin/dashboard") ? "#35c5f0" : "transparent" }}>
          <Link to="/admin/dashboard" className="nav-link text-white d-flex align-items-center font-weight-bold" onClick={handleLinkClick}>
            <FontAwesomeIcon icon={faHome} className="me-4 " style={{width : 16,height : 16}}/> Dashboard
          </Link>
        </li>
        <li style={{ backgroundColor: isActive("/admin/member") ? "#35c5f0" : "transparent" }} className="mt-3">
          <Link to="/admin/member" className="nav-link text-white d-flex align-items-center  font-weight-bold" onClick={handleLinkClick}>
            <FontAwesomeIcon icon={faUser} className="me-4" style={{width : 16,height : 16}} /> 회원관리
          </Link>
        </li>
        <li style={{ backgroundColor: isActive("/admin/prod") ? "#35c5f0" : "transparent" }} className="mt-3">
          <Link to="/admin/prod" className="nav-link text-white d-flex align-items-center  font-weight-bold" onClick={handleLinkClick}>
          <FontAwesomeIcon icon={faGift}  className="me-4" style={{width : 16,height : 16}} /> 상품관리
          </Link>
        </li>
        <li style={{ backgroundColor: isActive("/admin/popup") ? "#35c5f0" : "transparent" }} className="mt-3">
          <Link to="/admin/popup" className="nav-link text-white d-flex align-items-center  font-weight-bold" onClick={handleLinkClick}>
          <FontAwesomeIcon icon={faSignsPost} className="me-4" style={{width : 16,height : 16}} /> 팝업관리
          </Link>
        </li>
        <li style={{ backgroundColor: isActive("/admin/cash") ? "#35c5f0" : "transparent" }} className="mt-3">
          <Link to="/admin/cash" className="nav-link text-white d-flex align-items-center  font-weight-bold" onClick={handleLinkClick}>
            <FontAwesomeIcon icon={faSackDollar} className="me-4"style={{width : 16,height : 16}} /> 결제관리
          </Link>
        </li>
        <li style={{ backgroundColor: isActive("/admin/qna") ? "#35c5f0" : "transparent" }} className="mt-3">
          <Link to="/admin/qna" className="nav-link text-white d-flex align-items-center  font-weight-bold" onClick={handleLinkClick}>
          <FontAwesomeIcon icon={faCommentDots}  className="me-4"style={{width : 16,height : 16}} /> QNA
          </Link>
        </li>
        <li style={{ backgroundColor: isActive("/admin/fwl") ? "#35c5f0" : "transparent" }} className="mt-3">
          <Link to="/admin/fwl" className="nav-link text-white d-flex align-items-center  font-weight-bold" onClick={handleLinkClick}>
          <FontAwesomeIcon icon={faRectangleXmark}  className="me-4"style={{width : 16,height : 16}} /> 금지어 관리
          </Link>
        </li>
        <li style={{ backgroundColor: isActive("/admin/notification") ? "#35c5f0" : "transparent" }} className="mt-3">
          <Link to="/admin/notification" className="nav-link text-white d-flex align-items-center  font-weight-bold" onClick={handleLinkClick}>
          <FontAwesomeIcon icon={faMessage}  className="me-4"style={{width : 16,height : 16}} /> 푸쉬메시지
          </Link>
        </li>
        <li >
          <Link to="http://hof.lshwan.com/grafana" className="nav-link text-white d-flex align-items-center  font-weight-bold mt-3" onClick={handleLinkClick}>
          <FontAwesomeIcon icon={faDesktop}  className="me-4" style={{width : 16,height : 16}} /> 모니터링 서비스
          </Link>
        </li>

        <hr />
        <li>
          <Link to="/login" className="nav-link text-white d-flex align-items-center mt-3" >
          <FontAwesomeIcon icon={faArrowRightFromBracket}  className="me-4" style={{width : 16,height : 16}} /> SignOut
          </Link>
        </li>
      </ul>
      <hr />
      <Link className="btn btn-hof" to={"/Intro"}>사용자 화면</Link>

    </div>
  );
};

export default CategoryBar;
