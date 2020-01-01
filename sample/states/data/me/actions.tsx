import {LoginFormDetails} from "../../../components/LoginForm";
import axios, {AxiosError} from 'axios'
import {Dispatch} from "redux";
import cookie from 'js-cookie'
import {RegistrationFormDetails} from "../../../components/RegistrationForm";
import {
    INVALID_CREDENTIALS,
    LOGGED_IN, loggedOut, myBlogLoaded, myBlogsLoaded,
    myDetailsLoaded, myJDLoaded, somethingWenWrong
} from "../../actions";
import {UserBasics} from "../../../pages/api/user/[user]";
import JobDetails from "../../../data/models/JobDetails";
import {del, get, post} from "../../api/actions";
import Blog, {BlogBasic} from "../../../data/models/Blog";
export const LOGIN_FAILED = 'LOGIN_FAILED'
export const PROFILE_LOADED = 'PROFILE_LOADED'
export const PROFILE_LOADING = 'PROFILE_LOADING'
interface LoginResponse {
    status:string
    payload?:any
}
export const login = (user:LoginFormDetails) => async (dispatch: Dispatch) => {
    console.log(user)
   await post<LoginResponse>(dispatch,"/login",user,body=>{
        cookie.set("token",body.payload.token)
        return { type: LOGGED_IN, username:user.username }
    },(error)=>{
       let err = error as AxiosError<any>
       if(err.response.status == 401){
           return {
               type:INVALID_CREDENTIALS
           }
       } else {
           return somethingWenWrong(err.response.status,"Some Generic Error")
       }

   })

}
export const register = (user:RegistrationFormDetails) => async (dispatch: Dispatch) => {
    await post<LoginResponse>(dispatch,"/register",user,body=>{
        cookie.set("token",body.payload.token)
        return { type: LOGGED_IN, username:user.username }
    })

}
export const deleteMyProfile = () => async (dispatch: Dispatch) => {
    await del<LoginResponse>(dispatch,"/user/profile",body=>{
        cookie.remove("token")
        return loggedOut()
    })
}

export const saveJD = ({designation,company}) => async (dispatch: Dispatch) => {
    await post<JobDetails>(dispatch,"/user/jd",{designation:designation,company:company},(body)=>{
        return myJDLoaded(body)
    })
}
export const saveBlog = ({title,content}) => async (dispatch: Dispatch) => {
    await post<Blog>(dispatch,"/blog",{title:title,content:content},(body)=>{
        return myBlogLoaded(body)
    })
}
export const loadMyDetails = () => async (dispatch: Dispatch) => {
    await get<UserBasics>(dispatch,"/user/profile",(body)=>{
        return myDetailsLoaded(body)
    })
}
export const loadMyJD = () => async (dispatch: Dispatch) => {
    await get<JobDetails>(dispatch,"/user/jd",(body)=>{
        return myJDLoaded(body)
    },(e)=>{
        return null
    })
}
export const loadMyBlogs = () => async (dispatch: Dispatch) => {
    await get<BlogBasic[]>(dispatch,"/blog",(body)=>{
        return myBlogsLoaded(body.map(bb=>{return {basic:bb}}))
    },(e)=>{
        return null
    })
}