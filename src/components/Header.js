import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";

// import NavToggle from "./NavToggle";
const slider = keyframes`
  from {
    transform: translateX(200px);
  }
  to {
    transform: translateX(0px);
  }
`;



function Header() {
  const navigate = useNavigate();
  const [navToggles, setNavToggles] = useState(false);

  const onNav = (e) => {
    setNavToggles(true)
  }
  const closeNav = (e) => {
    setNavToggles(false)
  }

  return (
    <HeaderWrap>
      {/* <svg width="10" height="16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M.5 8 8 .5l1.05 1.05L2.6 8l6.45 6.45L8 15.5.5 8Z" fill="#000" /></svg> */}
      <Title>로고</Title>
      <HamArea onClick={onNav}>
        <NavBtn>
          <div>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </NavBtn>
      </HamArea>
      {navToggles ?
        <>

          <Popup>
            <NavWrap>
              <CloseBtn onClick={closeNav}>
                <span></span>
                <span></span>
              </CloseBtn>
              <Menu>
                <li onClick={() => {
                  navigate("/", { state: "데일리 티끌" });
                }}>데일리 티끌</li>
                <li onClick={() => {
                  navigate("/community", { state: "티끌 자랑" });
                }}>티끌 자랑</li>
                <li onClick={() => {
                  navigate("/ranking", { state: "랭킹" });
                }}>랭킹</li>
                <li onClick={() => {
                  navigate("/mypage", { state: "마이페이지" });
                }}>My</li>
              </Menu>
              <Footer>
                {localStorage.getItem('accessToken') ?
                  <p onClick={()=>localStorage.removeItem('accessToken')}>로그아웃</p>
                  :
                  <>
                    <p onClick={() => {
                      navigate("/signup");
                    }}>회원가입</p>
                    <p onClick={() => {
                      navigate("/login");
                    }}>로그인</p>
                  </>
                }
              </Footer>
            </NavWrap>
          </Popup>
        </>
        : null
      }
    </HeaderWrap>
  );
}

export default Header;

const HeaderWrap = styled.div`
position: relative;
width:100%;
height: 44px;
background-color: #eee;
`;

const Title = styled.h1`
position:absolute;
top: 50%; left: 50%;
transform: translate(-50%,-50%);
`;

const HamArea = styled.div`
position:absolute;
top: 50%; right: 3%;
transform: translateY(-50%);
`;

const NavWrap = styled.div`
width:46vw; //180px
height: 100vh;
background-color: #fff;
position: absolute;
top: 0; right: 0;

button{

}
`;

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

const Menu = styled.ul`
margin-left:1.8rem; //30px
padding-top : 60px;
li {
  font-size: 1rem;
  padding:0.94rem 0;
}
`

const NavBtn = styled.div`


div {
  width:1rem;
  height: 12px;
  position: relative;
  cursor:pointer;
  }
  span {
    display:block;
    width:100%;
    height:1px;
    margin-bottom: 3px;
    background-color: black;
    transition:all .5s;
  }
  span:last-child{
    margin-bottom: 0;
  }

`;

const Footer = styled.div`
display: flex;
justify-content: space-around;
`;

const Popup = styled.div`
display:flex;
flex-direction: column;
position: absolute;
background-color: #ffffff;
box-shadow: 0 2px 7px rgba(0, 0, 0, 0.3);
width: 50%;
height: 100%;

animation-duration: 0.3s;
  animation-timing-function: ease-out;
  animation-name: ${slider};
  animation-fill-mode: forwards;
`;
