import { sign, verify } from 'jsonwebtoken';
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
            UserService.authenticate(req.body.username, req.body.password).then((passed)=>{
                if(passed){
                    let token=sign(req.body.username,SECRET_KEY)
                    let resp={
                        status:"SUCCESS",
                        payload:{
                            token:token
                        }
                    }
                    res.status(200).json(resp)
                } else
                    res.status(401).json(failure)
            }).catch(err=>{
                res.status(401).json(failure)
            })
            break
        default:
            res.status(405).end()
            break
    }
}
