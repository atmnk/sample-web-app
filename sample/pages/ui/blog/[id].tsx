import React from 'react'
import {connect} from 'react-redux'
import { useRouter } from 'next/router'
import {NextPage, NextPageContext} from "next";
import UserService from "../../../services/user";
import {blogLoaded} from "../../../states/actions";
import {bindActionCreators, Store} from "redux";
import {loadBlog} from "../../../states/data/blogs/actions";
import Blog from "../../../data/models/Blog";
import PublicPage from "../../../layouts/Public";

interface IProps {
    id:number,
    loadBlog:any,
    blogs:Blog[]
}
interface IState {

}
const UserBlogsHOC: NextPage<IState> = ({ children }) => {
    const router = useRouter()
    return (
        <BP id={Number(router.query.id)}/>
    )
}
interface MyPageContext extends NextPageContext{
    store:Store;
    isServer:boolean
}
UserBlogsHOC.getInitialProps = async (ctx:MyPageContext) => {
    let blogId=ctx.query.id
    if(ctx.isServer){

        let blog=await UserService.getBlog(Number(blogId))
        ctx.store.dispatch(blogLoaded(blog) )
    } else {
        let blog=ctx.store.getState().data.blogs.blogs.find(blog=>blog.id == blogId)
        if(!blog) {
            loadBlog(blogId)(ctx.store.dispatch)
        }
    }
};
export default UserBlogsHOC

class UserBlogPageWithRouter extends React.Component<IProps, IState> {
    render() {
        const { blogs,id} = this.props
        let blog=blogs.find(blog=>blog.id == id)
        if(blog){
            return (<PublicPage>
                     <div>
                         <div>Title:<span id="title">{blog.title}</span></div>
                         <div>Contents:<span id="content">{blog.content}</span></div>
                     </div>
                 </PublicPage>)
        } else {
            return (<PublicPage>
                <div>
                    Loading...
                </div>
            </PublicPage>)
        }
    }
}
const mapStateToProps = (state) => ({
    blogs:state.data.blogs.blogs
})

const mapDispatchToProps = (dispatch) => ({
    loadBlog: bindActionCreators(loadBlog, dispatch),
})
const BP=connect(mapStateToProps, mapDispatchToProps)(UserBlogPageWithRouter)
