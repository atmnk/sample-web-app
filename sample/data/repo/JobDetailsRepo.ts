import AppDAO from "../AppDAO";
import User from "../models/User";
import JobDetails from "../models/JobDetails";
export default class UserRepository{
    // repo=new CrudRepo(User)
    dao:AppDAO
    constructor(dao) {
        this.dao = dao
    }

    createTable() {
        const sql = `
    CREATE TABLE IF NOT EXISTS job_details (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT,
      designation TEXT,
      company TEXT)`
        return this.dao.run(sql)
    }
    create({username,designation,company}) {
        return this.dao.run(
            'INSERT INTO job_details (username,designation,company) VALUES (?,?,?)',
            [username,designation,company])
    }
    get(username:string):Promise<JobDetails>{
        return this.dao.get<JobDetails>(
            `SELECT * FROM job_details WHERE username = ?`,
            [username])
    }
    delete(username:string){
        return this.createTable().then(()=>{
            return this.dao.delete('DELETE FROM job_details where username = ?',[username])
        })
    }
}