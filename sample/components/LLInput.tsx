import {Field} from "redux-form";
import * as React from "react";

export const LLInput = props =>{
    return (<div className="LLInputContainer"><input
        {...props.input}
        type={props.type}
        placeholder={props.placeholder}
        className="LLInput"
    /></div>)
}