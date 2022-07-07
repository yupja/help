import React, {useRef, useState} from "react"
import { useDispatch } from "react-redux"

import Category from "./Category"
import { addGoalRQ } from "../redux/modules/goal"

import styled from "styled-components";

const GoalADD = ()=>{
    const dispatch = useDispatch()

    const [category , setCategory] = useState()

    const itemName = useRef()
    const price = useRef()
    const goalItemCount = useRef()


    const sendData = () =>{
        const data = {
            itemName: itemName.current.value,
            price: price.current.value,
            goalItemCount: goalItemCount.current.value,
            category: Number(category)
        }

        dispatch(addGoalRQ(data))
    }

    return (
        <>
        <ModalBody> 
            <div><Category  setCategory={setCategory}/></div>
            <div> <p>ItemName</p> <input type='text' ref={itemName}/></div>
            <div> <p>Price</p> <input type='text' ref={price}/></div> 
            <div><p>수량</p> <input type="Number" ref={goalItemCount}/></div>
        </ModalBody>

        <Footer onClick={sendData}>
        <label>티끌 등록하기</label>

        </Footer>
        </>
    )

}


const ModalBody = styled.div`
display: flex;
flex-direction: column;
align-items: center;

div{
    display: flex;
    padding: 0.5rem;
    align-items: center;
    }
p{
    margin-right: 0.5rem;
}

`;


const Footer = styled.div`
padding: 1rem;
background: #26DFA6;
text-align: right;
color: white;
font-weight: bold;
display: flex;
justify-content: center;
`

export default GoalADD