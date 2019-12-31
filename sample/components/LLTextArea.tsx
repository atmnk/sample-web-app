import {Field} from "redux-form";
import * as React from "react";

export const LLTextArea = props =>{
    return (<div className="LLInputContainer"><textarea
        {...props.input}
        type={props.type}
        placeholder={props.placeholder}
        className="LLTextArea"
    /></div>)
}