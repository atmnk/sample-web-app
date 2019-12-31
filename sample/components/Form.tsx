import * as React from "react";

export const Form = props =>{
    return (<div className="outer">
            <div className="middle">
                <div className="inner">
                <form onSubmit={props.onSubmit} className="form">
                    {props.children}
                </form>
                </div>
            </div>
        </div>)
}