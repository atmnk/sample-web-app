import UserService from "../../../../services/user";
import {toUserBasics} from "../../../../data/models/User";
export interface UserBasics {
    username:string;
    name?:string;
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
            UserService.getUserByUsername(req.query.user).then((user)=>{
                res.status(200).json(toUserBasics(user))
            }).catch((err) => {
                res.status(404).json(failure)
            })

        default:
            res.status(405).end()
            break
    }
}
