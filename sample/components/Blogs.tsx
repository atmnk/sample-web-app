import React from 'react'
import { connect } from 'react-redux'
import {Details} from "../states/data/me/state";
import Link from "next/link";
import {BlogState} from "../states/states";

interface Props {
    blogs:BlogState[]
}
interface IState {

}
export class Blogs extends React.Component<Props, Props> {
    render() {
        const {  blogs } = this.props
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
        return blogContents
    }
}