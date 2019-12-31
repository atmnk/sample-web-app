package io.github.atmaramnaik.seleniumkotlin.tests

import io.github.atmaramnaik.seleniumkotlin.data.User
import io.github.atmaramnaik.seleniumkotlin.data.UserCredentials
import io.github.atmaramnaik.seleniumkotlin.webapp.SampleWebApp
import io.github.atmaramnaik.seleniumkotlin.webapp.pages.LoginPage
import io.github.atmaramnaik.seleniumkotlin.webapp.pages.RegistrationPage
import org.testng.annotations.AfterMethod
import org.testng.annotations.AfterTest
import org.testng.annotations.BeforeTest
import org.testng.annotations.Test

class RegistrationTests {
    @Test
    fun `user can register`(){
        SampleWebApp
            .launch<RegistrationPage>()
            .register("test1","Atmaram","test123$")
            .assertUserName("Atmaram")
            .close()

    }
    @AfterMethod
    fun `unregister user`(){
        User.deleteUser(UserCredentials("test1","test123$"))
    }
}