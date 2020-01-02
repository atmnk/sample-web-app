package io.github.atmaramnaik.seleniumkotlin.webapp.pages

import org.openqa.selenium.WebDriver

class MembersPage(driver: WebDriver) :SampleBasePage(driver),Launchable {
    val members by this multiCSS (".memberName")
    override val partialUrl: String
        get() = "/members"
    fun navigateToMember(member:String):MemberPage{
        return page after {
            click first members withText member
        }
    }
    fun assertMembers(memberNames:List<String>):MembersPage{
        return page after {
            check elements members matchingTextExactly memberNames
        }
    }
}