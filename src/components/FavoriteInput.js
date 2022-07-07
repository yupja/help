import React, { useRef, useState, useEffect } from "react"
import { useDispatch } from "react-redux";

import Category from "./Category"

import { BsPlus } from 'react-icons/bs'
import { BiMinus } from 'react-icons/bi'
import styled from "styled-components";


const FavoriteInput = ()=>{
    const dispatch = useDispatch();


    const itemName = useRef()
    const [category , setCategory] = useState("")
    const [price, setPrice] = useState(0)
    

    function onlynumber(e) { // 천원단위 끊는거 구현하기 
	    let str = e.target.value
        setPrice(str);
	}

    const addFavorite=()=>{
        console.log("잘 오고있니?");
        console.log(itemName.current.value, category, price)

    }
    
    return(
        <>
        <SelectDesign>
            <Category setCategory={setCategory}/>
            
            <ItemName>
                <p>이름</p>
                <input 
                      type="text"
                      ref={itemName}
                      />
            </ItemName>

            <PriceSet>
                <p>가격</p>
                    <div>
                        <BsPlus/>
                            <input onChange={onlynumber}>
                            </input>
                        <BiMinus/>
                    </div>
           </PriceSet>
        </SelectDesign>

        <Footer
             onClick={addFavorite}>
            <label>티끌 등록하기</label>

        </Footer>
        </>
    )
}



const SelectDesign = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
padding: 16px;
`;

const ItemName = styled.div`
margin: 5%;
display: flex;
justify-content: center;
flex-direction: row;
    p{
        display: flex;
        align-items: center;
        margin-right: 20px;
    }

    input{
    border-radius: 20px;
    font-size: 16px;
    padding: 10px;
    }
`;

const PriceSet = styled.div`
width: 100%;
display: flex;
align-items: center;
justify-content: center;
padding: 10px;

    p{
        flex: 0.5;
    }
    div{
    flex: 2;
    border: 1px solid;
    border-radius: 20px;
    padding: 5px;
    }
    input{
    font-size: 16px;
    padding: 5px;
    border: none;
    }
`;



const Footer = styled.div`
padding: 16px;
background: #26DFA6;
text-align: right;
color: white;
font-weight: bold;
display: flex;
justify-content: center;
`;






export default FavoriteInput