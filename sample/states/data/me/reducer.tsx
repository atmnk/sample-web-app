import {createReducer} from "@reduxjs/toolkit";
import {Me} from "./state";
import {MyBlogLoadedAction, MyBlogsLoadedAction, MyDetailsLoadedAction, MyJDLoadedAction} from "../../actions";
const initialState:Me = {
    username:null,
    details: null,
    blogs:null
}
export const reducer=createReducer(initialState,{
    LOGGED_IN:(state, action) => {
        state.username = action.username;
    },
    LOGGED_OUT:(state, action) => {
        state.username = null;
        state.details = null;
    },
    MY_DETAILS_LOADED:(state, action:MyDetailsLoadedAction) => {
        state.details = {
            name: action.details.name,
            designation: null,
            company:null
        }
    },
    MY_JD_LOADED:(state, action:MyJDLoadedAction) => {
        if(state.details){
            state.details.designation = action.jd.designation
            state.details.company = action.jd.company
        } else {
            state.details = {
                name: null,
                designation: action.jd.designation,
                company:action.jd.company
            }
        }

    },
    MY_BLOGS_LOADED:(state, action:MyBlogsLoadedAction) => {
        state.blogs = action.blogs
    },
    MY_BLOG_LOADED:(state, action:MyBlogLoadedAction) => {
        if(state.blogs==null){
            state.blogs = [{basic:action.blog}]
        } else {
            state.blogs.push({basic:action.blog})
        }
    },
})
