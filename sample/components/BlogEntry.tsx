import * as React from 'react'
import Link from "next/link";
import {BlogState} from "../states/states";

interface Props {
    blog:BlogState
}
interface IState {

}
export class BlogEntry extends React.Component<Props, Props> {
    render() {
        const {  blog } = this.props
        return (<div key={blog.basic.id.toString()}>
            <Link href="/ui/blog/[id]" as={`/ui/blog/${blog.basic.id}`}>
            <a id={blog.basic.id.toString()} className="blogLink">{blog.basic.title}</a>
            </Link>
        </div>)

    }

}