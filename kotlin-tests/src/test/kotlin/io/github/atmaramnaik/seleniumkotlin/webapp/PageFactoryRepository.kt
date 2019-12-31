package io.github.atmaramnaik.seleniumkotlin.webapp

import io.github.atmaramnaik.seleniumkotlin.webapp.pages.*
import org.openqa.selenium.WebDriver
import kotlin.reflect.KClass

object PageFactoryRepository {
    val REPOSITORY:HashMap<KClass<*>,(WebDriver)-> SampleBasePage>
    init {
        REPOSITORY = HashMap<KClass<*>,(WebDriver)-> SampleBasePage>()
        register(LoginPage::class) {
            return@register LoginPage(it)
        }

        register(RegistrationPage::class) {
            return@register RegistrationPage(it)
        }
        register(MyDetailsPage::class) {
            return@register MyDetailsPage(it)
        }

        register(MemberPage::class) {
            return@register MemberPage(it)
        }
        register(MembersPage::class) {
            return@register MembersPage(it)
        }
        register(BlogPage::class) {
            return@register BlogPage(it)
        }
    }

    fun <T: SampleBasePage> register(
        page: KClass<T>,
        creator:(WebDriver)->T){
        REPOSITORY.put(page,creator)
    }
    inline fun <reified T: SampleBasePage> page(driver:WebDriver): T {
        return REPOSITORY.get(T::class)!!(driver) as T
    }
}