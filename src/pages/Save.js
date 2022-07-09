import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { myReadGoalRQ } from "../redux/modules/goal"
import { readSaveListRQ } from "../redux/modules/saved"

import DayModal from "../components/DayModal";
import SearchFavorite from "../components/SearchFavorite";
import HeaderMenue from "../components/HeaderMenu";
import DountChart from "../components/Goal";
import GoalADD from "../components/GoalAdd"

import styled from "styled-components";
import "../public/css/saveMain.css"
import { FaRegEdit } from 'react-icons/fa'
import { IoArrowRedoOutline } from 'react-icons/io5'
import { AiOutlineStar } from 'react-icons/ai'


function Save() {
  useEffect(() => {
    dispatch(myReadGoalRQ());
    //dispatch(readSaveListRQ());
  }, []);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalState, setModalState] = useState();
  const [modalName, setModalName] = useState("");

  const [isGoalItem, setGoalItem] = useState(-1);


  const dispatch = useDispatch();


  const openModal = () => { setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); };

  const myGoalList = useSelector((state=> state.goal.allGoalList));
  const mySavedList = useSelector((state) => state.saved.saveList);
  console.log(myGoalList)
  const state = "데일리 티끌"

  return (
    <div className="wrap">
      <TopWrap>
        <HeaderMenue state={state} />
        <GoalMain>
          { isGoalItem ===-1?
            <>  <Circle onClick={() => {
              openModal();
              setModalName("내 목표 만들기!")
              setModalState(<GoalADD />)
            }}>
              <p className="circleInP">+ 태산 만들기!</p>
            </Circle>
              <p className="goalTitle">티끌모아 태산!</p>
            </>
            :
            <>
              <DountChart color="#9bd728" percent={0.75} size="200px" />
              <div className="circle" style={{ background: "rgba(0, 0, 0, 0.5)" }}>
                <div className="isGoalSubmenuBox">
                  <div>
                    <FaRegEdit size="15" />
                    <p>목표 변경</p>
                  </div>
                  <div>
                    <IoArrowRedoOutline size="15" />
                    <p>내 현황 공유</p>
                  </div>
                </div>
              </div>
              <p className="goalTitle">로봇청소기</p>
            </>
          }
        </GoalMain>
      </TopWrap>

      <FavoriteArea>
        <SearchFavorite />
      </FavoriteArea>

      <SavedList>

        {/* {mySavedList.length === 0 ? */}
          <>
            <NoSaveList>
              👆
              <p>오늘은</p>
              <p>무엇을 아끼셨나요?</p>
              <p style={{ color: "#26DFA6" }}>등록해 보세요!</p>

            </NoSaveList>
          </>
          :
          <>
            {mySavedList && mySavedList.map((savedItem, savedItemIndex) => (
              <>
                <div className="sListWrap">
                  <div className="star"><AiOutlineStar /></div>
                  <p className="date">{savedItem.createdAt}<br /></p>
                  <p>{savedItem.categoryName}</p>
                  <p>{savedItem.itemName}</p>
                  <button>수정</button>
                  <button>삭제</button>
                </div>
              </>
            ))}
          </>
        {/* } */}
      </SavedList>

      <DayModal open={modalOpen}
        close={closeModal}
        header={modalName}>
        {modalState}
      </DayModal>
    </div>
  );
}


const NoSaveList = styled.div`
display: flex;
flex-direction: column;
text-align: center;
justify-content: center;
font-size: 2rem;

`;

const TopWrap = styled.div`
display: flex;
width: 100%;
height: 45vh;
padding: 10px;
flex-direction: column;
background: #EFEFEF;
align-items: center;
`;

const GoalMain = styled.div`

display: flex;
justify-content: center;
flex-direction: column;
align-items: center;
height: 100%;


`;

const Circle = styled.div`
width: 180px;
height: 180px;
border-radius: 50%;
background:  #26DFA6;
color : white;

display: flex;
align-items: center;
justify-content: center;
`;


const FavoriteArea = styled.div`
padding: 0.2rem;
width: 95%;
height: 10vh;
display: flex;
flex-direction: column;
`;


const SavedList = styled.div`
display: flex;
height: 30vh;
p{
    padding-top: 1rem;
}

`;

export default Save;