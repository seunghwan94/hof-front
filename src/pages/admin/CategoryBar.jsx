// src/components/CategoryBar.js
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome,  faCommentDots,faSackDollar,faSignsPost, faGift,faUser,faRectangleXmark,faArrowRightFromBracket,faDesktop} from "@fortawesome/free-solid-svg-icons";
import Logo from "../../components/layout/Logo";


const CategoryBar = () => {
  const location = useLocation();
  console.log(location);


const isActive = (path) => location.pathname.startsWith(path);


  

  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 bg-dark text-white my-3 ms-3 rounded-3 shadow category-bar" style={{
      width: "250px",
      height: "95vh",
      maxHeight: "95vh",
      overflow: "hidden",
    }}>
      
      {/* <HofLogo  style={{ width:"125", height:"50"}} className = ""/> */}
      <div className="d-flex justify-content-center align-items-center w-100">
        <Logo color="white" className="py-2 m-0" />
      </div>

      <hr />
      <ul className="nav nav-pills flex-column mb-auto">

        <li className="nav-item" style={{ backgroundColor: isActive("/dashboard") ? "#35c5f0" : "transparent" }}>
          <Link to="/dashboard" className="nav-link text-white d-flex align-items-center font-weight-bold">
            <FontAwesomeIcon icon={faHome} className="me-4 " style={{width : 16,height : 16}}/> Dashboard
          </Link>
        </li>
        <li style={{ backgroundColor: isActive("/member") ? "#35c5f0" : "transparent" }} className="mt-3">
          <Link to="/member" className="nav-link text-white d-flex align-items-center  font-weight-bold">
            <FontAwesomeIcon icon={faUser} className="me-4" style={{width : 16,height : 16}} /> 회원관리
          </Link>
        </li>
        <li style={{ backgroundColor: isActive("/prod") ? "#35c5f0" : "transparent" }} className="mt-3">
          <Link to="/prod" className="nav-link text-white d-flex align-items-center  font-weight-bold">
          <FontAwesomeIcon icon={faGift}  className="me-4" style={{width : 16,height : 16}} /> 상품관리
          </Link>
        </li>
        <li style={{ backgroundColor: isActive("/popup") ? "#35c5f0" : "transparent" }} className="mt-3">
          <Link to="/popup" className="nav-link text-white d-flex align-items-center  font-weight-bold">
          <FontAwesomeIcon icon={faSignsPost} className="me-4" style={{width : 16,height : 16}} /> 팝업관리
          </Link>
        </li>
        <li style={{ backgroundColor: isActive("/cash") ? "#35c5f0" : "transparent" }} className="mt-3">
          <Link to="/cash" className="nav-link text-white d-flex align-items-center  font-weight-bold">
            <FontAwesomeIcon icon={faSackDollar} className="me-4"style={{width : 16,height : 16}} /> 결제관리
          </Link>
        </li>
        <li style={{ backgroundColor: isActive("/qna") ? "#35c5f0" : "transparent" }} className="mt-3">
          <Link to="/qna" className="nav-link text-white d-flex align-items-center  font-weight-bold">
          <FontAwesomeIcon icon={faCommentDots}  className="me-4"style={{width : 16,height : 16}} /> QNA
          </Link>
        </li>
        <li style={{ backgroundColor: isActive("/fwl") ? "#35c5f0" : "transparent" }} className="mt-3">
          <Link to="/fwl" className="nav-link text-white d-flex align-items-center  font-weight-bold">
          <FontAwesomeIcon icon={faRectangleXmark}  className="me-4"style={{width : 16,height : 16}} /> FWL
          </Link>
        </li>
        <li >
          <Link to="http://hof.lshwan.com/grafana" className="nav-link text-white d-flex align-items-center  font-weight-bold mt-3">
          <FontAwesomeIcon icon={faDesktop}  className="me-4" style={{width : 16,height : 16}} /> 모니터링 서비스
          </Link>
        </li>

        <hr />
        <li>
          <Link to="/login" className="nav-link text-white d-flex align-items-center mt-3">
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
