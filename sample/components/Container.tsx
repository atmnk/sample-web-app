import * as React from "react";

export interface ContainerProps {
    onSubmit:any
}
export interface IState {

}
export const Container=(SomeForm)=>{
    class ContainerForm extends React.Component<ContainerProps,IState>{

        render(){
            const {onSubmit} = this.props
            return (<SomeForm onSubmit={onSubmit}/>)
        }
    }
    return ContainerForm;
}