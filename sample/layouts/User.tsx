import Header from '../components/Header';
import * as React from 'react'
import WrongModal from "../components/WrongModal";

type LayoutProps = {
}
const UserPage: React.FunctionComponent<LayoutProps> = ({ children }) => {
    return (
        <div className="UserPage">
            <WrongModal/>
            <Header/>
            {children}
        </div>
    )
}
export default UserPage;