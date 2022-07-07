import { createSlice } from "@reduxjs/toolkit";
import { instance } from "../../shared/axios";

//--------------------- CREATE ---------------------------
export const addSaveListRQ = (data) =>{ // 내 즐겨찾기 추가 
    // 목업은 다 집어넣음 나중에 일부 리퀘스츠 수정필요
    return function (dispatch){
        try{
            instance.post('/saveList',data);
            dispatch(addMySavedList(data));

        }catch(error){
            console.log(error)
        }
    }
}


//---------------------- READ ----------------------------

export const readSaveListRQ =() =>{
    
}

//-------------------- UPDATE ---------------------------


//-------------------- DELETE ---------------------------




//-------------------- SLICE ----------------------------
const saveSlice = createSlice({
    name : "save",
    initialState:{
        saveList : []
},
reducers:{
    readMySavedList: (state, action) => {
        state.saveList = action.payload;
    },
    
    addMySavedList : (state, action)=>{
        state.saveList.push(action.payload);
    }

}
});

const {readMySavedList, addMySavedList } = saveSlice.actions;
export default saveSlice.reducer;