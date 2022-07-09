import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useLocation } from "react-router";

import Header from "../components/Header";
import SaveItemList from "../components/SaveItemList";
import { ReactComponent as UpArrow } from "../public/img/svg/UpArrow.svg";
import { ReactComponent as Star } from "../public/img/svg/Star.svg";
import { ReactComponent as StarColor } from "../public/img/svg/StarColor.svg";

function History() {
  const [onToggle, setOnToggle] = useState(false);
  const [blocks, setBlocks] = useState(false);

  const active = (e) => {
    setOnToggle(current => !current);
    setBlocks(current => !current);
  }

  const a = [
    {
      id: 1,
      title: "택시비",
      year: "2022",
      day: "07.08",
      price: "8000",
    },
    {
      id: 2,
      title: "물",
      year: "2022",
      day: "07.08",
      price: "1000",
    }
  ]

  const b = [
    {
      id: 1,
      title: "로봇청소기",
      year: "2022",
      month: "08",
    },
    {
      id: 2,
      title: "에어컨",
      year: "2022",
      month: "08",
    },
  ]


  return (
    <>
      <Header />
      <HistoryWrap>
        <Total>총 <span>{b.length}</span>개 태산</Total>
        <HistoryList>
          <ul>
            {b && b.map((list, idx) => (
              <li key={"a" + list.id}>
                <GoalList>
                  <ToggleBtn onClick={active} trans={onToggle}><UpArrow /></ToggleBtn>
                  <span>{b[idx].year}년 {b[idx].month}월</span>
                  <h2>{b[idx].title}</h2>
                </GoalList>
                <SaveItemList toggle={blocks} list={a} />
              </li>
            ))}
          </ul>
        </HistoryList>
      </HistoryWrap>
    </>
  )
};


export default History;

const HistoryWrap = styled.div`
width: 100%;
`

const Total = styled.div`
  margin: 0 auto;
  height: 90px;
  text-align: center;
  line-height: 90px;
  font-size: 1.87rem;
  font-weight: 700;
  span{
    color: #26DFA6;
  }
`

const GoalList = styled.div`
  border-bottom: 1px solid #CCCCCC;
  overflow: hidden;
  height: 2.5rem;
  line-height: 2.5rem;
  padding: 0 25px;

h2{
  float: right;
  font-size:1.25rem;
  font-weight: 700;
}

span{
  padding-left: 10px;
  font-weight: 700;
  font-size:1.25rem;
}
`

const HistoryList = styled.div`
  

`
const ToggleBtn = styled.button`
  border:none;
  background: none;
  transform: ${props => (props.trans ? 'rotate(180deg)' : 'rotate(0deg)')};
  /* transform: rotate(); */
`

// SaveItemList = styled.div`

// /* display: ${props => (props.dis ? 'block' : 'none')}; */


// `
