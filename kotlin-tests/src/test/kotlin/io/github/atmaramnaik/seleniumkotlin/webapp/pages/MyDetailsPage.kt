package io.github.atmaramnaik.seleniumkotlin.webapp.pages

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
        return page after {
            click on unregisterButton
        }
    }

    fun saveJD(designation:String,company:String):MyDetailsPage{
        return page after {
            type string designation within designationTextBox
            type string company within companyTextBox
            click on saveJDButton
        }
    }

    fun assertUserName(name: String):MyDetailsPage {
        return page after {
            check element nameLabel isWithText name
        }
    }
    fun assertCompany(company: String):MyDetailsPage {
        return page after {
            check element companyLabel isWithText company
        }
    }
    fun assertDesignation(designation: String):MyDetailsPage {
        return page after {
            check element designationLabel isWithText designation
        }
    }

    fun saveBlog(title: String, content: String): MyDetailsPage {
        return page after {
            type string title within titleTextBox
            type string content within contentTextArea
            click on saveBlogButton
        }
    }
    fun assertBlog(title:String): MyDetailsPage{
        return page after {
            check OneOfElement blogLinks isWithText title
        }
    }

    fun navigateToBlog(title: String): BlogPage {
        return page after {
            click first blogLinks withText title
        }
    }
}