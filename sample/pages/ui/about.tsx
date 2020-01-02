import * as React from 'react'
import { connect } from 'react-redux'
import PublicPage from "../../layouts/Public";
interface IProps {
}

interface IState {}

export default class AboutPage extends React.Component<IProps, IState> {
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