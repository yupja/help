import { createSlice} from "@reduxjs/toolkit";
import { instance } from "../../shared/axios";



//--------------------- CREATE ---------------------------
export const addGoalRQ = (data) =>{ // 기존에 없던 신규 목표태산 추가
    return function (dispatch){
        try{
            instance.post('/goalItem',data);
        }catch(error){
            console.log(error)
        }
    }
}


//---------------------- READ ----------------------------
export const myReadGoalRQ = () => { // 나의 태산 1개 
    return async function (dispatch){
        try{
            const {data} = await instance.get('/myGoal')
            dispatch(readMyGoal(data))
        }catch(error){

        }
     }
}

export const allReadGoalRQ = () => { // 모든 사람의 태산 항목
    return async function(dispatch){
        try{
            const {data} = await instance.get('/goalItem')
            dispatch(readeAllGoal(data))
        }catch(error){

        }
    }

}


//-------------------- UPDATE ---------------------------


//-------------------- DELETE ---------------------------




//-------------------- SLICE ----------------------------
const goalSlice = createSlice({
    name : "goalItem",
    initialState:{  
        allGoalList: [],
        myGoalList:[],
       },
reducers:{
    readeAllGoal: (state, action) => {
        state.allGoalList = action.payload;
      },
    readMyGoal: (state, action) =>{
        state.myGoalList = action.payload;
    }

}
});

const { readeAllGoal, readMyGoal } = goalSlice.actions;
export default goalSlice.reducer;