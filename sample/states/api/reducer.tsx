import { APIState } from './state'
import * as apiActions from './actions'
import {createReducer} from "@reduxjs/toolkit";
import {UserBasics} from "../../pages/api/user/[user]";
import {ERROR_ACK} from "../actions";

const initialState: APIState = {
    errorCode: null,
    message:null
}
export const reducer=createReducer(initialState,{
    SOMETHING_WENT_WRONG:(state, action) => {
        console.log(action)
        state.errorCode = action.errorCode
        state.message = action.message;
    },
    ERR_401:(state, action) => {
        state.errorCode = 401
        state.message = action.message;
    },
    ERROR_ACK:(state, action) => {
        state.errorCode = null
        state.message = null;
    },
})