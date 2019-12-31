import {UserBasics} from "../../../pages/api/user/[user]";
import Blog from "../../../data/models/Blog";
import {BlogState} from "../../states";

export interface Member {
    basic?:UserBasics;
    blogs?:BlogState[]
}
export interface AllMembers {
    members:Member[],
    partial:boolean;
}