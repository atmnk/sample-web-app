package io.github.atmaramnaik.seleniumkotlin.webapp.pages

import org.openqa.selenium.WebDriver

class LoginPage(driver: WebDriver) :SampleBasePage(driver),Launchable {
    val userNameTextBox by this css("input[name='username']")
    val passwordTextBox by this css("input[name='password']")
    val loginButton by this css("button[type='submit']")
    val errorLabel by this css("#error")

    fun login(username:String,password:String):MyDetailsPage{
        return page after {
            type string username within userNameTextBox
            type string password within passwordTextBox
            click on loginButton
        }
    }
    fun assertError(message:String):LoginPage{
        return page after {
            check element errorLabel isWithText message
        }
    }
    fun loginWithInvalidCredentials(username:String,password:String):LoginPage{
        return page after {
            type string username within userNameTextBox
            type string password within passwordTextBox
            click on loginButton
        }
    }

    override val partialUrl: String
        get() = "/login"
}
