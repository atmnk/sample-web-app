package io.github.atmaramnaik.seleniumkotlin.tests

import io.github.atmaramnaik.seleniumkotlin.data.User
import io.github.atmaramnaik.seleniumkotlin.data.UserCredentials
import io.github.atmaramnaik.seleniumkotlin.webapp.SampleWebApp
import io.github.atmaramnaik.seleniumkotlin.webapp.pages.LoginPage
import io.github.atmaramnaik.seleniumkotlin.webapp.pages.MembersPage
import io.github.atmaramnaik.seleniumkotlin.webapp.pages.RegistrationPage
import org.testng.annotations.*

class MembersTests {
    @BeforeMethod
    fun `register user`(){
        User.createUser(User("santa","Atmaram R Naik","test123$"))
        User.createUser(User("banta","Sohan Bhogale","test123$"))
        User.createUser(User("tanta","Tanta Sing","test123$"))
    }
    @Test
    fun `verify members`(){
        SampleWebApp
            .launch<MembersPage>()
            .assertMembers(listOf("Atmaram R Naik","Sohan Bhogale","Tanta Sing"))
            .close()

    }
    @Test
    fun `verify individual member`(){
        SampleWebApp
            .launch<MembersPage>()
            .navigateToMember("Sohan Bhogale")
            .assertName("Sohan Bhogale")
            .assertBlogs(listOf())
            .close()
    }
    @AfterMethod
    fun `unregister user`(){
        User.deleteUser(UserCredentials("santa","test123$"))
        User.deleteUser(UserCredentials("banta","test123$"))
        User.deleteUser(UserCredentials("tanta","test123$"))
    }
}