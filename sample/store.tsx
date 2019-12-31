import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import { reducer as apiReducer } from './states/api/reducer'
import { reducer as uiReducer } from './states/ui/reducer'
import { reducer as dataReducer } from './states/data/reducer'
// import { reducer as usersReducer } from './states/users/reducer'
import { reducer as reduxFormReducer } from 'redux-form';
// import {ILogin} from "./states/me/state";
// import {IAPI} from "./states/api/state";
// import {IUsers} from "./states/users/state";
export interface RootState {
    // announcement:any,
    // login:ILogin,
    // api:IAPI,
    // form:any,
    // users:IUsers
}
export const initStore = (initialState) => {
    return createStore(combineReducers({
        api: apiReducer,
        ui: uiReducer,
        data:dataReducer,
        form: reduxFormReducer,
    }), initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))
}