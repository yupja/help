import { createSlice } from "@reduxjs/toolkit";
import { instance } from "../../shared/axios";



//--------------------- CREATE ---------------------------
export const addFavoriteRQ = (data) => { // 내 즐겨찾기 추가 
  return function (dispatch) {
    try {
      instance.post('/api/mypage/favorite', data);
    } catch (error) {
      console.log(error)
    }
  }
}


//---------------------- READ ----------------------------
export const myFavoriteListRQ = ()=>{  // 나의 즐겨찾기 리스트 
  return async function (dispatch) {
    try {
      const { data } = await instance.get('/favoriteItem')
      dispatch(readMyFavorite(data))
    } catch (error) {
      console.log(error)
    }
  }
}


//-------------------- UPDATE ---------------------------

//-------------------- DELETE ---------------------------




//-------------------- SLICE ----------------------------
const goalSlice = createSlice({
  name: "favoriteItem",
  initialState: {
    myFavoriteList: [],

  },
  reducers: {
    readMyFavorite: (state, action) => {
      state.myFavoriteList = action.payload;
    },

  }
});

const { readMyFavorite } = goalSlice.actions;
export default goalSlice.reducer;