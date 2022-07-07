import { createSlice } from "@reduxjs/toolkit";
import { instance } from "../../shared/axios";


export const loadDetailAc = (boardIdex) => {
  return function (dispatch) {
      instance.get(`/board/${boardIdex}`)
      .then(response => {
        console.log(response.data, "redux_data");
        dispatch(loadDetail(response.data));
      })
      .catch(error => {
        console.log("get error", error)
      })
  };
};


const detailSlice = createSlice({
  name: "post",
  initialState: {
    postList: [],
    post: {},
  },
  reducers: {
    uploadDetail: (state, action) => {
      state.postList.push(action.payload);
    },
    loadDetail: (state, action) => {
      state.postList = action.payload;
    }
  }
});

const { loadDetail,uploadDetail } = detailSlice.actions;
export default detailSlice.reducer;