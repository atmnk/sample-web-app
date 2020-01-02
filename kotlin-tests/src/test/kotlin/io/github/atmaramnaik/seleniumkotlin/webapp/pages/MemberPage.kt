package io.github.atmaramnaik.seleniumkotlin.webapp.pages

import org.openqa.selenium.WebDriver

class MemberPage(driver: WebDriver) :SampleBasePage(driver) {
    val nameLabel by this css("#name")
    val blogLinks by this multiCSS (".blogLink")
    fun assertName(name:String):MemberPage{
        return page after {
            check element nameLabel isWithText name
        }
    }
    fun assertBlogs(blogs:List<String>):MemberPage{
        return page after {
            check elements blogLinks matchingTextExactly blogs
        }
    }
}