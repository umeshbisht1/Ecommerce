import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser:null,
    loading:false,
    errror:null
}

export const counterSlice = createSlice({
    name: 'Ecommerce',
    initialState,
    reducers: {
        signInStart:(state)=>{
            state.loading=true,
            state.errror=null
        },
        signInSuccess:(state,action)=>{
            state.currentUser=action.payload,
            state.loading=false,
            state.errror=null
        },
        signInFailure:(state,action)=>{
            state.loading=false,
            state.errror=action.payload
        },
        logoutStart:(state)=>{
            state.loading=true,
            state.errror=null
        },
        logoutSuccess:(state,action)=>{
            state.currentUser=null,
            state.loading=false,
            state.errror=null
        },
        logoutFailure:(state,action)=>{
            state.loading=false,
            state.errror=action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { signInFailure,signInStart,signInSuccess,logoutFailure,logoutStart,logoutSuccess} = counterSlice.actions

export default counterSlice.reducer