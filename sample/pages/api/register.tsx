import { sign, verify } from 'jsonwebtoken';
import User from "../../data/models/User";
import UserService from "../../services/user";
export const SECRET_KEY='Some Secret Key'
const success = {
    status:"SUCCESS"
}
const failure = {
    status:"FAIL"
}
export default (req, res) => {
    switch (req.method) {
        case 'POST':
            let user: User = req.body
            UserService.saveUser(user).then((u)=>{
                let token = sign(req.body.username, SECRET_KEY)
                let resp = {
                    status: "SUCCESS",
                    payload: {
                        token: token
                    }
                }
                res.status(200).json(resp)
            }).catch((err) => {
                console.log(err)
                res.status(500).json(failure)
            })
            break
        default:
            res.status(405).end()
            break
    }
}
