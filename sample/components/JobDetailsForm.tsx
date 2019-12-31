import * as React from 'react';
import { reduxForm, InjectedFormProps, Field } from 'redux-form';
import {LLInput} from "./LLInput";
import {Form} from "./Form";
export interface IJobDetails {
}
interface IProps {
}
class JobDetailsForm extends React.Component<InjectedFormProps<IJobDetails>>{
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
export default reduxForm<IJobDetails, IProps>({
    form: 'jobDetailsForm',
})(JobDetailsForm);