import JobDetailsRepo from "../../../data/repo/JobDetailsRepo";
import JobDetails from "../../../data/models/JobDetails";
import {getCookieFromServer} from "../../_app";
import UserService from "../../../services/user";
import {check} from "./profile";

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
                let jd: JobDetails = req.body
                jd.username = userName
                UserService.saveJD(jd).then(jd=>{
                    res.status(200).json(jd)
                }).catch(err=>{
                    res.status(500).json(failure)
                })
                break
            } catch (e) {
                res.status(401).json(failure)
            }
            break
        case 'GET':
            let userName = check(token)
            UserService.getJD(userName).then(jd=>{
                res.status(200).json(jd)
            }).catch(err=>{
                res.status(404).json(failure)
            })
            break
        default:
            res.status(405).end()
            break
    }
}
