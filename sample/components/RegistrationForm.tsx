import * as React from 'react';
import { reduxForm, InjectedFormProps, Field } from 'redux-form';
import {LLInput} from "./LLInput";
import {Form} from "./Form";
import {bindActionCreators} from "redux";
import {register} from "../states/data/me/actions";
import {connect} from "react-redux";
import {Container} from "./Container";
export interface RegistrationFormDetails {
    username: string;
    password: string;
    name:string;
}
interface IProps {
}

class RegistrationForm extends React.Component<InjectedFormProps<RegistrationFormDetails>>{
    render(){
        const { pristine, submitting, reset, handleSubmit } = this.props;
        return (<Form onSubmit={handleSubmit} className="form">
            <div className="title">Sign Up</div>
            <Field
                name="name"
                component={LLInput}
                type="text"
                placeholder="Full Name"
            />
            <Field
                    name="username"
                    component={LLInput}
                    type="text"
                    placeholder="Username"
                />


                <Field
                    name="password"
                    component={LLInput}
                    type="password"
                    placeholder="Password"
                />
            <div className="ButtonsContainer">
                <button type="submit" disabled={pristine || submitting} className="Submit">
                    Save
                </button>
                <button type="button" disabled={pristine || submitting} onClick={reset}>
                    Clear Values
                </button>
            </div>
        </Form>)
    }
}
export const RegistrationReduxForm =  reduxForm<RegistrationFormDetails, IProps>({
    form: 'registrationForm',
})(RegistrationForm);

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({
    onSubmit: bindActionCreators(register, dispatch)
})
export const RegistrationFormContainer =  connect(mapStateToProps, mapDispatchToProps)(Container(RegistrationReduxForm))