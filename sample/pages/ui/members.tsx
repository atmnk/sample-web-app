import React from 'react'
import { connect } from 'react-redux'
import PublicPage from "../../layouts/Public";
import Link from "next/link";
import {NextPage, NextPageContext} from "next";
import {useRouter} from "next/router";
import {bindActionCreators, Store} from "redux";
import UserService from "../../services/user";
import {Member} from "../../states/data/members/state";
import {MEMBERS_LOADED} from "../../states/actions";
import {loadMembers} from "../../states/data/members/actions";
import User, {toUserBasics} from "../../data/models/User";
import {SamplePageContext} from "../_app";
interface IProps {
    members:Member[],
    partial:boolean,
    loadMembers:any
}
interface IState {

}
const MembersHOC: NextPage<IState> = ({ children }) => {
    const router = useRouter()
    return (
        <MembersContainer/>
    )
}
MembersHOC.getInitialProps = async (ctx:SamplePageContext) => {
    if (!ctx.isServer) {
        let mems = ctx.store.getState().data.members
        if(!mems || mems.partial)
            loadMembers()(ctx.store.dispatch)
    } else {
        let profiles = await UserService.getAllUserProfiles()
        let ubProfiles = profiles.map((u)=>{
            return toUserBasics(u)
        })
        ctx.store.dispatch({type: MEMBERS_LOADED, members: ubProfiles})
    }

};
export default MembersHOC

class MembersPage extends React.Component<IProps, IState> {
    render() {
        const {members} = this.props
        let content = <div>
            Loading...
        </div>
        if(members && members.length > 0){
            content = <div>
                {
                    members.map((u)=>{
                        return (<div key={u.basic.username} className="memberRow"><Link href="/ui/[username]" as={`/ui/${u.basic.username}`}>
                            <a id={u.basic.username} className="memberName">{u.basic.name}</a>
                        </Link>
                        </div>)
                    })
                }
            </div>
        } else if(members){
            content = <div>No members yet on this site</div>
        }
        return (
            <PublicPage>
                {content}
            </PublicPage>
        )
    }
}
const mapStateToProps = (state) => ({
    members:state.data.members.members,
    partial:state.data.members.partial
})

const mapDispatchToProps = (dispatch) => ({
    loadMembers:bindActionCreators(loadMembers,dispatch)
})

const MembersContainer = connect(mapStateToProps, mapDispatchToProps)(MembersPage)