import UserService from "../../../../services/user";
import {toBlogBasic} from "../../../../data/models/Blog";
import {toUserBasics} from "../../../../data/models/User";
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
            UserService.getBlog(req.query.id).then((blog)=>{
                res.status(200).json(blog)
            }).catch((err) => {
                res.status(404).json(failure)
            })
            break;
        default:
            res.status(405).end()
            break
    }
}
