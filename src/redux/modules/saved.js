import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../../shared/axios";


  export const loadsavedAc = (boardId) => {
    return async function (dispatch) {
        try{
          const {data} = await instance.get(`/api/board/save/${boardId}`)
          console.log(data,"데이타")
          dispatch(loadSaved(data))
        }catch(error){
          console.log(error,"errr")
        }
      }}
//--------------------- CREATE ---------------------------
export const addSavedListRQ = createAsyncThunk(
  'saved/add',
  async (sendData) =>{
    try{
       await instance.post('/api/savedItem',sendData)
    }catch(error){

    }
  } 
)


//---------------------- READ ----------------------------



//-------------------- UPDATE ---------------------------

//-------------------- DELETE ---------------------------




//-------------------- SLICE ----------------------------

  const savedSlice = createSlice({
    name: "saved",
    initialState: {
      savedItem: {data:[]},
      saveList:[],
      save: [],
    },
    reducers: {
      loadSaved: (state, action) => {
        state.savedItem = action.payload;
      }
    }});

const { loadSaved } = savedSlice.actions;
export default savedSlice.reducer;