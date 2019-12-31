import JobDetailsRepo from "../../../data/repo/JobDetailsRepo";
import JobDetails from "../../../data/models/JobDetails";
import {getCookieFromServer} from "../../_app";
import UserService from "../../../services/user";
import Blog, {toBlogBasic} from "../../../data/models/Blog";
import {check} from "../user/profile";

const success = {
    status:"SUCCESS"
}
const failure = {
    status:"FAIL"
}
export default (req, res) => {
    let token=null
    if(req.headers['token']){
        token=req.headers['token']
    } else {
        token=getCookieFromServer('token',req)
    }
    switch (req.method) {
        case 'POST':
            try {
                let userName = check(token)
                let blog: Blog = req.body
                blog.username = userName
                UserService.saveBlog(blog).then(b=>{
                    res.status(200).json(b)
                }).catch(err=>{
                    res.status(500).json(failure)
                })
                break
            } catch (e) {
                res.status(401).json(failure)
            }
            break
        case "GET":
            let userName = check(token)
            UserService.getBlogs(userName).then(blogs=>{
                res.status(200).json(blogs.map(blog=>{return toBlogBasic(blog)}))
            }).catch(err=>{
                res.status(404).json(failure)
            })
            break
        default:
            res.status(405).end()
            break
    }
}
