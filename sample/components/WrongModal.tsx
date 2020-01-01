import {connect} from "react-redux";
import * as React from 'react'
import {ack} from "../states/api/actions";
import {bindActionCreators} from "redux";
interface IProps {
    errorCode:number,
    message:string,
    ack:any
}

interface IState {
    errorCode:number,
    message:string
}

class WrongPage extends React.Component<IProps, IState> {
    render() {
        const { errorCode,
            message,ack } = this.props
        if(!errorCode){
            return (<div/>)
        }
        return (<div className="modal">
            <div>Something went wrong {message}</div>
            <button onClick={ack}>Close</button>
        </div>)
    }
}

const mapStateToProps = (state) => ({
    errorCode: state.api.errorCode,
    message: state.api.message,
})

const mapDispatchToProps = (dispatch) => ({
    ack: bindActionCreators(ack, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(WrongPage)