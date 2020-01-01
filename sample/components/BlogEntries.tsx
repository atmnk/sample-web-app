import * as React from 'react'
import {BlogState} from "../states/states";
import {BlogEntry} from "./BlogEntry";

interface Props {
    blogs:BlogState[]
}
interface IState {

}
export class BlogEntries extends React.Component<Props, Props> {
    render() {
        const {  blogs } = this.props
        let blogContents = <div id="blogEntries">Loading..</div>
        if(blogs){
            blogContents = <div id="blogEntries">{blogs.map(blog=> {
                return (<BlogEntry blog={blog} key={blog.basic.id}/>)
            })}
            </div>
        }
        return blogContents
    }
}