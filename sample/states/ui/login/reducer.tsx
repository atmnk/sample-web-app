import {createReducer} from "@reduxjs/toolkit";
import {LoginUI} from "./state";
export const LOGGED_IN = "LOGGED_IN"
export const DETAILS_LOADED = "DETAILS_LOADED"
const initialState:LoginUI = {
    error:null
}
export const reducer=createReducer(initialState,{
    INVALID_CREDENTIALS:(state, action) => {
        state.error = "You have provided invalid credentials";
    },
    API_SUCCESS:(state, action) => {
        state.error = null
    }
})