import * as React from 'react';
import { reduxForm, InjectedFormProps, Field } from 'redux-form';
import {LLInput} from "./LLInput";
import {Form} from "./Form";
export interface LoginFormDetails {
    username: string;
    password: string;
}
interface IProps {
}
class LoginForm extends React.Component<InjectedFormProps<LoginFormDetails>>{
    render(){
        const { pristine, submitting, reset,error, handleSubmit } = this.props;
        return (<Form onSubmit={handleSubmit}>
            <Field
                    name="username"
                    component={LLInput}
                    type="text"
                    placeholder="Username"/>
            <Field
                    name="password"
                    component={LLInput}
                    type="password"
                    placeholder="Password"
                />
            <div className="ButtonsContainer">
                <button type="submit" disabled={pristine || submitting} className="Submit">
                    Login
                </button>
                <button type="button" disabled={pristine || submitting} onClick={reset}>
                    Clear Values
                </button>
            </div>
        </Form>)
    }
}
export default reduxForm<LoginFormDetails, IProps>({
    form: 'loginForm',
})(LoginForm);