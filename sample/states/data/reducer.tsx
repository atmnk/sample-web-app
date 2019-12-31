import {combineReducers} from "redux";
import {reducer as meReducer} from "./me/reducer";
import {reducer as membersReducer} from "./members/reducer";
import {reducer as blogsReducer} from "./blogs/reducer";


export const reducer = combineReducers({
    me: meReducer,
    members:membersReducer,
    blogs:blogsReducer,
})