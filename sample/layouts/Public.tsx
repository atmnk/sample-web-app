import Header from '../components/Header';
import * as React from 'react'
import WrongModal from "../components/WrongModal";

type LayoutProps = {
    wrong?: boolean
}
const PublicPage: React.FunctionComponent<LayoutProps> = ({ children }) => {
    return (
        <div className="PublicPage">
            <WrongModal/>
            <Header/>
            <div className="pageContent">
                {children}
            </div>

        </div>
    )
}
export default PublicPage;