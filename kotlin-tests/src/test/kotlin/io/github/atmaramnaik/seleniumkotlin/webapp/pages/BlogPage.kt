package io.github.atmaramnaik.seleniumkotlin.webapp.pages

import org.openqa.selenium.WebDriver

class BlogPage(driver: WebDriver) :SampleBasePage(driver) {
    val titleLabel by this css("#title")
    val contentLabel by this css("#content")
    fun assertTitle(title:String):BlogPage{
        return page after {
            check element titleLabel isWithText title
        }
    }
    fun assertContent(content:String):BlogPage{
        return page after {
            check element contentLabel isWithText content
        }
    }
}