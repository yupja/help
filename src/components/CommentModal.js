import React, { useRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { createCommentAc } from "../redux/modules/comment";
import { useSelector } from "react-redux/es/exports";
import { loadCommentAc } from "../redux/modules/comment";
import { useParams } from "react-router-dom";
import { deleteComment } from "../redux/modules/comment";
import { updateCommentAc } from "../redux/modules/comment";

const ComModal = (props) => {

  const dispatch = useDispatch();
  const comment_ref = React.useRef();
  const commentEdit = React.useRef();
  const params = useParams();

  const commentId = params.commentId;
  console.log(commentId, "이거")

  React.useEffect(() => {
    dispatch(loadCommentAc(commentId))
  }, [])

  const commentData = useSelector((state) => state.comment.commentList);

  const createComment = () => {
    console.log(comment_ref.current.value, "확인")
    const commentPost = {
      comment: comment_ref.current.value,

    }
    dispatch(createCommentAc(commentPost))
  }
  console.log(commentData, "commentdata")

  ////////////////////////////////////////

  const [isEdit, setIsEdit] = useState(false);

  const openEdit = () => {
    setIsEdit(true)
  }

  const editdone = (id) => {
    const commentEdit = {
        comment: comment_ref.current.value
    }
    dispatch(updateCommentAc())
    console.log(commentEdit.current.value, "확인!!!!!!!!!!!!!!")
    setIsEdit(false)
  }

  


  return (
    <>
      {props.showModal ?
        <Background>
          <ModalBox onClick={e => e.stopPropagation()}>
            <Close onClick={props.closeModal}>X</Close>
            <CommentBox>
              <span></span>
              <CrBox>
                <CoInput ref={comment_ref}></CoInput>
                <Btn onClick={createComment}>게시</Btn>
              </CrBox>
              {commentData && commentData.map((comment_list, index) => {
                return (
                  <CommsBox key={index}>
                    <Nick>{comment_list.nickname}</Nick>

                    {isEdit ?
                      <>
                        <CommsEdit ref={commentEdit}></CommsEdit>
                        <button onClick={editdone}>저장</button>
                      </>
                      :
                      <>
                        <Comms>{comment_list.comment}</Comms>
                        <button onClick={() => { dispatch(deleteComment(comment_list.commentId)) }}>삭제</button>
                        <button onClick={openEdit}>수정</button>
                      </>
                    }
                  </CommsBox>
                )
              })}
            </CommentBox>
          </ModalBox>
        </Background> : null}
    </>
  );
};

const Background = styled.div`
/* position: fixed;
top: 0;
left: 0;
bottom: 0;
right: 0;
background-color: rgba(249,249,249,0.85);
z-index: 0;
 */

 position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 0;
    background-color: rgba(255,255,255,0.15);
    backdrop-filter: blur(5px);
    /* animation: modal-bg-show 1s;
     @keyframes modal-bg-show {
      from {
             opacity: 0;
     }
      to {
             opacity: 1;
      }
     } */
 `;

const ModalBox = styled.div`
position: fixed;
left: 50%;
top: 50%;
transform: translate(-50%, -50%);
width: 642px;
min-height: 30vh;
border: 1px solid red;
background: white;
box-shadow: rgb(0 0 0 / 9%) 0px 2px 12px 0px;

  @media screen and (max-width:600px){
    width: 100vw;
    height: 100vh;
    padding: 20px;
}
`;

const Close = styled.button`
border: 1px solid violet;
width: 10%;
height: 10%;
float: right;
`;

const CommentBox = styled.div`
width: 100%;
height: 40vh;
background-color: gray;
padding: 2rem;
/* justify-content: center; */
display: flex;
border: 1px solid yellow;
flex-direction: column;
`;

const CrBox = styled.div`
width: 100%;
height: 6vh;
border: 1px solid blue;
`;

const CoInput = styled.textarea`
width: 450px;
height: 50px;
`;

const Btn = styled.button`

`;

const CommsBox = styled.div`
width: 100%;
border: 2px solid red;
`;

const Nick = styled.div`
width: 100%;
height: 40px;
border: 1px solid springgreen;
`;
const Comms = styled.div`
width: 100%;
height: 80px;
border: 1px solid blueviolet;
`;

const CommsEdit = styled.input`
width: 100%;
height: 80px;
border: 1px solid blueviolet;
`;

export default ComModal;