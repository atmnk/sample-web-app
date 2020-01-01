import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PublicPage from "../../layouts/Public";
import Router from "next/router";
import {RegistrationFormContainer, RegistrationReduxForm} from "../../components/RegistrationForm";
import {register} from "../../states/data/me/actions";

interface IProps {
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
        return (
            <PublicPage>
                <RegistrationFormContainer/>
            </PublicPage>
        )
    }
}
const mapStateToProps = (state) => ({
    username: state.data.me.username,
})

const mapDispatchToProps = (dispatch) => ({
})
export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage)