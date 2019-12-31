import {Action} from "redux";
import JobDetails from "../data/models/JobDetails";
import {UserBasics} from "../pages/api/user/[user]";
import Blog from "../data/models/Blog";
import {BlogState} from "./states";

export const LOGGED_IN = "LOGGED_IN"
export const LOGGED_OUT = "LOGGED_OUT"
export const MY_DETAILS_LOADED = "MY_DETAILS_LOADED"
export const MEMBERS_LOADED = "MEMBERS_LOADED"
export const MEMBER_LOADED = "MEMBER_LOADED"
export const SOMETHING_WENT_WRONG ="SOMETHING_WENT_WRONG"
export const ERROR_ACK = "ERROR_ACK"
export const MY_JD_LOADED ="MY_JD_LOADED"
export const INVALID_CREDENTIALS ="INVALID_CREDENTIALS"
export const API_SUCCESS ="API_SUCCESS"
export const MEMBER_BLOGS_LOADED="MEMBER_BLOGS_LOADED"
export const MY_BLOGS_LOADED="MY_BLOGS_LOADED"
export const MY_BLOG_LOADED="MY_BLOG_LOADED"
export const BLOG_LOADED="BLOG_LOADED"
export interface LoggedOutAction extends Action<string> {
    readonly type: typeof LOGGED_OUT
}
export interface SomethingWentWrongAction extends Action<string> {
    readonly type: typeof SOMETHING_WENT_WRONG;
    errorCode:number;
    message:string
}
export interface BlogLoadedAction  extends Action<string>{
    readonly type: typeof BLOG_LOADED;
    blog:Blog
}
export interface MyBlogLoadedAction  extends Action<string>{
    readonly type: typeof MY_BLOG_LOADED;
    blog:Blog
}
export interface MyJDLoadedAction  extends Action<string>{
    readonly type: typeof MY_JD_LOADED;
    jd:JobDetails
}
export interface MyBlogsLoadedAction  extends Action<string>{
    readonly type: typeof MY_BLOGS_LOADED;
    blogs:BlogState[]
}
export interface MemberBlogsLoadedAction  extends Action<string>{
    readonly type: typeof MEMBER_BLOGS_LOADED;
    user:string
    blogs:BlogState[]
}
export interface MyDetailsLoadedAction  extends Action<string>{
    readonly type:typeof MY_DETAILS_LOADED;
    details:UserBasics
}
export function somethingWenWrong(error,message):SomethingWentWrongAction {
    return {
        type:SOMETHING_WENT_WRONG,
        errorCode:error,
        message:message
    }
}
export function myJDLoaded(jd:JobDetails):MyJDLoadedAction {
    return {
        type:MY_JD_LOADED,
        jd:jd
    }
}
export function myBlogLoaded(blog:Blog):MyBlogLoadedAction {
    return {
        type:MY_BLOG_LOADED,
        blog:blog
    }
}
export function myBlogsLoaded(blogs:BlogState[]):MyBlogsLoadedAction {
    return {
        type:MY_BLOGS_LOADED,
        blogs:blogs
    }
}
export function memberBlogsLoaded(user:string,blogs:BlogState[]):MemberBlogsLoadedAction {
    return {
        type:MEMBER_BLOGS_LOADED,
        user:user,
        blogs:blogs
    }
}
export function myDetailsLoaded(details:UserBasics):MyDetailsLoadedAction {
    return {
        type:MY_DETAILS_LOADED,
        details:details
    }
}
export function blogLoaded(blog:Blog):BlogLoadedAction {
    return {
        type:BLOG_LOADED,
        blog:blog
    }
}
export function loggedOut():LoggedOutAction {
    return {
        type:LOGGED_OUT
    }
}