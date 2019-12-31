import Blog, {BlogBasic} from "../../../data/models/Blog";
import {BlogState} from "../../states";

export interface Details {
    name:string;
    company:string;
    designation:string;
}
export interface Me {
    username:string;
    details:Details;
    blogs:BlogState[]
}