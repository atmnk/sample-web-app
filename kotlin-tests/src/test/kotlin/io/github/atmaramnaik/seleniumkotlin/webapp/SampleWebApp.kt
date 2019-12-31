package io.github.atmaramnaik.seleniumkotlin.webapp

import io.github.atmaramnaik.seleniumkotlin.driver.DriverFactory
import io.github.atmaramnaik.seleniumkotlin.webapp.pages.Launchable
import io.github.atmaramnaik.seleniumkotlin.webapp.pages.SampleBasePage

object SampleWebApp {
    val baseUrl = "http://localhost:3000/ui"
    inline fun <reified T> launch():T where T:SampleBasePage, T:Launchable{
        val driver= DriverFactory.getDriver();
        val page= PageFactoryRepository.page<T>(driver)
        driver.get(baseUrl + page.partialUrl)
        return page;
    }
}