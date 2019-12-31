import {UserBasics} from "../../pages/api/user/[user]";

export default class Blog{
    id:number;
    username:string;
    title:string;
    content:string
}
export function toBlogBasic(blog:Blog):BlogBasic {
    return {id:blog.id,title:blog.title}
}
export interface BlogBasic {
    id:number,
    title:string
}