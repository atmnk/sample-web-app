import User, {toUserBasics} from "../../../data/models/User";
import UserService from "../../../services/user";

const success = {
    status:"SUCCESS"
}
const failure = {
    status:"FAIL"
}
export default (req, res) => {
    switch (req.method) {
        case 'GET':
            UserService.getAllUserProfiles().then((users)=>{
                res.status(200).json(users.map((user)=>{return toUserBasics(user)}))
            }).catch((err) => {
                res.status(404).json(failure)
            })
            break;
        case 'POST':
            let user: User = req.body
            UserService.saveUser(user).then((newUser)=>{
                res.status(200).json(newUser)
            }).catch((err) => {
                res.status(500).json(failure)
            })
            break;
        default:
            res.status(405).end()
            break
    }
}
