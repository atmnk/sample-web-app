import {createReducer} from "@reduxjs/toolkit";
import {AllMembers, Member} from "./state";
import {UserBasics} from "../../../pages/api/user/[user]";
import {MemberBlogsLoadedAction} from "../../actions";
const initialState:AllMembers = {
    partial:true,
    members:null,
}
export const reducer=createReducer(initialState,{
    MEMBERS_LOADED:(state, action) => {
        state.members = action.members.map((ub:UserBasics)=>{return {basic:ub,blogs:null}})
        state.partial = false;
    },
    MEMBER_BLOGS_LOADED:(state, action:MemberBlogsLoadedAction) => {
        let index = -1
        if(state.members==null){
            state.partial = true;
            state.members = []
        } else {
            index=state.members.findIndex((u:Member)=>{
                return u.basic.username == action.user
            })
        }
        console.log(index)
        if(index>=0) {
            state.members[index].blogs = action.blogs
        }
        else {
            state.members.push({basic:{username:action.user},blogs:action.blogs})
        }
    },
    MEMBER_LOADED:(state, action) => {
        let index = -1
        if(state.members==null){
            state.partial = true;
            state.members = []
        } else {
            index=state.members.findIndex((u)=>{
                return u.basic.username == action.user
            })
        }
        if(index>=0){
            state.members[index] = {basic:action.member,blogs:null}
        }
        else {
            state.members.push({basic:action.member,blogs:null})
        }
    }
})