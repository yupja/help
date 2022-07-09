import React, {useRef, useState} from "react"
import { useDispatch } from "react-redux"

import Category from "./Category"
import { addItem } from "../redux/modules/item"

import styled from "styled-components";
import user from "../redux/modules/user";

const GoalADD = ()=>{
  const dispatch = useDispatch()

  const [category , setCategory] = useState();
  const [image, setImage] = useState("null");
  const [imageFile, setImageFile] = useState("null");

  const itemName=useRef();
  const price=useRef();
  const goalItemCount=useRef();


  const imageUpLoad = async (e)=>{
    imagePreview(e.target.files[0]);
    setImageFile(e.target.files[0]);
  }

  const imagePreview = (fileBlob) =>{
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) =>{
      reader.onload = () => {
        setImage(reader.result);
        resolve();
      }
    })
  }



  const sendData = () =>{
    const data = {
      itemName: itemName.current.value,
      price: Number(price.current.value),
      goalItemCount: Number(goalItemCount.current.value),
      categoryId: Number(category),
      image: imageFile
    }

    dispatch(addItem(data));
  }




 return (
    <>
      <ModalBody>
        <div>
          <img src={image}/><br/>
          <input 
            type="file" 
            name="image" 
            multiple="multiple"
            onChange={imageUpLoad}/>
        </div> 
        <div>
          <Category  setCategory={setCategory}/>
        </div>
        
        <div> 
          <p>ItemName</p>
          <input 
            type='text' 
            ref={itemName} />
        </div>

        <div> 
          <p>Price</p>
          <input 
            type='text' 
            ref={price} />
        </div> 
        
        <div>
          <p>수량</p> 
          <input 
            type="Number" 
            ref={goalItemCount}/>
        </div>
      </ModalBody>

      <Footer onClick={sendData}>
        티끌 등록하기
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


const Footer = styled.button`
padding: 1rem;
background: #26DFA6;
text-align: right;
color: white;
font-weight: bold;
display: flex;
justify-content: center;
`

export default GoalADD