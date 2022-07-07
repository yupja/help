import { createSlice } from '@reduxjs/toolkit';
import { instance } from '../../shared/axios';

// 메인화면 포스트 리드
// export const loadMainposts = () => {
//   return async function (dispatch) {
//      try{
//         const {data} = await instance.get('/board')
//         dispatch(roadPosts(data));
//         console.log(data,"redux")
//      }catch(err){
//         console.log(err);
//       };
//   };
// };

export const createPostAc = (post) => {
  return function (dispatch) {
    instance
      .post('/board', post)
      .then((response) => {
        console.log(response);
        dispatch(uploadPost());
        alert('등록 완료');
      })
      .catch((error) => {
        console.log(error);
        alert('error');
      });
  };
};

export const loadpostsAc = () => {
  return function (dispatch) {
    instance
      .get('/board')
      .then((response) => {
        //   console.log(response.data, "redux_data");
        dispatch(roadPosts(response.data));
      })
      .catch((error) => {
        console.log('get error', error);
      });
  };
};

export const UpdatePost = (boardId) => {
  return async function (dispatch) {
    await instance
      .put(`/board/${boardId}}`, boardId)
      .then((re) => {})
      .catch((err) => {
        console.log(err);
      });
    console.log(boardId, '수정아!');
  };
};

export const deletePostAc = (boardId) => {
  return async function (dispatch) {
    await instance
      .delete(`/board/${boardId}`)
      .then((response) => {
        dispatch(deletePostAc(boardId));
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(boardId, '삭제외않되');
  };
};

// 무한스크롤시 컨텐츠를 더 로드
export const loadMoreContentDB = () => {
  return async function (dispatch, getState) {
    const board = getState().post.postList;
    const lastIndex = board[board.length - 1].boardId;
    await instance.get('/board', { params: { lastboardId: lastIndex, size: 10 } }).then((response) => {
      const new_data = [...board, ...response.data];
      dispatch(roadPosts(new_data));
      // dispatch(roadPosts({ data: new_data }));

      /**
       * 데이터를 dispatch해서 store에 저장하는 과정에서 발생한 에러 입니다.
      
       * CommunityTab.js에서 PostData의 형식이 처음에는 배열 형태였기 때문에 (PostData:[{...},{...},{...}])
       * map함수를 사용해서 정상적으로 데이터를 볼 수 있었습니다.
       
       * 하지만infinite scroll로 데이터를 불러는 과정에서 data를 redux store로 dispatch할 때, 
       * data라는 객체의 key 값에 담아서 보냈기 때문에 -> ({ data: new_data })
       * 처음과 달리 PostData:{data:[....]}와 같은 형태로 데이터가 저장이 되었습니다
       
       * PostData라는 객체 안에 data라를 key를 가진 객체가 있고
       * 해당 객체가 배열 값을 가지는 형태로 변경이 되었기 때문에 
       * 객체에서는 map 함수를 사용할 수 없어 발생한 에러입니다.
       */
    });

    console.log(board, lastIndex, '무스');
  };
};

const postSlice = createSlice({
  name: 'post',
  initialState: {
    postList: [],
    post: {},
  },
  reducers: {
    uploadPost: (state, action) => {
      state.postList.push(action.payload);
    },
    roadPosts: (state, action) => {
      state.postList = action.payload;
    },
    deletePost: (state, action) => {
      const new_post = state.postList.filter((v, i) => i !== action.payload);
      state.postList = new_post;
    },
    setLike: (state, action) => {
      state.post.likeNum = action.payload.likeNum;
      state.post.userLike = action.payload.userLike;
    },
    changeTradeState: (state, action) => {
      state.postList = state.postList.map((post) => {
        if (post.postId === action.payload.id) {
          post.tradeState = action.payload.tradeState;
        }
        return post;
      });
    },
  },
});

const { uploadPost, roadPosts, changeTradeState, setLike } = postSlice.actions;
export default postSlice.reducer;
