import React, { useRef, useState } from "react";
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import FindidResult from "../components/FindIdResult";
import { useSelector } from "react-redux/es/exports";
import { findIdDB } from "../redux/modules/user";


const FindId = () => {

  const dispatch = useDispatch();
  const state = useSelector((state) => state.user.findIdResult);


  const [findId, setFindId] = useState(false);

  const emailRef = useRef();

  const [userEmailAlert, setUserEmailAlert] = useState('');
  const emailCheckStr = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

  const emailCheck = () => {
    const email = emailRef.current.value;

    console.log(email)
    if (emailCheckStr.test(email)) {
      setUserEmailAlert("통과:)")
    } else {
      setUserEmailAlert("이메일 형식을 맞춰주세요")
    }
  }


  // 버튼 클릭시 결과 컴포넌트 보이게
  const onResult = (e) => {
    const email = emailRef.current.value;
    if (userEmailAlert === '통과:)') {
      console.log("다음!")
      dispatch(findIdDB(email))
      setFindId(true) // 디스패치 먼저 실행 후 실행
    } else {
      setUserEmailAlert("이메일을 입력해주세요!")
    }
  }

  return (
    <>
      {!findId ?
        (
          <>
            <h2>아이디를 찾기 위해<br />정보를 입력해주세요</h2>
            <input type="text" placeholder="이메일" ref={emailRef} onChange={emailCheck} />
            <p>{userEmailAlert}</p>
            <button onClick={onResult}>다음</button>
          </>) :
        < FindidResult findIdResult={state} />
      }
    </>
  )
}

export default FindId;
