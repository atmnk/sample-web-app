import { sign, verify } from 'jsonwebtoken';
import jwt from 'jsonwebtoken'
import {getCookieFromServer} from "../../_app";
import {SECRET_KEY} from "../login";
import UserService from "../../../services/user";

const success = {
    status:"SUCCESS"
}
const failure = {
    status:"FAIL"
}
export default async (req, res) => {
    let token=null
    if(req.headers['token']){
        token=req.headers['token']
    } else {
        token=getCookieFromServer('token',req)
    }
    switch (req.method) {
        case 'GET':
            try {
                let userName = check(token)
                UserService.getUserByUsername(userName as string).then((user)=>{
                    res.status(200).json(user)
                }).catch((err)=>{
                    res.status(404).json(failure)
                })

            } catch (e) {
                res.status(401).json(failure)
            }
            break
        case 'DELETE':
            try {
                let userName = check(token)
                await UserService.deleteUserByUsername(userName as string)
                res.status(200).json(success)
            } catch (e) {
                console.log(e)
                res.status(401).json(failure)
            }
            break
        default:
            res.status(405).end()
            break
    }
}
export function check(token:string):string {
    try{
        verify(token,SECRET_KEY)
        return jwt.decode(token) as string
    }catch (e) {
        return null;
    }

}
