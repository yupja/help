import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { myFavoriteListRQ } from "../redux/modules/favorite"
import {allItemListRQ} from "../redux/modules/item"
import {addSavedListRQ} from "../redux/modules/saved"

import styled from 'styled-components'
import { BiX } from 'react-icons/bi'

import DayModal from "./DayModal"
import SavedInput from "./SavedInput"



function SearchFavorite() {

  useEffect(() => {
    dispatch(myFavoriteListRQ());
    dispatch(allItemListRQ());
  }, []);


  const dispatch = useDispatch();
  const list = useSelector((state) => state.item.allItemList);
  const mylist = useSelector((state) => state.favorite.myFavoriteList);
  
  const allFavoriteList = [];
  const makeList = list.data?.map((item) => {
    allFavoriteList.push(item.itemName);
  })

  //-------------- 모달
  const [modalOpen, setModalOpen] = useState(false);
  const [modalState, setModalState] = useState();
  const [modalName, setModalName] = useState("");
  const openModal = () => { setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); };


  //-------------- 드롭박스 제어 
  const [inputValue, setInputValue] = useState('');  // Input 값 제어
  const [isHaveInputValue, setIsHaveInputValue] = useState(false); // Input값이 있니 없니?
  const [dropDownItemIndex, setDropDownItemIndex] = useState(-1); // 선택한 아이템의 인덱스
  const [dropDownList, setDropDownList] = useState(list); // 검색List 

  

  const showDropDownList = () => {
    if (inputValue === '') {
      setIsHaveInputValue(false);
      setDropDownList([]);
    } else {
      const choosenTextList = allFavoriteList.filter(textItem =>
        textItem.includes(inputValue)
      )
      setDropDownList(choosenTextList);
    }
  }

  const changeInputValue = event => {
    setInputValue(event.target.value);
    setIsHaveInputValue(true);
  }

  const clickDropDownItem = clickedItem => {
    setInputValue(clickedItem);
    setIsHaveInputValue(false);
  }

  const handleDropDownKey = event => {
    if (isHaveInputValue) {
      if (
        event.key === 'ArrowDown' &&
        dropDownList.length - 1 > dropDownItemIndex
      ) {
        setDropDownItemIndex(dropDownItemIndex + 1)
      }

      if (event.key === 'ArrowUp' && dropDownItemIndex >= 0)
        setDropDownItemIndex(dropDownItemIndex - 1);
      if (event.key === 'Enter' && dropDownItemIndex >= 0) {
        clickDropDownItem(dropDownList[dropDownItemIndex]);
        setDropDownItemIndex(-1);
      }
    }
  }

  useEffect(showDropDownList, [inputValue]);

  return (
    <>
      <WholeBox>

        <InputBox isHaveInputValue={isHaveInputValue}>
            <input
              type='text'
              value={inputValue}
              onChange={changeInputValue}
              onKeyUp={handleDropDownKey}
              placeholder="오늘은 어떤걸 아끼셨나요?"
            />


            <DeleteButton onClick={() => setInputValue('')}>&times;</DeleteButton>
          </InputBox>

        {isHaveInputValue && (
          <DropDownBox>
            {dropDownList.length === 0 && (
              <DropDownItem>
                <AddFavoriteInput>
                  앗! 찾으시는게 아직 등록이 안되어있네요!<br />
                  새로 등록하시겠어요?
                </AddFavoriteInput>
                <AddButton onClick={() => {
                  openModal();
                  setModalState(<SavedInput closeModal={closeModal}/>)
                  setModalName("등록하기")
                }}>+등록하기</AddButton>
              </DropDownItem>
            )}

            {dropDownList.map((dropDownItem, dropDownIndex) => {
              return (
                <DropDownItem
                  key={dropDownIndex}
                  onClick={() => clickDropDownItem(dropDownItem)}
                  onMouseOver={() => setDropDownItemIndex(dropDownIndex)}
                  className={
                    dropDownItemIndex === dropDownIndex ? 'selected' : ''
                  }
                >
                  {dropDownItem}
                </DropDownItem>
              )
            })}
          </DropDownBox>
        )}


        <DayModal open={modalOpen} close={closeModal} header={modalName}>
          {modalState}
        </DayModal>

      </WholeBox>

      <ItemWrap>
        {mylist.length===0? 
        <FavoriteItem></FavoriteItem>
        :
          <> ⭐
            {mylist.map((item, itemIndex) => {
                return (
                  <FavoriteItem key={item.itemId} onClick={()=>{
                    dispatch(addSavedListRQ(item))
                  }}>
                    {item.itemName}
                    <BiX />
                  </FavoriteItem>
                )
            })}
           </>
        }

        </ItemWrap>
      </>
    )
  }


const WholeBox = styled.div`
  padding: 10px;
`;

const InputBox = styled.div`
display: flex;
margin-left:5px;
width:100%;
flex-direction: row;
padding: 10px;
border: 1px solid rgba(0, 0, 0, 0.3);
border-radius: 18px;
z-index: 3;   

  input{
    flex: 1 0 0;
    margin: 0;
    padding: 0;
    background-color: transparent;
    border: none;
    outline: none;
    font-size: 12px;
  }
`;


const DeleteButton = styled.div`
 cursor: pointer;
`;


const DropDownBox = styled.ul`
display: block;
margin-left:12px;
width:83%;
padding: 8px 0;
background-color: white;
border: 1px solid rgba(0, 0, 0, 0.3);
border-top: none;
border-radius: 0 0 16px 16px;
list-style-type: none;
position: absolute;
`;

const ItemWrap = styled.div`
display: flex;
align-items: center;
width:350px;
overflow-x:scroll;

white-space: nowrap;

  &::-webkit-scrollbar {
    display: none;
  }
`;
 

const FavoriteItem = styled.div`
margin-top: 5px;
display :inline-block;
background: #EFEFEF;
border-radius: 20px;
font-size: 15px;
padding: 5px;
margin-left: 10px;
`;


const AddFavoriteInput = styled.div`
text-align: center;
padding: 10px;
`;

const AddButton = styled.button`
background: #26DFA6;
color: white;
border: none;
border-radius: 20px;
padding: 10px;
width: 80%;
`;


const DropDownItem = styled.li`
  display : flex;
  flex-direction: column;
   padding: 0 12px;
  align-items: center;
  &.selected {
    background-color: lightgray;
  }
`



export default SearchFavorite;