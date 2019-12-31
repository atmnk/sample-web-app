import React from 'react'
import {connect, useSelector} from 'react-redux'
import {bindActionCreators, Store} from 'redux'

import { useRouter } from 'next/router'
import PublicPage from "../../../layouts/Public";
import {NextPage, NextPageContext} from "next";
import UserService from "../../../services/user";
import {MEMBER_BLOGS_LOADED, MEMBER_LOADED, memberBlogsLoaded} from "../../../states/actions";
import {Member} from "../../../states/data/members/state";
import {loadMember,loadMemberBlogs} from "../../../states/data/members/actions";
import {toUserBasics} from "../../../data/models/User";
import {toBlogBasic} from "../../../data/models/Blog";
import Link from "next/link";
interface IProps {
    members:Member[],
    member:string,
    loadMember:any,
    loadMemberBlogs:any
}
interface IState {

}
const UserBlogsHOC: NextPage<IState> = ({ children }) => {
    const router = useRouter()
    return (
        <BP member={router.query.username as string}/>
    )
}
interface MyPageContext extends NextPageContext{
    store:Store;
    isServer:boolean
}
UserBlogsHOC.getInitialProps = async (ctx:MyPageContext) => {
    if(ctx.isServer){
        let currentUserName=ctx.query.username
        let user=await UserService.getUserByUsername(ctx.query.username as string)
        ctx.store.dispatch({type: MEMBER_LOADED, member: toUserBasics(user)} )
        let blogs=await UserService.getBlogs(user.username);
        ctx.store.dispatch(memberBlogsLoaded(user.username,blogs.map(blog=>{return {basic:toBlogBasic(blog)}})))
    } else {

        if(!ctx.store.getState().data.members.members.find(m=>m.basic.username == ctx.query.username)){
            loadMember(ctx.query.username)(ctx.store.dispatch)
            loadMemberBlogs(ctx.query.username)
        } else if(!ctx.store.getState().data.members.members.find(m=>m.basic.username == ctx.query.username).blogs){

            loadMemberBlogs(ctx.query.username)(ctx.store.dispatch)
        }
    }
};
export default UserBlogsHOC

class UserBlogsPageWithRouter extends React.Component<IProps, IState> {

    render() {
        const {member, members} = this.props
        let blogs=members.find(m=>m.basic.username == member).blogs
        let welcome = <div>Welcome Loading...</div>
        let currentUser = members.find(u => u.basic.username == member)
        let userdata = <span>{(currentUser && currentUser.basic) ? currentUser.basic.name : 'Loading...'}</span>
        let content = <div>Data for <span id="name">{userdata}</span></div>
        let blogContents = <div>Loading..</div>
        if(blogs){
            blogContents = <div>{blogs.map(blog=>{
                return (<div key={blog.basic.id.toString()} >
                    <Link href="/ui/blog/[id]" as={`/ui/blog/${blog.basic.id}`}>
                        <a id={blog.basic.id.toString()} className="blogLink">{blog.basic.title}</a>
                    </Link>
                </div>)})}
            </div>
        }

        return (<PublicPage>
            <div>{content}</div>
            <div>
                Blogs by {userdata}
            <div>{blogContents}</div>
            </div>
        </PublicPage>)
    }
}
const mapStateToProps = (state) => ({
    members:state.data.members.members
})

const mapDispatchToProps = (dispatch) => ({
    loadMember: bindActionCreators(loadMember, dispatch),
    loadMemberBlogs:bindActionCreators(loadMemberBlogs,dispatch)
})
const BP=connect(mapStateToProps, mapDispatchToProps)(UserBlogsPageWithRouter)
