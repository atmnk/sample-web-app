package io.github.atmaramnaik.seleniumkotlin.webapp.pages

import org.openqa.selenium.WebDriver

class MemberPage(driver: WebDriver) :SampleBasePage(driver) {
    val nameLabel by this css("#name")
    val blogLinks by this multiCSS (".blogLink")
    fun assertName(name:String):MemberPage{
        assert(nameLabel.text.equals(name))
        return this
    }
    fun assertBlogs(blogs:List<String>):MemberPage{
        assert(blogLinks.size==blogs.size)
        blogLinks.forEach {
            assert(blogs.contains(it.text))
        }
        return this;
    }
}