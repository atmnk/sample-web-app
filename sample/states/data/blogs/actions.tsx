import Blog from "../../../data/models/Blog";
import {get} from "../../api/actions";
import {Dispatch} from "redux";
import {blogLoaded} from "../../actions";

export const loadBlog = (id) => async (dispatch: Dispatch) => {
    await get<Blog>(dispatch,"/blog/"+id,body=>{
        return blogLoaded(body)
    })
}

