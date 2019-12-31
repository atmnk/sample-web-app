import {Database} from "sqlite3";
export default class AppDAO {
    db:Database
    constructor() {
        this.db = new Database("./database.sqlite3", (err) => {
            if (err) {
                console.log('Could not connect to database', err)
            } else {
                console.log('Connected to database')
            }
        })
    }
    run(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.run(sql, params, function (err) {
                if (err) {
                    reject(err)
                } else {
                    resolve({ id: this.lastID })
                }
            })
        })
    }
    all<T>(sql, params = []) {
        return new Promise<T[]>((resolve, reject) => {
             this.db.all(sql, params, (err, rows:T[]) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })
    }
    get<T>(sql, params = []) {
        return new Promise<T>((resolve, reject) => {
            this.db.get(sql, params, (err, result:T) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }
    delete(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.run(sql, params, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }
}