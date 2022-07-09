import React, { useRef, useState } from "react";
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { Link } from "react-router-dom";
import { useSelector } from "react-redux/es/exports";
import { useParams } from "react-router-dom";
import { changePw } from "../redux/modules/user";

const FindPwChange = () => {
  //userid함께 리스트로 보내야하는데 현재 테스트 불가능!!!
  const params = new URLSearchParams(window.location.pathname);
  console.log(params.get("userId")) // ?뒤에 params가져옴,토큰, 닉네임, 아이디 다 가져옴


  const dispatch = useDispatch();

  // dispatch(getUserId());
  const state = useSelector((state) => state.user);



  const [findPwPop, setfindPwPop] = useState(false);

  const pwRef = useRef();
  const pwCheckRef = useRef();

  const [userPwAlert, setUserPwAlert] = useState('');
  const [userPwAChecklert, setUserPwCheckAlert] = useState('');

  const pwCheckStr = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,16}$/;


  const pwCheck = () => {
    const pw = pwRef.current.value;

    console.log(pw)
    if (pwCheckStr.test(pw)) {
      setUserPwAlert("")
    } else {
      setUserPwAlert("영문, 숫자, 특수문자를 최소 1개씩 혼합하여 입력해주세요")
    }
  }

  const pwChecks = () => {
    const pw = pwRef.current.value;
    const pwCheck = pwCheckRef.current.value;

    if (pw === pwCheck) {
      setUserPwCheckAlert("")
    } else {
      setUserPwCheckAlert("비밀번호가 일치하지 않습니다")
    }
  }


  // 버튼 클릭시 결과 컴포넌트 보이게
  const pwCheckResult = (e) => {
    const pw = pwRef.current.value;
    const checkPw = pwCheckRef.current.value;
    //토큰은 따로 저장하기
    const findInfo = {
      username: '', // url에서 가져오기
      password: pw,
      checkPassword: checkPw,
    }
    if (userPwAlert === '통과' || userPwAChecklert === '') {
      console.log("다음!")
      dispatch(changePw(findInfo))
      setfindPwPop(true) // 디스패치 먼저 실행 후 결과 팝업 생성
    } else {
      alert("비밀번호를 확인해주세요")
    }
  }

  return (
    <>
      <h2>새로운 비밀번호를<br />입력해주세요</h2>
      <form>
        <label htmlFor="userPw">
          <input type="password" id="userPw" placeholder="비밀번호를 입력해주세요" ref={pwRef} onChange={pwCheck} />
        </label>
        <p>{userPwAlert}</p>
        <label htmlFor="checkPassword">
          <input type="password" id="checkPassword" placeholder="비밀번호를 다시 입력해주세요" ref={pwCheckRef} onChange={pwChecks} />
        </label>
        <p>{userPwAChecklert}</p>
      </form>
      <button onClick={pwCheckResult}>로그인하기</button>
      {state.result ?
        <div>
          팝업내용 {state.respMsg}성공
        </div>
        : <div>
          팝업내용 {state.respMsg}실패
        </div>
      }
    </>
  )
}

export default FindPwChange;
