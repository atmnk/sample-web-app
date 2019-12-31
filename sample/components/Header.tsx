import Link from 'next/link';
import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Details} from "../states/data/me/state";

const linkStyle = {
    marginRight: 15
};
interface IProps {
    username:boolean,
    details:Details
}

interface IState {

}
class Header extends React.Component<IProps, IState> {
    render() {
        const {username,details} = this.props
        return (<div className="Header">
            <Link href="/ui">
                <a style={linkStyle} id="home">Home</a>
            </Link>

            <Link href="/ui/about">
                <a style={linkStyle} id="about">About</a>
            </Link>
            { (!username) && <Link href="/ui/login">
                <a style={linkStyle} id="login">Login</a>
            </Link>}
            { (!username) && <Link href="/ui/register">
                <a style={linkStyle} id="register">Sign Up</a>
            </Link>}
            { ((details) && <Link href="/ui/mydetails" as={`/ui/mydetails`}>
                <a style={linkStyle} id="home">{details.name}</a>
            </Link>)|| (<Link href="/ui/mydetails" as={`/ui/mydetails`}>
                <a style={linkStyle} id="home">{username}</a>
            </Link>)}

            <Link href="/ui/members" as="/ui/members">
                <a style={linkStyle} id="members">Members</a>
            </Link>
        </div>)
    }
}

const mapStateToProps = (state) => ({
    username: state.data.me.username,
    details: state.data.me.details,
    // user:state.login.user,
    // payload:state.login.payload,
    // loading:state.login.loading
})

const mapDispatchToProps = (dispatch) => ({
    // profile:bindActionCreators(profile, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Header)
