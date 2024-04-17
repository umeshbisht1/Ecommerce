import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   cart:0,
}
export const addcart=createSlice({
    name:"addcart",
    initialState,
    reducers:{
        setvalue:(state,action)=>{
           state.cart=action.payload
        }
    }
})
export const {setvalue}=addcart.actions;
export default addcart.reducer;
