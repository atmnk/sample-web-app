package io.github.atmaramnaik.seleniumkotlin.data

import com.github.kittinunf.fuel.core.extensions.jsonBody
import com.github.kittinunf.fuel.httpDelete
import com.github.kittinunf.fuel.httpPost
import com.github.kittinunf.fuel.jackson.defaultMapper
import com.github.kittinunf.fuel.jackson.responseObject
import java.lang.RuntimeException

open class UserCredentials(val username: String, val password: String)
class AuthResponse(val status: String,val payload: HashMap<String,String>)
class User(username: String, val name: String, password: String):UserCredentials(username,password) {
    companion object{
        fun createUser(user:User):AuthResponse{
            return "http://localhost:3000/api/register"
                .httpPost()
                .jsonBody(defaultMapper.writeValueAsString(user))
                .responseObject<AuthResponse>().third.get()

        }
        fun login(credentials:UserCredentials):AuthResponse{
            return "http://localhost:3000/api/login"
                .httpPost()
                .jsonBody(defaultMapper.writeValueAsString(credentials))
                .responseObject<AuthResponse>().third.get()
        }
        fun deleteUser(credentials:UserCredentials){
            val ar=login(credentials)
            val status="http://localhost:3000/api/user/profile"
                .httpDelete()
                .appendHeader("token",ar.payload.get("token") as String)
                .response().second.statusCode
            if( status != 200){
                throw RuntimeException("status ${status}")
            }
        }

        fun deleteUserBlogs(credentials: UserCredentials) {
            val ar=login(credentials)
            val status="http://localhost:3000/api/user/blogs"
                .httpDelete()
                .appendHeader("token",ar.payload.get("token") as String)
                .response().second.statusCode
            if( !(status == 200 || status ==404)){
                throw RuntimeException("status ${status}")
            }
        }
    }
}