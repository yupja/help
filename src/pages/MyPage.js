import React from "react";
import styled from "styled-components";

import { useLocation } from "react-router";
import { Link } from "@mui/material";

import Header from "../components/Header";

function MyPage() {
  const { state } = useLocation();

  return (
    <>
      <Header />
      <MyPageWrap>
        <MyInfo>
          <div><img src="" alt="" /></div>
          <p>
            내가 나를 소개하는 글을 적어보도록 하겠습니다.
            바로 이자리에 말이죠 글자는 2줄로 지정 해보겠습니다.
          </p>
        </MyInfo>
        <MyMenu>
          <h2><span>석구</span>님<br />환영합니다!🖐</h2>
          <MenuList>
            <li>
              <Link to="/">
                <div><img src="" alt="" /></div>
                <p>즐겨찾기</p>
              </Link>
            </li>
            <li>
              <Link to="/">
                <div><img src="" alt="" /></div>
                <p>히스토리</p>
              </Link>
            </li>
            <li>
              <Link to="/">
                <div><img src="" alt="" /></div>
                <p>프로필 편집</p>
              </Link>
            </li>
          </MenuList>
          <Box>
            <h3>고객 지원</h3>
            <ul>
              <li>
                <div><img src="" alt="" /></div>
                <span>친구 초대하기</span>
              </li>
              <li>
                <div><img src="" alt="" /></div>
                <span>정보</span>
              </li>
              <li>
                <div><img src="" alt="" /></div>
                <span>고객의 소리</span>
              </li>
              <li>
                <div><img src="" alt="" /></div>
                <span>회원 탈퇴</span>
              </li>
            </ul>
          </Box>
        </MyMenu>
      </MyPageWrap>
      <LoginOutBtn>로그아웃</LoginOutBtn>
    </>
  )
};


export default MyPage;

const MyPageWrap = styled.div`
width: 100%;
/* padding: 0 25px; */
`
const MyInfo = styled.div`
width: 100%;
padding: 10px;
text-align: center;
div {
  width: 7.5rem;
  height: 7.5rem;
  background: #d9d9d9;
  margin: auto;
  border-radius: 50%;
}
p {
  padding-top: 10px;
  font-size: 0.87rem;
  color: #26DFA6;
  line-height: 1.12rem;
  font-weight: 700;
}
`
const MenuList = styled.ul`
 display: flex;
justify-content: space-between;

  li{
    position: relative;
    width: 6.24rem;
    height: 6.24rem;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0px 4px 11px 0px rgba(0, 0, 0, 0.15);
  }
  a{
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%,-50%);
    width: 100%;
    text-decoration: none;
  }
  div {
    width:2.5rem;
    height: 2.5rem;
    margin: 0 auto;
    background: #D9D9D9;
    border-radius: 50%;
  }
  p{
    margin-top: 5px;
    font-size : 1.12rem;
    letter-spacing: -3px;
    font-weight: 700;
    color: #333333;
  }
`
const MyMenu = styled.div`
height: 72.5vh;
background:#F8F8F8;
text-align: center;
padding:25px;

  h2 {
    font-size: 1.5rem;
    padding-bottom:25px;
    
  }
  span {
    color:#26DFA6;
  }
`
const Box = styled.div`
width: 100%;
margin-top: 50px;
text-align: left;

h3 {
  font-size : 1.12rem;
  letter-spacing: -3px;
  margin-bottom: 10px;
  font-weight: 700;
}
ul {
  width: 100%;
  overflow: hidden;
}

li{
  width: 50%;
  float: left;
  margin-bottom: 10px;
}
div {
  display: inline-block;
  width: 1.25rem;
  height: 1.25rem;
  background: #D9D9D9;
  border-radius: 50%;
}
span {
  padding-left: 5px;
  font-weight: 700;
  letter-spacing: -3px;
  color: #666666;
}
`
const LoginOutBtn = styled.div`
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
