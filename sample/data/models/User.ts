import {UserBasics} from "../../pages/api/user/[user]";

export default class User{
    static table:"users"
    username:string;
    name:string;
    password:string

}
export const toUserBasics = (user:User):UserBasics=>{
    return {
        username:user.username,
        name:user.name
    }
}