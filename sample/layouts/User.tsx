import Header from '../components/Header';
import * as React from 'react'
import WrongModal from "../components/WrongModal";
import { useRouter } from 'next/router'

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