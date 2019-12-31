import axios, {AxiosError} from "axios";
import {getCookieFromBrowser} from "../../pages/_app";
import {Action, Dispatch} from "redux";
import {API_SUCCESS, ERROR_ACK, somethingWenWrong} from "../actions";

const defaultOnError = (e):Action<string> => {
    try{
        let err = e as AxiosError<any>
        return somethingWenWrong(err.response.status,"Some Generic Error")
    } catch (ex) {
        console.log(e)
        console.log(ex)
    }

}
export async function get<T>(dispatch:Dispatch,url:string,onSuccess:(data:T)=>Action,onError:(e)=>Action<string>=defaultOnError){
    try{
        let response=await apiClient().get<T>(url)
        dispatch({type:API_SUCCESS})
        let action=onSuccess(response.data)
        if(action){
            dispatch(action)
        }

    } catch (e) {
        let action=onError(e)
        if (action){
            dispatch(action)
        }
    }
}
export async function post<T>(dispatch:Dispatch,url:string,body:any,onSuccess:(data:T)=>Action,onError:(e)=>Action<string>=defaultOnError){
    try{
        let response=await apiClient().post<T>(url,body)
        dispatch({type:API_SUCCESS})
        let action=onSuccess(response.data)
        if(action){
            dispatch(action)
        }

    } catch (e) {
        let action=onError(e)
        if (action){
            dispatch(action)
        }
    }
}
export async function del<T>(dispatch:Dispatch,url:string,onSuccess:(data:T)=>Action,onError:(e)=>Action<string>=defaultOnError){
    try{
        let response=await apiClient().delete<T>(url)
        dispatch({type:API_SUCCESS})
        let action=onSuccess(response.data)
        if(action){
            dispatch(action)
        }
    } catch (e) {
        let action=onError(e)
        if (action){
            dispatch(action)
        }
    }
}
export const ack = () => async (dispatch: Dispatch) => {
    dispatch({type:ERROR_ACK})
}
const apiClient = () => {
    let token=getCookieFromBrowser('token')
    if(token){
        return axios.create({
            baseURL: 'http://localhost:3000/api',
            responseType: 'json',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            }
        });
    } else {
        return axios.create({
            baseURL: 'http://localhost:3000/api',
            responseType: 'json',
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }
}