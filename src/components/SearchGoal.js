import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"

import styled from 'styled-components'
import { allReadGoalRQ } from "../redux/modules/goal"


function SearchGoal() {

  const dispatch = useDispatch();
 
  useEffect(() => {
    dispatch(allReadGoalRQ())
  },[]);

  
  const [inputValue, setInputValue] = useState('')  // Input 값 제어
  const [isHaveInputValue, setIsHaveInputValue] = useState(false) // Input값이 있니 없니?
  const [dropDownItemIndex, setDropDownItemIndex] = useState(-1) // 선택한 아이템의 인덱스

  const list = useSelector((state) => state.goal.allGoalList);
  const [dropDownList, setDropDownList] = useState(list) // 검색List 

  const a = []
  const b  = list.map( (item, indx )=>{
    a.push(item.itemName);
  })
 

  const showDropDownList = () => {
    if (inputValue === '') {
      setIsHaveInputValue(false)
      setDropDownList([])
    } else {
      const choosenTextList = a.filter(textItem =>
        textItem.includes(inputValue)
      )
      setDropDownList(choosenTextList)
    }
  }

  const changeInputValue = event => {
    setInputValue(event.target.value)
    setIsHaveInputValue(true)
  }

  const clickDropDownItem = clickedItem => {
    setInputValue(clickedItem)
    setIsHaveInputValue(false)
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
        setDropDownItemIndex(dropDownItemIndex - 1)
      if (event.key === 'Enter' && dropDownItemIndex >= 0) {
        clickDropDownItem(dropDownList[dropDownItemIndex])
        setDropDownItemIndex(-1)
      }
    }
  }

  useEffect(showDropDownList, [inputValue])

  return (
    <WholeBox>

      <InputBox isHaveInputValue={isHaveInputValue}>
        <Input
          type='text'
          value={inputValue}
          onChange={changeInputValue}
          placeholder="오늘은 어떤걸 아끼셨나요?"
        />


        <DeleteButton onClick={() => setInputValue('')}>&times;</DeleteButton>
      </InputBox>
      {isHaveInputValue && (
        <DropDownBox>
          {dropDownList.length === 0 && (
            <DropDownItem><p onClick={() => {
              alert("이거되면 코드리뷰각");
            }}>항목을 등록하시겠어요?</p></DropDownItem>
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
    </WholeBox>
  )
}

const activeBorderRadius = '16px 16px 0 0'
const inactiveBorderRadius = '16px 16px 16px 16px'

const WholeBox = styled.div`
  padding: 10px;
`

const InputBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 16px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: ${props =>
    props.isHaveInputValue ? activeBorderRadius : inactiveBorderRadius};
  z-index: 3;

  &:focus-within {
    box-shadow: 0 10px 10px rgb(0, 0, 0, 0.3);
  }
`

const Input = styled.input`
  flex: 1 0 0;
  margin: 0;
  padding: 0;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 16px;
`

const DeleteButton = styled.div`
  cursor: pointer;
`

const DropDownBox = styled.ul`
  display: block;
  margin: 0 auto;
  padding: 8px 0;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-top: none;
  border-radius: 0 0 16px 16px;
  box-shadow: 0 10px 10px rgb(0, 0, 0, 0.3);
  list-style-type: none;
  z-index: 3;
`

const DropDownItem = styled.li`
  padding: 0 16px;

  &.selected {
    background-color: lightgray;
  }
`

export default SearchGoal;