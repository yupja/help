import { createSlice } from "@reduxjs/toolkit";
import { instance } from "../../shared/axios";



// export const loadsavedAc = (boardId) => {
//     return function (dispatch) {
//         instance.get(`/savedItem/${boardId}`)
//         .then(response => {
//         //   console.log(response.data, "redux_data");
//           dispatch(roadSaved(response.data));
//         })
//         .catch(error => {
//           console.log("get error", error)
//         })
//         console.log(boardId,"리스트")
//     };
//   };

  export const loadsavedAc = () => {
    return async function (dispatch) {
        try{
          const {data} = await instance.get('/savedItem')
          console.log(data,"데이타")
          dispatch(roadSaved(data))
        }catch(error){
          console.log(error)
        }
      }}




  const savedSlice = createSlice({
    name: "saved",
    initialState: {
      savedItem: [],
      save: {},
    },
    reducers: {
      roadSaved: (state, action) => {
        state.savedItem = action.payload;
      }
    }});

const { roadSaved } = savedSlice.actions;
export default savedSlice.reducer;