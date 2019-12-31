import AppDAO from "../AppDAO";
import User from "../models/User";
import Blog from "../models/Blog";
export default class UserRepository{
    dao:AppDAO
    constructor(dao) {
        this.dao = dao
    }
    createTable() {
        const sql = `
            CREATE TABLE IF NOT EXISTS blogs (
               id INTEGER PRIMARY KEY AUTOINCREMENT,
               username TEXT,
               title TEXT,
               content TEXT)`
        return this.dao.run(sql)
    }
    get(id:number):Promise<Blog>{
        return this.dao.get<Blog>(
            `SELECT * FROM blogs WHERE id = ?`,
            [id])
    }
    create(blog:Blog) {
        return this.dao.run(
            'INSERT INTO blogs (username,title,content) VALUES (?,?,?)',
            [blog.username,blog.title,blog.content])
    }
    all():Promise<(Blog)[]>{
        return this.dao.all<Blog>('SELECT * FROM blogs')
    }
    allFromUser(username:string):Promise<(Blog)[]>{
        return this.createTable().then(()=> {
            return this.dao.all<Blog>('SELECT * FROM blogs where username = ?', [username])
        })
    }
    deleteAllFromUser(username:string){
        return this.createTable().then(()=> {
            return this.dao.delete('DELETE FROM blogs where username = ?', [username])
        })
    }
}