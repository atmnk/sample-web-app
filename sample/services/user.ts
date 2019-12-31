import UserRepository from "../data/repo/UserRepo";
import User from "../data/models/User";
import JobDetailsRepo from "../data/repo/JobDetailsRepo";
import JobDetails from "../data/models/JobDetails";
import Blog from "../data/models/Blog";
import BlogRepo from "../data/repo/BlogRepo";

export default class UserService {
    static async deleteUserByUsername(username:string):Promise<any>{
        return await import("../data/AppDAO").then(async (d)=> {
            let AppDAO = d.default
            const dao = new AppDAO()
            const userRepo = new UserRepository(dao)
            const jdRepo = new JobDetailsRepo(dao)
            await jdRepo.delete(username)
            return userRepo.delete(username)
        })
    }
    static async getUserByUsername(username:string):Promise<User>{
        return await import("../data/AppDAO").then(async (d)=> {
            let AppDAO = d.default
            const dao = new AppDAO()
            const userRepo = new UserRepository(dao)
            return userRepo.get(username)
        })
    }
    static async getAllUserProfiles():Promise<User[]>{
        return await import("../data/AppDAO").then(async (d)=> {
            let AppDAO = d.default
            const dao = new AppDAO()
            const userRepo = new UserRepository(dao)
            return await userRepo.all();
        })
    }
    static async saveUser(user:User):Promise<User>{
        return await import("../data/AppDAO").then(async (d)=> {
            let AppDAO = d.default
            const dao = new AppDAO()
            const userRepo = new UserRepository(dao)
            return userRepo.createTable().then(() => {
                return userRepo.create(user).then(({id}) => {
                    return user;
                })
            })
        })
    }
    static async authenticate(username:string,password:string):Promise<boolean>{
        return await import("../data/AppDAO").then(async (d)=> {
            let AppDAO = d.default
            const dao = new AppDAO()
            const userRepo = new UserRepository(dao)
            return userRepo.authenticate(username,password)
        })
    }
    static async saveJD(jd:JobDetails):Promise<JobDetails>{
        return await import("../data/AppDAO").then(async (d)=> {
            let AppDAO = d.default
            const dao = new AppDAO()
            const jdRepo = new JobDetailsRepo(dao)
            return jdRepo.createTable().then(()=> {
                return jdRepo.create(jd).then(({id}) => {
                    jd.id = id
                    return jd
                })
            });
        })
    }
    static async getJD(username:string):Promise<JobDetails>{
        return await import("../data/AppDAO").then(async (d)=> {
            let AppDAO = d.default
            const dao = new AppDAO()
            const jdRepo = new JobDetailsRepo(dao)
            return jdRepo.get(username)
        })
    }
    static async getBlogs(username:string):Promise<Blog[]>{
        return await import("../data/AppDAO").then(async (d)=> {
            let AppDAO = d.default
            const dao = new AppDAO()
            const blogRepo = new BlogRepo(dao)
            return blogRepo.allFromUser(username)
        })
    }
    static async getAllBlogs():Promise<Blog[]>{
        return await import("../data/AppDAO").then(async (d)=> {
            let AppDAO = d.default
            const dao = new AppDAO()
            const blogRepo = new BlogRepo(dao)
            return blogRepo.all()
        })
    }
    static async getBlog(id:number):Promise<Blog>{
        return await import("../data/AppDAO").then(async (d)=> {
            let AppDAO = d.default
            const dao = new AppDAO()
            const blogRepo = new BlogRepo(dao)
            return blogRepo.get(id)
        })
    }
    static async saveBlog(blog:Blog):Promise<Blog>{
        return await import("../data/AppDAO").then(async (d)=> {
            let AppDAO = d.default
            const dao = new AppDAO()
            const blogRepo = new BlogRepo(dao)
            return blogRepo.createTable().then(() => {
                return blogRepo.create(blog).then(({id}) => {
                    blog.id=id
                    return blog;
                })
            })
        })
    }
    static async deleteAllBlogsByUser(username:string):Promise<any>{
        return await import("../data/AppDAO").then(async (d)=> {
            let AppDAO = d.default
            const dao = new AppDAO()
            const blogRepo = new BlogRepo(dao)
            return blogRepo.createTable().then(() => {
                return blogRepo.deleteAllFromUser(username)
            })
        })
    }
}