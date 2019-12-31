package io.github.atmaramnaik.seleniumkotlin.tests

import io.github.atmaramnaik.seleniumkotlin.data.User
import io.github.atmaramnaik.seleniumkotlin.data.UserCredentials
import io.github.atmaramnaik.seleniumkotlin.webapp.SampleWebApp
import io.github.atmaramnaik.seleniumkotlin.webapp.pages.LoginPage
import org.testng.annotations.*

class LoginTests {
    @Test
    fun `should display error message when try to login with invalid credentials`(){
        val page=SampleWebApp
            .launch<LoginPage>()
            .loginWithInvalidCredentials("someone","test123$")
            .assertError("You have provided invalid credentials")
            .close()

    }
}