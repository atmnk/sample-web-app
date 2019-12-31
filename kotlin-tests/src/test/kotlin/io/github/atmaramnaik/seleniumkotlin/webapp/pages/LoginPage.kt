package io.github.atmaramnaik.seleniumkotlin.webapp.pages

import io.github.atmaramnaik.seleniumkotlin.webapp.PageFactoryRepository
import org.openqa.selenium.WebDriver

class LoginPage(driver: WebDriver) :SampleBasePage(driver),Launchable {
    val userNameTextBox by this css("input[name='username']")
    val passwordTextBox by this css("input[name='password']")
    val loginButton by this css("button[type='submit']")
    val errorLabel by this css("#error")

    fun login(username:String,password:String):MyDetailsPage{
        userNameTextBox.sendKeys(username)
        passwordTextBox.sendKeys(password)
        loginButton.click()
        return PageFactoryRepository.page<MyDetailsPage>(driver)
    }
    fun assertError(message:String):LoginPage{
        assert(errorLabel.text.equals(message))
        return this;
    }
    fun loginWithInvalidCredentials(username:String,password:String):LoginPage{
        userNameTextBox.sendKeys(username)
        passwordTextBox.sendKeys(password)
        loginButton.click()
        return this
    }

    override val partialUrl: String
        get() = "/login"
}
