package io.github.atmaramnaik.seleniumkotlin.webapp.pages

import org.openqa.selenium.WebDriver

class RegistrationPage(driver: WebDriver) :SampleBasePage(driver),Launchable {
    val userNameTextBox by this css("input[name='username']")
    val nameTextBox by this css("input[name='name']")
    val passwordTextBox by this css("input[name='password']")
    val submitButton by this css("button[type='submit']")

    override val partialUrl: String
        get() = "/register"

    fun register(username:String,name:String,password:String): MyDetailsPage {
        return page after {
            type string username within userNameTextBox
            type string name within nameTextBox
            type string password within passwordTextBox
            click on submitButton
        }
    }

}