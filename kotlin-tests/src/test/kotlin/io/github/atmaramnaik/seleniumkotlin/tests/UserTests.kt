package io.github.atmaramnaik.seleniumkotlin.tests

import io.github.atmaramnaik.seleniumkotlin.data.User
import io.github.atmaramnaik.seleniumkotlin.data.UserCredentials
import io.github.atmaramnaik.seleniumkotlin.webapp.SampleWebApp
import io.github.atmaramnaik.seleniumkotlin.webapp.pages.LoginPage
import org.testng.annotations.*

class UserTests {
    @BeforeMethod
    fun `create user`(){
        User.createUser(User("atmaram","Atmaram R Naik","test123$"))
    }
    @Test
    fun `login with valid username and password`(){
        val page=SampleWebApp
            .launch<LoginPage>()
            .login("atmaram","test123$")
            .assertUserName("Atmaram R Naik")
            .close()

    }
    @Test
    fun `user should be able to save job details`(){
        val page=SampleWebApp
            .launch<LoginPage>()
            .login("atmaram","test123$")
            .saveJD("Sr Con","TW")
            .assertCompany("TW")
            .assertDesignation("Sr Con")
            .close()
    }
    @Test
    fun `user should be able to save blog`(){
        val page=SampleWebApp
            .launch<LoginPage>()
            .login("atmaram","test123$")
            .saveBlog("My New Blog","This my new Blog")
            .assertBlog("My New Blog")
            .close()
    }
    @Test
    fun `user should be able to navigate to his own blog`(){
        val page=SampleWebApp
            .launch<LoginPage>()
            .login("atmaram","test123$")
            .saveBlog("My New Blog","This my new Blog")
            .navigateToBlog("My New Blog")
            .assertTitle("My New Blog")
            .assertContent("This my new Blog")
            .close()
    }
    @AfterMethod
    fun `delete user`(){
        User.deleteUserBlogs(UserCredentials("atmaram","test123$"))
        User.deleteUser(UserCredentials("atmaram","test123$"))
    }
}