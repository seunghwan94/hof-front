// src/components/CategoryBar.js
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome,  faCommentDots,faSackDollar,faSignsPost, faGift,faUser,faRectangleXmark,faArrowRightFromBracket,faDesktop} from "@fortawesome/free-solid-svg-icons";
import Logo from "../../components/layout/Logo";


const CategoryBar = () => {

  

  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 bg-dark text-white my-3 ms-3 rounded-3 shadow" style={{
      width: "250px",
      height: "95vh",
      maxHeight: "95vh",
      overflow: "hidden",
    }}>
      
      {/* <HofLogo  style={{ width:"125", height:"50"}} className = "mt-3"/> */}
      <Logo color="white" />
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link to="/" className="nav-link text-white d-flex align-items-center">
            <FontAwesomeIcon icon={faHome} className="me-4 " style={{width : 16,height : 16}}/> Dashboard
          </Link>
        </li>
        <li>
          <Link to="/tables" className="nav-link text-white d-flex align-items-center mt-3">
            <FontAwesomeIcon icon={faUser} className="me-4" style={{width : 16,height : 16}} /> 회원관리
          </Link>
        </li>
        <li>
          <Link to="/billing" className="nav-link text-white d-flex align-items-center mt-3">
          <FontAwesomeIcon icon={faGift}  className="me-4" style={{width : 16,height : 16}} /> 상품관리
          </Link>
        </li>
        <li>
          <Link to="/profile" className="nav-link text-white d-flex align-items-center mt-3">
          <FontAwesomeIcon icon={faSignsPost} className="me-4" style={{width : 16,height : 16}} /> 팝업관리
          </Link>
        </li>
        <li>
          <Link to="/profile" className="nav-link text-white d-flex align-items-center mt-3">
            <FontAwesomeIcon icon={faSackDollar} className="me-4"style={{width : 16,height : 16}} /> 결제관리
          </Link>
        </li>
        <li>
          <Link to="/profile" className="nav-link text-white d-flex align-items-center mt-3">
          <FontAwesomeIcon icon={faCommentDots}  className="me-4"style={{width : 16,height : 16}} /> QNA
          </Link>
        </li>
        <li>
          <Link to="/profile" className="nav-link text-white d-flex align-items-center mt-3">
          <FontAwesomeIcon icon={faRectangleXmark}  className="me-4"style={{width : 16,height : 16}} /> FWL
          </Link>
        </li>
        <li>
          <Link to="/profile" className="nav-link text-white d-flex align-items-center mt-3">
          <FontAwesomeIcon icon={faDesktop}  className="me-4" style={{width : 16,height : 16}} /> 모니터링 서비스
          </Link>
        </li>

        <hr />
        <li>
          <Link to="/profile" className="nav-link text-white d-flex align-items-center ">
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
