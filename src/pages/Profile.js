import React from "react";
import styled from "styled-components";

import { useLocation } from "react-router";

import Header from "../components/Header";

function Proflie() {
  const { state } = useLocation();

  return (
    <>
      <Header />
      <ProflieWrap>
        <MyInfo>
          <ProflieImg><img src="" alt="" /><div className="icon"></div></ProflieImg>
          <Nick><span>석구</span>님</Nick>
          <p className="word">
            내가 나를 소개하는 글을 적어보도록 하겠습니다.
            바로 이자리에 말이죠 글자는 2줄로 지정 해보겠습니다.
          </p>
          <SubInfo>
            <div>
              <span>아이디</span>
              <p>eunjin123</p>
            </div>
            <div>
              <span>이메일</span>
              <p>eunjin@naver.com</p>
              <button>변경</button>
            </div>
          </SubInfo>
        </MyInfo>
        <EditBtn>적용하기</EditBtn>
        <LoginOutBtn>로그아웃</LoginOutBtn>
      </ProflieWrap>
    </>
  )
};


export default Proflie;

const ProflieWrap = styled.div`
width: 100%;
padding: 0 25px;
text-align: left;
`

const MyInfo = styled.div`
width: 100%;
padding: 10px;
text-align: center;

.word {
  padding: 10px;
  font-size: 0.87rem;
  color: #26DFA6;
  line-height: 1.12rem;
  font-weight: 700;
  border: 1px solid #ccc;
  border-radius : 5px;
}
`

const Nick = styled.h1`
font-size: 1.5rem;
margin: 15px 0 10px;
span {
  color:#26DFA6;
}
`

const ProflieImg = styled.div`
  position: relative;
  width: 10.6rem;
  height: 10.6rem;
  background: #d9d9d9;
  margin: auto;
  border-radius: 50%;
  .icon{
    position: absolute;
    right: 0; bottom:0;
    border-radius: 50%;
    background: #666;
    width: 2.5rem;
    height: 2.5rem;
  }
`
const SubInfo = styled.div`
padding-top: 30px; 
text-align: left;

div {
}
span {
  font-size: 1rem;
}
p{
  display: inline-block;
  padding-left: 20px;
  font-weight: 600;
}

button{
  border: 1px solid #999;
  border-radius : 39px;
  padding: 5px 20px;
  color: #999999;
  background:none;
}
`

const EditBtn = styled.button`
position: absolute;
bottom: 80px; left: 50%;
transform: translateX(-50%);
color: #fff;
letter-spacing: -3px;
border: none;
background: #26DFA6;
font-size: 1.12rem;
font-weight: 700;
height: 50px;
line-height: 50px;;
border-radius: 32px;
width: 100%;
`
const LoginOutBtn = styled.button`
position: absolute;
bottom: 50px; left: 50%;
transform: translateX(-50%);
text-decoration: underline;
color: #999;
letter-spacing: -3px;
border: none;
background: none;
font-size: 1.12rem;
font-weight: 700;

`
