import React from 'react'
import { connect } from 'react-redux'
import {Details} from "../states/data/me/state";

interface Props {
    username:string;
    details:Details;
}
interface IState {

}
class JD extends React.Component<Props, Props> {
    render() {
        const {  details,username } = this.props
        return (
            <div>
                { username && details && details.company && <div>
                    <div>Job Details</div>
                    <div>Company:<span id="company">{details.company}</span></div>
                    <div>Designation<span id="designation">{details.designation}</span></div>
                </div>}
            </div>

        )
    }
}
const mapStateToProps = (state) => ({
    username: state.data.me.username,
    details: state.data.me.details,
})
const mapDispatchToProps = (dispatch) => ({
})
export const JDContainer =  connect(mapStateToProps, mapDispatchToProps)(JD)