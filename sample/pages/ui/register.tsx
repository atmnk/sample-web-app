import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PublicPage from "../../layouts/Public";
import Router from "next/router";
import RegistrationForm from "../../components/RegistrationForm";
import {register} from "../../states/data/me/actions";

interface IProps {
    register: any
    username: string,
}

interface IState {
    username: string,
}

class RegistrationPage extends React.Component<IProps, IState> {
    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any): void {
        const { username } = this.props
        if(username){
            Router.push("/ui")
        }
    }

    componentDidMount(): void {
        const { username } = this.props
        if(username){
            Router.push("/ui")
        }
    }

    render() {
        const { register } = this.props

        return (
            <PublicPage>
                <RegistrationForm onSubmit={register}/>
            </PublicPage>
        )
    }
}
const mapStateToProps = (state) => ({
    username: state.data.me.username,
})

const mapDispatchToProps = (dispatch) => ({
    register: bindActionCreators(register, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage)