package io.github.atmaramnaik.seleniumkotlin.webapp.pages

import io.github.atmaramnaik.seleniumkotlin.webapp.PageFactoryRepository
import org.openqa.selenium.WebDriver

class RegistrationPage(driver: WebDriver) :SampleBasePage(driver),Launchable {
    val userNameTextBox by this css("input[name='username']")
    val nameTextBox by this css("input[name='name']")
    val passwordTextBox by this css("input[name='password']")
    val submitButton by this css("button[type='submit']")

    override val partialUrl: String
        get() = "/register"

    fun register(username:String,name:String,password:String): MyDetailsPage {
        userNameTextBox.sendKeys(username)
        nameTextBox.sendKeys(name)
        passwordTextBox.sendKeys(password)
        submitButton.click()
        return PageFactoryRepository.page<MyDetailsPage>(driver)
    }

}