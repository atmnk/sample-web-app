package io.github.atmaramnaik.seleniumkotlin.webapp.pages

import org.openqa.selenium.WebDriver

class BlogPage(driver: WebDriver) :SampleBasePage(driver) {
    val titleLabel by this css("#title")
    val contentLabel by this css("#content")
    fun assertTitle(title:String):BlogPage{
        assert(titleLabel.text.equals(title))
        return this
    }
    fun assertContent(content:String):BlogPage{
        assert(contentLabel.text.equals(content))
        return this;
    }
}