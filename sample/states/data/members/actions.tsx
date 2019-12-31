import {Dispatch} from "redux";
import {get} from "../../api/actions";
import {UserBasics} from "../../../pages/api/user/[user]";
import {MEMBER_BLOGS_LOADED, MEMBER_LOADED, memberBlogsLoaded, MEMBERS_LOADED} from "../../actions";
import {BlogBasic} from "../../../data/models/Blog";

export const loadMember = (name) => async (dispatch: Dispatch) => {
    await get<UserBasics>(dispatch,"/user/"+name,body=>{
        return { type: MEMBER_LOADED, member:body}
    })
}
export const loadMemberBlogs = (name) => async (dispatch: Dispatch) => {
    await get<BlogBasic[]>(dispatch,"/user/"+name+"/blogs",blogs=>{
        return memberBlogsLoaded(name,blogs.map(bb=>{return {basic:bb}}))
    },(e)=>{
        return null
    })
}
export const loadMembers = () => async (dispatch: Dispatch) => {
    await get<UserBasics>(dispatch,"/user",body=>{
        return { type: MEMBERS_LOADED, members:body}
    })
}

