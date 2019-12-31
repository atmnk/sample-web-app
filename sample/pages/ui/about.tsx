import React from 'react'
import { connect } from 'react-redux'
import PublicPage from "../../layouts/Public";
interface IProps {
}

interface IState {}

class AboutPage extends React.Component<IProps, IState> {
    render() {
        return (
            <PublicPage>
                <div>
                    We are helpful
                </div>
            </PublicPage>
        )
    }
}

const mapStateToProps = (state) => ({
})
const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(AboutPage)