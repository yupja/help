import React, { useRef, useState } from "react";
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { findPwDB } from "../redux/modules/user";
import { useSelector } from "react-redux/es/exports";
import { useNavigate } from "react-router-dom";


const FindPw = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state.user);
  console.log(state)
  const [findPwPop, setfindPwPop] = useState(false);

  const emailRef = useRef();
  const idRef = useRef();

  const [userIdAlert, setUserIdAlert] = useState('');
  const [userEmailAlert, setUserEmailAlert] = useState('');
  const emailCheckStr = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  const idCheckStr = /^(?=.*[a-z])(?=.*\d)[a-z\d]{3,10}$/;

  const emailCheck = (e) => {
    const email = emailRef.current.value;

    console.log(email)
    if (emailCheckStr.test(email)) {
      setUserEmailAlert("통과:)")
    } else {
      setUserEmailAlert("이메일 형식을 맞춰주세요")
    }
  }

  const idCheck = (e) => {
    const id = idRef.current.value;

    console.log(id)
    if (idCheckStr.test(id)) {
      setUserIdAlert("통과")
    } else {
      setUserIdAlert("아이디 형식을 맞춰주세요")
    }
  }


  // 버튼 클릭시 결과 컴포넌트 보이게
  const onResult = (e) => {
    const id = idRef.current.value;
    const email = emailRef.current.value;
    const findInfo = {
      username: id,
      email: email
    }
    if (userEmailAlert === '통과:)' || userIdAlert === '통과') {
      console.log("다음!")
      dispatch(findPwDB(findInfo, setfindPwPop))
      setfindPwPop(true) // 디스패치 먼저 실행 후 결과 팝업 생성
    } else {
      alert("이메일을 입력해주세요!")
    }
  }

  return (
    <>
      <h2>비밀번호를 찾기 위해<br />정보를 입력해주세요</h2>
      <input type="text" placeholder="아이디" ref={idRef} onChange={idCheck} />
      <p>{userIdAlert}</p>
      <input type="text" placeholder="이메일" ref={emailRef} onChange={emailCheck} />
      <p>{userEmailAlert}</p>
      <button onClick={onResult}>다음</button>

      {findPwPop ? (
        <>
          <div><img src="" alt="" /></div>
          <h2>{state.findPwResult}</h2>
          <button onClick={() => navigate('/')}>확인</button>
        </>
      ) : null
      }
    </>
  )
}

export default FindPw;
