import React from 'react'
import { connect } from 'react-redux'
import UserPage from "../../layouts/User";
import { Me} from "../../states/data/me/state";
import JobDetailsForm from "../../components/JobDetailsForm";
import {bindActionCreators} from "redux";
import {deleteMyProfile, loadMyDetails, loadMyJD, saveJD, saveBlog, loadMyBlogs} from "../../states/data/me/actions";
import {NextPage} from "next";
import UserService from "../../services/user";
import {checkServerSideCookie, SamplePageContext} from "../_app";
import {check} from "../api/user/profile";
import {myDetailsLoaded, myJDLoaded,myBlogsLoaded} from "../../states/actions";
import redirectToPage from "../../util/Navigation";
import BlogForm from "../../components/BlogForm";
import Blog, {BlogBasic, toBlogBasic} from "../../data/models/Blog";
import blogs from "../api/user/[user]/blogs";
import Link from "next/link";
import {BlogState} from "../../states/states";
interface Props extends Me {
    saveJD:any
    deleteMyProfile:any,
    saveBlog:any,
    blogs:BlogState[]
}
interface IState {

}
const MyDetailsHOC: NextPage<IState> = ({ children }) => {
    return (
        <MyDetailsContainer/>
    )
}
MyDetailsHOC.getInitialProps = async (ctx:SamplePageContext) => {
    let username=null
    username=check(checkServerSideCookie(ctx))
    if(username) {
        if (ctx.isServer) {
            let user = await UserService.getUserByUsername(username)
            ctx.store.dispatch(myDetailsLoaded(user))
            let jd = await UserService.getJD(username);
            if (jd)
                ctx.store.dispatch(myJDLoaded(jd))
            let blogs=await UserService.getBlogs(username);
            if(blogs)
                ctx.store.dispatch(myBlogsLoaded(blogs.map(blog=>{return {basic:toBlogBasic(blog)}})))
        } else {
            if(!ctx.store.getState().data.me.details)
                loadMyDetails()(ctx.store.dispatch)
            if(!(ctx.store.getState().data.me.details && ctx.store.getState().data.me.details.designation))
                loadMyJD()(ctx.store.dispatch)
            if(!(ctx.store.getState().data.me.blogs))
                loadMyBlogs()(ctx.store.dispatch)
        }
    } else {
        redirectToPage("/ui")
    }
};
export default MyDetailsHOC
class MyDetailsPage extends React.Component<Props, Props> {
    render() {
        const {  details,saveJD,deleteMyProfile,username,saveBlog,blogs } = this.props
        let blogContents = <div>Loading..</div>
            if(blogs){
                blogContents = <div>{blogs.map(blog=>{
                    return (<div key={blog.basic.id.toString()}>
                        <Link href="/ui/blog/[id]" as={`/ui/blog/${blog.basic.id}`}>
                            <a id={blog.basic.id.toString()} className="blogLink">{blog.basic.title}</a>
                        </Link>
                    </div>)})}
                </div>
        }
        return (
            <UserPage>
                <div>
                    Hello Mr {details?<span id="name">{details.name}</span> : "Loading"}
                    { username && (!details || !details.company) && <JobDetailsForm onSubmit={saveJD}/>}
                    { username && details && details.company && <div>
                        <div>Job Details</div>
                        <div>Company:<span id="company">{details.company}</span></div>
                        <div>Designation<span id="designation">{details.designation}</span></div>
                    </div>}
                    {username && <button id="unregister" onClick={deleteMyProfile} className="Submit">Unregister</button>}
                    <BlogForm onSubmit={saveBlog}/>
                    { blogContents}
                </div>
            </UserPage>

        )
    }
}
const mapStateToProps = (state) => ({
    username: state.data.me.username,
    details: state.data.me.details,
    blogs: state.data.me.blogs
})
const mapDispatchToProps = (dispatch) => ({
    saveJD:bindActionCreators(saveJD,dispatch),
    deleteMyProfile:bindActionCreators(deleteMyProfile,dispatch),
    saveBlog:bindActionCreators(saveBlog,dispatch)
})

const MyDetailsContainer =  connect(mapStateToProps, mapDispatchToProps)(MyDetailsPage)