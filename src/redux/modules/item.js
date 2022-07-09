import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../../shared/axios";
import { addGoalAPI } from "../modules/goal"
import { addSavedListRQ } from "../modules/saved"

//--------------------- CREATE ---------------------------

export const addItem = createAsyncThunk(
  'item/add',
  async (itemData, thunkAPI) =>{
    try{
      const itemAdd={
        categoryId: itemData.categoryId,
        itemName: itemData.itemName,
        defaultPrice: itemData.price
      }
      const {data} = await instance.post('api/item',itemAdd);


      const formData = new FormData()

      formData.append('image',itemData.image)

      const goalItem = {
        categoryId : itemData.categoryId,
        price :data?.data.defaultPrice,
        itemId : data?.data.id,
        goalItemCount: itemData.goalItemCount
      }
      const json = JSON.stringify(goalItem);
      const blob = new Blob([json], { type: "application/json" });
      formData.append('goalItem',blob);
      
      thunkAPI.dispatch(addGoalAPI(formData))

    }catch(error){
      console.log(error)

    }
  }
)



export const addSavedItem = createAsyncThunk(
  'item/add',
  async (sendData, thunkAPI) =>{
    try{

      //const {sendData} = await instance.post('api/item',itemAdd);
      //thunkAPI.dispatch(addGoalAPI(formData))

    }catch(error){
      console.log(error)

    }
  }
)

//---------------------- READ ----------------------------

export const allItemListRQ = () => { // 모든 사람의 태산 항목
  return async function (dispatch) {
    try {
      const { data } = await instance.get('/api/item')
      dispatch(readeAllItem(data))
    } catch (error) {
      console.log(error);
    }
  }
}

//-------------------- UPDATE ---------------------------


//-------------------- DELETE ---------------------------



//-------------------- SLICE ----------------------------
const itemSlice = createSlice({
  name: "item",
  initialState: {
    allItemList: [],
  },
  reducers: {
    readeAllItem: (state, action) => {
      state.allItemList = action.payload;
    }
  },
  
});

const { readeAllItem } = itemSlice.actions;
export default itemSlice.reducer;