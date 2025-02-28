// MemberDetailModal.js
import React from "react";
import { Modal, Button, Table } from "react-bootstrap";

const MemberDetailModal = ({ show, handleClose, member }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>회원 상세보기</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {member ? (
          <Table bordered>
            <tbody>
              <tr>
                <th>회원 번호</th>
                <td>{member.mno}</td>
              </tr>
              <tr>
                <th>회원 ID</th>
                <td>{member.id}</td>
              </tr>
              <tr>
                <th>이름</th>
                <td>{member.name}</td>
              </tr>
              <tr>
                <th>권한</th>
                <td>{member.role}</td>
              </tr>
              <tr>
                <th>성별</th>
                <td>{member.gender}</td>
              </tr>
              <tr>
                <th>도로명주소</th>
                <td>{member.roadAddr}</td>
              </tr>
              <tr>
                <th>상세주소</th>
                <td>{member.detailAddr}</td>
              </tr>
              <tr>
                <th>우편번호</th>
                <td>{member.zipcode}</td>
              </tr>
              <tr>
                <th>마케팅수신동의</th>
                <td>{member.marketingConsent == true ? "동의":"비동의"}</td>
              </tr>
              <tr>
                <th>개인정보 동의</th>
                <td>{member.privacyConsent == true ? "동의":"비동의"}</td>
              </tr>
              <tr>
                <th>알림 수신 동의</th>
                <td>{member.allowNotification == true ? "동의":"비동의"}</td>
              </tr>
              <tr>
                <th>가입 일자</th>
                <td>{member.regDate ? member.regDate : "등록일자가 없습니다"}</td>
              </tr>
              {/* <tr>
                <th>이메일</th>
                <td>{member.memberDetail.email ? member.memberDetail.email : "등록된 이메일이없습니다"}</td>
              </tr> */}

            </tbody>
          </Table>
        ) : (
          <p>회원 데이터를 불러올 수 없습니다.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          닫기
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MemberDetailModal;
