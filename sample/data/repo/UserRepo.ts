import AppDAO from "../AppDAO";
import User from "../models/User";
export default class UserRepository{
    // repo=new CrudRepo(User)
    dao:AppDAO
    constructor(dao) {
        this.dao = dao
    }
    createTable() {
        const sql = `
    CREATE TABLE IF NOT EXISTS users (
      username TEXT PRIMARY KEY,
      password TEXT,
      name TEXT)`
        return this.dao.run(sql)
    }

    create({name,username,password}) {
        return this.dao.run(
            'INSERT INTO users (username,name,password) VALUES (?,?,?)',
            [username,name,password])
    }
    get(username:string):Promise<User>{
        return this.dao.get<User>(
            `SELECT * FROM users WHERE username = ?`,
            [username])
    }
    all():Promise<(User)[]>{
        return this.dao.all<User>('SELECT * FROM users')
    }
    delete(username:string){
        return this.dao.delete('DELETE FROM users where username = ?',[username])
    }

    authenticate(username: string, password: string):Promise<boolean> {
        return this.dao.all<User>('SELECT * FROM users where username = ?',[username]).then((users)=>{
            if(users)
                return (users[0].username == username) && (users[0].password==password)
            else
                return false;
        })
    }
}