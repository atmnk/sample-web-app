import {createReducer} from "@reduxjs/toolkit";
import {UserBasics} from "../../../pages/api/user/[user]";
import {BlogLoadedAction, MemberBlogsLoadedAction} from "../../actions";
import {AllBlogs} from "./state";
const initialState:AllBlogs = {
    blogs:[]
}
export const reducer=createReducer(initialState,{
    BLOG_LOADED:(state, action:BlogLoadedAction) => {
        let index=state.blogs.findIndex(b=>b.id == action.blog.id)
        if(index>=0){
            state.blogs[index] = action.blog
        } else {
            state.blogs.push(action.blog)
        }
    }
})