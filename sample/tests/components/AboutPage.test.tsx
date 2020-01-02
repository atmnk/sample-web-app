import * as React from 'react'
import {createStore, Store, combineReducers, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import {reducer as reduxFormReducer, reducer as formReducer} from 'redux-form';
import {mount, shallow} from "enzyme";
import {RegistrationFormContainer, RegistrationReduxForm} from "../../components/RegistrationForm";
import AboutPage from "../../pages/ui/about";
import {reducer as apiReducer} from "../../states/api/reducer";
import {reducer as uiReducer} from "../../states/ui/reducer";
import {reducer as dataReducer} from "../../states/data/reducer";
import {composeWithDevTools} from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import LoginPage from "../../pages/ui/login";
let store;
export const initStore = (initialState) => {
    return createStore(combineReducers({
        api: apiReducer,
        ui: uiReducer,
        data:dataReducer,
        form: reduxFormReducer,
    }), initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))
}
describe('Redux Form', () => {

    beforeEach(() => {
        store = initStore({})
    });

    it('should submit form with form data', () => {
        const onSubmit = jest.fn();
        const wrapper = mount(
            <Provider store={store}>
                <LoginPage/>
            </Provider>

        );

        const page = wrapper.find(`LoginPage`);

        expect(page.text()).toBe("Something Went Wrong")
    });
})