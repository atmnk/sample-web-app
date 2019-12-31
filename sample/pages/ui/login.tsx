import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PublicPage from "../../layouts/Public";
import Router from "next/router";
import LoginForm from "../../components/LoginForm";
import {login} from "../../states/data/me/actions";

interface IProps {
    login: any
    username: string,
    error:string
}
interface IState {
    username: string
    error:string
}
class LoginPage extends React.Component<IProps, IState> {
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
        const { login,error } = this.props

        return (
            <PublicPage>
                {error && <div id="error">{error}</div>}
                <LoginForm onSubmit={login}/>
            </PublicPage>
        )
    }
}
const mapStateToProps = (state) => ({
    username: state.data.me.username,
    error:state.ui.login.error
})

const mapDispatchToProps = (dispatch) => ({
    login: bindActionCreators(login, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)