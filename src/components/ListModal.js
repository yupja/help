import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { useParams } from "react-router-dom";
import { loadsavedAc } from "../redux/modules/saved";
import { loadCommentAc } from "../redux/modules/comment";

const ListModal = (props) => {

  const dispatch = useDispatch();
  const params = useParams();

  const saveData = useSelector((state) => state.saved.savedItem.data.savedItemList);
  const saveDataa = useSelector((state) => state.saved.savedItem.data);
  console.log(saveData,"save")
  console.log(saveDataa,"savee")

  console.log(props.forsaveId,"props")
  const boardId = (props.forsaveId)
  console.log(boardId,"boardId")

  React.useEffect(() => {
    dispatch(loadsavedAc(boardId))
    // dispatch(loadCommentAc())
},[])

    return (
      <>
      {props.showModall ?

        <Background>
            <ModalBox onClick={e => e.stopPropagation()}>
                <CommentBox>
                    <Top>
                      <Icon>
                        <svg width="28" height="35" viewBox="0 0 28 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M25 0H2.5C1.11986 0.00137807 0.00137807 1.11986 0 2.5V33.75C0 34.4404 0.559644 35 1.25 35H2.5C2.89349 35.0002 3.26406 34.8149 3.5 34.5L6.25 30.8337L9 34.5C9.24574 34.7994 9.61268 34.9729 10 34.9729C10.3873 34.9729 10.7543 34.7994 11 34.5L13.75 30.8337L16.5 34.5C16.7457 34.7994 17.1127 34.9729 17.5 34.9729C17.8873 34.9729 18.2543 34.7994 18.5 34.5L21.25 30.8337L24 34.5C24.2361 34.8148 24.6066 35 25 35H26.25C26.9404 35 27.5 34.4404 27.5 33.75V2.5C27.4986 1.11986 26.3801 0.00137807 25 0ZM25 31.6663L22.25 28C22.0043 27.7006 21.6373 27.5271 21.25 27.5271C20.8627 27.5271 20.4957 27.7006 20.25 28L17.5 31.6663L14.75 28C14.5043 27.7006 14.1373 27.5271 13.75 27.5271C13.3627 27.5271 12.9957 27.7006 12.75 28L10 31.6663L7.25 28C7.00426 27.7006 6.63732 27.5271 6.25 27.5271C5.86268 27.5271 5.49574 27.7006 5.25 28L2.5 31.6663V2.5H25V31.6663ZM22.5 17.5H20V20H22.5V17.5ZM5 17.5H15V20H5V17.5ZM22.5 12.5H20V15H22.5V12.5ZM5 12.5H15V15H5V12.5ZM22.5 7.5H5V10H22.5V7.5Z" fill="#26DFA6"/>
                        </svg>
                      </Icon>   
                    <Close onClick={props.closeModall}>X</Close>
                    </Top>
                    <Middle>
                        <p><Spann>{saveDataa.userId}</Spann>님의 {saveDataa.goalItemName} <Spann>KEEP</Spann></p>
                        <p style={{fontWeight:"700", marginTop:"2vw"}}>{saveDataa.savedItemTotalPrice} 원</p>
                    </Middle>
                    {saveData?.map((savedItem, inddex) => (
                    
                    <List key={savedItem.inddex}>
                      <Left>
                      <CreateAt>{savedItem.createdDate}</CreateAt>
                      <SavedName>{savedItem.savedItemName}</SavedName>
                      </Left>
                      <Right>
                      <Price>{savedItem.price} 원</Price>
                      <Star>⭐</Star>
                      </Right>
                    </List>
                    
                    ))}
                </CommentBox>
            </ModalBox>
             <CloseBtn onClick={props.closeModall}>닫기</CloseBtn>
        </Background> : null}
</>

    );
  };

  const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgb(0,0,0,0.3);
  /* background-color: rgba(41,41,41,0.85); */
  `;
  
  const ModalBox = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 580px;
  min-height: 50vh;
  /* border: 5px solid red; */
  box-shadow: rgb(0 0 0 / 9%) 0px 2px 12px 0px;
  display: flex;
  z-index: 99;
    @media screen and (max-width:600px){
      width: 100vw;
      height: 100vh;
      padding: 20px;
  }
  `;
  
const Close = styled.button`
/* border: 5px solid violet; */
width: 5vw;
height: 5vw;
text-align: center;
align-items: center;
/* float: right; */
position: absolute;
top: 10;
right: 0%;
margin-right: 1vw;
background-color: white;
border: none;
`;

const CommentBox = styled.div`
width: 100%;
height: 50vh;
margin: auto 0;
background-color: white;
/* justify-content: center; */
display: flex;
flex-direction: column;
/* border: 3px solid yellow; */
border-radius: 3vw;
align-items: center;
position: relative;
`;

const Top = styled.div`
width: 100%;
display: flex;
margin:1vw 0 3vw 0;
`;

const Icon = styled.span`
width: 100%;
height: 3vh;
font-size: 1.5rem;
font-weight: 700;
display: flex;
justify-content: center;
margin-top: 3vw;
`;

const Middle = styled.div`
width: 100%;
height: 12vw;
/* border: 1px solid red; */
font-size: 1rem;
/* font-weight: 700; */
text-align: center;
margin-top: 3vw;
`;

const Spann = styled.span`
color : #26DFA6;
font-weight: 700;
`;

const List = styled.div`
width: 100%;
height: 10vw;
/* border: 1px solid blue; */
/* display: flex; */
/* justify-content: space-between; */
align-items: center;
padding: 0 5vw 0 5vw;
overflow: hidden; //float 랑 같이 부모 요소에!
border-bottom: 1px solid gray;
line-height: 10vw; //폰트의 높이!
`;

const Left = styled.div`
float: left;
`;

const CreateAt = styled.span`
font-size: 0.5rem;
color: #999999;
`;

const SavedName = styled.span`
font-size: 1rem;
color: #333333;
margin-left: 3vw;
`;

const Right = styled.div`
float: right;
`;

const Price = styled.span`
font-size: 1rem;
color: #333333;
margin-right: 3vw;
`;

const Star = styled.span`
font-size: 1rem;
`;
const CloseBtn = styled.button`
width: 40vw;
height: 15vw;
border-radius: 15vw;
border: none;
background-color: #26DFA6;
color: white;
font-size: 1rem;
font-weight: 700;
position: absolute;
display: flex;
justify-content: center;
align-items: center;
bottom: 5%;
left: 30%;
`;


//   /* 팝업이 열릴때 스르륵 열리는 효과 */
//   animation: modal-show 0.3s;
//   overflow: hidden;
// `;

  export default ListModal;