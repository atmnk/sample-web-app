import UserService from "../../../../services/user";
import {toUserBasics} from "../../../../data/models/User";
import {toBlogBasic} from "../../../../data/models/Blog";
export interface UserBasics {
    username:string;
    name:string;
}
const success = {
    status:"SUCCESS"
}
const failure = {
    status:"FAIL"
}
export default (req, res) => {
    switch (req.method) {
        case 'GET':
            UserService.getBlogs(req.query.user).then((blogs)=>{
                res.status(200).json(blogs.map((blog)=>{return toBlogBasic(blog)}))
            }).catch((err) => {
                res.status(404).json(failure)
            })
            break;
        default:
            res.status(405).end()
            break
    }
}
