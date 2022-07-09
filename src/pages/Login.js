import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import DayModal from "../components/DayModal";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { LoginDB } from "../redux/modules/user";
import { useNavigate } from "react-router-dom";

import HeaderMenue from "../components/HeaderMenu";

function Login() {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user)

  const [modalOpen, setModalOpen] = useState(false);
  const [modalState, setModalState] = useState();
  const [modalName, setModalName] = useState("");


  const openModal = () => { setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); };

  console.log(userState);
  console.log(localStorage.getItem("accessToken"));
  const navigate = useNavigate();


  // 로그인 정보 가져오기
  const userId = useRef();
  const userPw = useRef();


  const [navToggles, setNavToggles] = useState(false);
  const [ModalStr, setModalStr] = useState('');

  // const onNav = (e) => {
  //   setNavToggles(true)
  // }
  const closeNav = (e) => {
    setNavToggles(false)
  }

  // 로그인 버튼 클릭시
  const login = (e) => {
    e.preventDefault();

    const loginInfo = {
      username: userId.current.value,
      password: userPw.current.value,
    }

    // 빈 항목 체크
    if (userId.current.value === "" || userPw.current.value === "") {
      setModalStr('아이디 또는 비밀번호를 확인해 주세요')
      setNavToggles(true)
      return;
    }
    dispatch(LoginDB(loginInfo, setModalStr, setNavToggles));
    // navigate(-1);
  }

  return (
    <>
      <div className="topWrap">
        <HeaderMenue state={state} />
      </div>
      <LoginWrap>
        <Title>안녕하세요.<br />데이-킵입니다.</Title>
        <p>서비스 이용을 위해 로그인해주세요.</p>
        <Form>
          <label htmlFor="userId">
            <input
              type="text"
              id="userId"
              placeholder="아이디를 입력해주세요."
              ref={userId}
            />
          </label>
          <label htmlFor="userPw">
            <input
              type="password"
              id="userPw"
              placeholder="비밀번호를 입력해주세요."
              ref={userPw}
            />
          </label>
          <InputBtn onClick={login}>로그인하기</InputBtn>
        </Form>
        <div>
          <Link to="/signup">회원가입</Link>
          <Link to="/user/findid">아이디 찾기</Link>
          <Link to="/user/findpw">비밀번호 찾기</Link>
        </div>
        <ul>
          <li>카카오로 시작하기</li>
          <li>구글로 시작하기</li>
          <li>네이버로 시작하기</li>
        </ul>
      </LoginWrap>
      {navToggles ?
        <ModalWrap>
          <ModalBox>
            <div className="icon">아이콘</div>
            <CloseBtn onClick={closeNav}>
              <span></span>
              <span></span>
            </CloseBtn>
            <h3>{ModalStr}</h3>
            <button onClick={closeNav}>닫기</button>
          </ModalBox>
        </ModalWrap>
        : null
      }
    </>
  )
};

export default Login;

const ModalWrap = styled.div`
width: 100%;
height: 100vh;
`
const ModalBox = styled.div`
width: 100%;
padding: 0 25px;
background: #fff;
border-radius: 5px;

.icon {
  width: 2.5rem;
  height: 2.5rem;
  background: #d9d9d9;
  margin:  10px auto 0;
}
`

const CloseBtn = styled.div`
width:1rem; //180px
height: 1rem;
margin-top: 10px;
position:absolute;
top: 0; right: 3%;

span {
  display:block;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width:100%;
  height:2px;
  background-color: #999999;
}
span:first-child{
  transform: rotate(45deg) translateX(0%);
  }
span:last-child{
  transform: rotate(135deg) translateX(0%);
  }
`;

const LoginWrap = styled.div`
width: 100%;
padding: 0 25px;
p{
  margin-bottom: 45px;
}
`

const Title = styled.h1`
margin-top: 33px;
font-size: 1.75rem;
line-height: 2.75rem;
`

const Form = styled.form`
width: 100%;
margin: 0 auto;
  
label{
  display: block;
  text-align: left;
}
p{
  margin:0;
  font-weight: 700;
}
input {
  outline: none;
  width:100%;
  background:#fff;
  border: none;
  padding: 16px 10px;
  font-size: 16px;
  margin-top: 10px;
  border-bottom: 1px solid #EAEEEF;
  box-sizing: border-box;
  border-radius: 2px;
}
input::placeholder {
  color: #C2C2C2;
}
`;

const InputBtn = styled.button`
  display: block;
  width: 100%;
  padding: 16px 10px;
  margin-top: 20px;
  background: #26DFA6;
  border: none;
  color:#fff;
  font-size: 18px;
  cursor: pointer;
  border-radius: 32px;
`;