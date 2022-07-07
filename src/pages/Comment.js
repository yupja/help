import React, { useRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { createCommentAc } from "../redux/modules/comment";
import { useSelector } from "react-redux/es/exports";
import { loadCommentAc, deleteComment } from "../redux/modules/comment";
import { useParams } from "react-router-dom";
import {  } from "../redux/modules/comment";
import "../public/css/comment.css"

const Comment = (props) => {
  
  useEffect(() => {
   dispatch(loadCommentAc())
  }, [])

  const params = useParams();
  const postIdex = params.postid;


  const [isEdit, setIsEdit] = useState(true);
  const [commentIndex, setConmeentIndex] = useState();


  const dispatch = useDispatch();

  const comment_ref = useRef();


  const postData = useSelector((state) => state.post.postList);
  const commentData = useSelector((state) => state.comment.commentList);

  // 인풋 컨트롤 박스 
  const openEdit = () => { setIsEdit(true) }
  const editdone = (index) => {setIsEdit(false )}



  //함수 선언/정의 부분 
  const createComment = () => {  
    console.log(comment_ref.current.value, "CREATE")
    const commentPost = {
      comment: comment_ref.current.value,
    }
   dispatch(createCommentAc(commentPost))
  }

  // const modifyComment =(index)=>{
  //   console.log("MODIFY", index)
  //   console.log(modify_ref)

  // }


  return (
    <div className="wrap">
      <div className="titleBox">
        <div className="goback">
          <label>  티끌자랑 </label>
        </div>
        <span>댓글</span>
        <button>햄버거</button>
      </div>

      <div className="postBox">
        <span>{postData[postIdex].goalItemName}</span>
        <span>{postData[postIdex].contents}</span>
      </div>

      {commentData&&commentData.map((list, index)=>(
        <div key={list.commentId}>
              <div className="commentBox">
                <span className="nickName">{list.nickname}
                    <button>수정</button>
                    <button>삭제</button>
                </span>
                <span>{list.respMsg}</span>
            </div>
        </div>
      ))}

      <div className="inputBoxComment">
        <div className="inputWrap">
        <input ref={comment_ref} className="conmeentInput"/>
        <button onClick={createComment}>게시</button>
        </div>
      </div>
    </div>

)








      //  <Close onClick={props.closeModal}>X</Close>
      // <CommentBox> *
      //   <span>Title</span>

      //     <div className="messageBox">
      //     <textarea ref={comment_ref}></textarea>
      //     <Btn onClick={createComment}>게시</Btn>
      //     </div>

      //   {commentData&&commentData.map((comment_list, index) => (
      //     <>

      //     <div key={index}>
      //       {comment_list.nickname}
      //       {comment_list.comment}
      //     </div>

      //   <CommsEdit ref={modify_ref.current[index]}></CommsEdit>
      //   <button onClick={()=>{
      //     modifyComment(index)}
      //     }>저장</button>     

      //     </>

          
      //         {isEdit ?
      //           <>
          
      //             <CommsEdit ref={modify_ref}></CommsEdit>
      //             <button onClick={modifyComment}>저장</button>    
    
      //           </>
      //           :
      //           <>

    
      //             <button onClick={() => { dispatch(deleteComment(comment_list.commentId)) }}>삭제</button>
      //             <button onClick={openEdit}>수정</button>
      //           </>
      //         }

  
    
      //         ))}

      //       </CommentBox> */}


};



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

export default Comment;