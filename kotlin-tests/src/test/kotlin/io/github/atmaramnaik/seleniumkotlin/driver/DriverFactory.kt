package io.github.atmaramnaik.seleniumkotlin.driver

import org.openqa.selenium.WebDriver
import org.openqa.selenium.chrome.ChromeDriver

class DriverFactory {
    companion object {
        fun getDriver(): WebDriver {
            val driver= ChromeDriver();
            return driver;
        }
    }
}