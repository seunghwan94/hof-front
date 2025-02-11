// src/components/CategoryBar.js
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome,  faCommentDots,faSackDollar,faSignsPost, faGift,faUser,faRectangleXmark,faArrowRightFromBracket} from "@fortawesome/free-solid-svg-icons";


const CategoryBar = () => {
  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 bg-dark text-white vh-100" style={{ width: "250px" }}>
      <h4 className="text-center">로고</h4>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link to="/" className="nav-link text-white d-flex align-items-center">
            <FontAwesomeIcon icon={faHome} className="me-2" /> Dashboard
          </Link>
        </li>
        <li>
          <Link to="/tables" className="nav-link text-white d-flex align-items-center">
            <FontAwesomeIcon icon={faUser} className="me-2" /> 회원관리
          </Link>
        </li>
        <li>
          <Link to="/billing" className="nav-link text-white d-flex align-items-center">
          <FontAwesomeIcon icon={faGift}  className="me-2" /> 상품관리
          </Link>
        </li>
        <li>
          <Link to="/profile" className="nav-link text-white d-flex align-items-center">
          <FontAwesomeIcon icon={faSignsPost} className="me-2" /> 팝업관리
          </Link>
        </li>
        <li>
          <Link to="/profile" className="nav-link text-white d-flex align-items-center">
            <FontAwesomeIcon icon={faSackDollar} className="me-2" /> 결제관리
          </Link>
        </li>
        <li>
          <Link to="/profile" className="nav-link text-white d-flex align-items-center">
          <FontAwesomeIcon icon={faCommentDots}  className="me-2" /> QNA
          </Link>
        </li>
        <li>
          <Link to="/profile" className="nav-link text-white d-flex align-items-center">
          <FontAwesomeIcon icon={faRectangleXmark}  className="me-2" /> FWL
          </Link>
        </li>
        <li>
          <Link to="/profile" className="nav-link text-white d-flex align-items-center">
          <FontAwesomeIcon icon={faArrowRightFromBracket}  className="me-2" /> SignOut
          </Link>
        </li>
        <hr />
      </ul>
      <hr />

    </div>
  );
};

export default CategoryBar;
