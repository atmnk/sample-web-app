package io.github.atmaramnaik.seleniumkotlin.webapp.pages

import io.github.atmaramnaik.seleniumkotlin.webapp.PageFactoryRepository
import org.openqa.selenium.WebDriver

class MembersPage(driver: WebDriver) :SampleBasePage(driver),Launchable {
    val members by this multiCSS (".memberName")
    override val partialUrl: String
        get() = "/members"
    fun navigateToMember(member:String):MemberPage{
        members.find {
            it.text == member
        }!!.click()
        return PageFactoryRepository.page(driver)
    }
    fun assertMembers(memberNames:List<String>):MembersPage{
        assert(members.size==memberNames.size)
        members.forEach {
            assert(memberNames.contains(it.text))
        }
        return this;
    }
}