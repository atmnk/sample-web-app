import * as React from 'react';
import { reduxForm, InjectedFormProps, Field } from 'redux-form';
import {LLInput} from "./LLInput";
import {Form} from "./Form";
import {bindActionCreators} from "redux";
import {saveJD} from "../states/data/me/actions";
import {connect} from "react-redux";
import {Container} from "./Container";
export interface IJobDetails {
    company:string,
    designation:string
}
interface IProps {
}
export class JDForm extends React.Component<InjectedFormProps<IJobDetails>>{
    render(){
        const { pristine, submitting, reset, handleSubmit } = this.props;
        return (<Form onSubmit={handleSubmit} className="form">
            <div className="title">Job Details</div>
                <Field
                    name="designation"
                    component={LLInput}
                    type="text"
                    placeholder="Designation">

                </Field>

                <Field
                    name="company"
                    component={LLInput}
                    type="text"
                    placeholder="Company"
                />
            <div className="ButtonsContainer">
                <button id="submitJD" type="submit" disabled={pristine || submitting} className="Submit">
                    Save
                </button>
                <button type="button" disabled={pristine || submitting} onClick={reset}>
                    Clear Values
                </button>
            </div>
        </Form>)
    }
}
export const JDReduxForm = reduxForm<IJobDetails, IProps>({
    form: 'jobDetailsForm',
})(JDForm);

const mapStateToProps = (state) => ({

})
const mapDispatchToProps = (dispatch) => ({
    onSubmit:bindActionCreators(saveJD,dispatch),
})

export const JDFormContainer =  connect(mapStateToProps, mapDispatchToProps)(Container(JDReduxForm))