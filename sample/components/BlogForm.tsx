import * as React from 'react';
import { reduxForm, InjectedFormProps, Field } from 'redux-form';
import {LLInput} from "./LLInput";
import {Form} from "./Form";
import {LLTextArea} from "./LLTextArea";
import {bindActionCreators} from "redux";
import {saveBlog} from "../states/data/me/actions";
import {connect} from "react-redux";
import {Container} from "./Container";
export interface BlogFormDetails {
    title: string;
    content: string;
}
interface IProps {
}
export class BlogForm extends React.Component<InjectedFormProps<BlogFormDetails>>{
    render(){
        const { pristine, submitting, reset, handleSubmit } = this.props;
        return (<Form onSubmit={handleSubmit} className="form">
            <div className="title">Write New Blog</div>
            <Field
                name="title"
                component={LLInput}
                type="text"
                placeholder="Blog Title"
            />
            <Field
                    name="content"
                    component={LLTextArea}
                    type="text"
                    placeholder="Contents"
                />
            <div className="ButtonsContainer">
                <button id="submitBlog" type="submit" disabled={pristine || submitting} className="Submit">
                    Save
                </button>
                <button type="button" disabled={pristine || submitting} onClick={reset}>
                    Clear Values
                </button>
            </div>
        </Form>)
    }
}
export const BlogReduxForm = reduxForm<BlogFormDetails, IProps>({
    form: 'blogForm',
})(BlogForm);

const mapStateToProps = (state) => ({
})
const mapDispatchToProps = (dispatch) => ({
    onSubmit:bindActionCreators(saveBlog,dispatch)
})
export const BlogFormContainer =  connect(mapStateToProps, mapDispatchToProps)(Container(BlogReduxForm))