import * as React from 'react'
import { connect } from 'react-redux'
import PublicPage from "../../layouts/Public";
import Router from "next/router";
interface IProps {
    username:string
}

interface IState {

}

class HomePage extends React.Component<IProps, IState> {
    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any): void {
        const { username } = this.props
        if(username){
            Router.push("/ui/mydetails")
        }
    }

    componentDidMount(): void {
        const { username  } = this.props
        if(username){
            Router.push("/ui/mydetails")
        }
    }
    render() {
        return (
            <PublicPage>
                <div>
                    This is home page
                </div>
            </PublicPage>

        )
    }
}
const mapStateToProps = (state) => ({
    username: state.data.me.username
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)