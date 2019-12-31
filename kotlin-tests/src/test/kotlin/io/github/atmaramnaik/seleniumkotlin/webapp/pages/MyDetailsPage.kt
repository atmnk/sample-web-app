package io.github.atmaramnaik.seleniumkotlin.webapp.pages

import io.github.atmaramnaik.seleniumkotlin.webapp.PageFactoryRepository
import io.github.atmaramnaik.seleniumkotlin.webapp.PageFactoryRepository.page
import org.openqa.selenium.WebDriver

class MyDetailsPage(driver: WebDriver) :SampleBasePage(driver),Launchable {
    val unregisterButton by this css("#unregister")
    val saveJDButton by this css("#submitJD")
    val designationTextBox by this css("input[name='designation']")
    val companyTextBox by this css("input[name='company']")
    val titleTextBox by this css("input[name='title']")
    val contentTextArea by this css("textarea[name='content']")
    val saveBlogButton by this css("#submitBlog")
    val nameLabel by this css("#name")
    val companyLabel by this css("#company")
    val designationLabel by this css("#designation")
    val blogLinks by this multiCSS (".blogLink")
    override val partialUrl: String
        get() = "/mydetails"

    fun unregister():MyDetailsPage{
        unregisterButton.click()
        return this;
    }

    fun saveJD(designation:String,company:String):MyDetailsPage{
        designationTextBox.sendKeys(designation)
        companyTextBox.sendKeys(company)
        saveJDButton.click()
        return this
    }

    fun assertUserName(name: String):MyDetailsPage {
        assert(nameLabel.text.equals(name))
        return this
    }
    fun assertCompany(company: String):MyDetailsPage {
        assert(companyLabel.text.equals(company))
        return this
    }
    fun assertDesignation(designation: String):MyDetailsPage {
        assert(designationLabel.text.equals(designation))
        return this
    }

    fun saveBlog(title: String, content: String): MyDetailsPage {
        titleTextBox.sendKeys(title)
        contentTextArea.sendKeys(content)
        saveBlogButton.click()
        return this
    }
    fun assertBlog(title:String): MyDetailsPage{
        assert(blogLinks.find { it.text == title } != null)
        return this;
    }

    fun navigateToBlog(title: String): BlogPage {
        blogLinks.find {
            it.text == title
        }!!.click()
        return page(driver);
    }
}