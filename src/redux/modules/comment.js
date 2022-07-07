import { createSlice } from "@reduxjs/toolkit";
import { instance } from "../../shared/axios";

// export const createCommentDB = (data) => {
//     return function (dispatch) {
//       instance.post('/comments', data)
//       .then((response) => {
//         console.log(response.data,"console")
//           dispatch(createComment(response.data));
          
//       });
//     };
//   };

  export const createCommentAc = (data) => {
    return function (dispatch) {
        instance.post('/comment', data)
        .then(response => {
            // console.log(response,"console create")
            dispatch(createComment(response.data));
        })
        .catch(error => {
          console.log("get error", error)
        })
    };
  };

export const loadCommentAc = () => {
    return function (dispatch) {
        instance.get('/comment')
        .then(response => {
            console.log(response.data,"console load")
            dispatch(loadComment(response.data));
        })
        .catch(error => {
          console.log("get error", error)
    });
  };
}

export const updateCommentAc = (boardId, commentId,data) => {
    return function (dispatch) {
        instance.put(`/comment/${commentId}`,data)
        .then((response)=>{
      }).catch((error) => {
        console.log(error)
      })
      console.log(commentId)
    }
  };


export const deleteComment = (commentId) => {
    return async function (dispatch) {
      await instance
        .delete(`/comment/${commentId}`)
        .then((response) => {
        })
        .catch((err) => {
          console.log(err);
        });
    console.log(commentId,"댓삭")
    };
  };



  const commentSlice = createSlice({
    name: "comment",
    initialState: {
      commentList: [],
    },
    reducers: {
      loadComment: (state, action) => {
        state.commentList = action.payload;
      },
      createComment: (state, action) => {
        state.commentList.unshift(action.payload);
      },
      updateComment:(state, action) => {
        const index = state.commentList.findIndex(
          (comment) => comment.id === action.payload.commentId
        );
        state.commentList[index] = action.payload;
      },
      
    }
    
  });
  
  export const { loadComment, createComment } = commentSlice.actions;
  export default commentSlice.reducer;