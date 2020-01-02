package io.github.atmaramnaik.seleniumkotlin.webapp.pages

import io.github.atmaramnaik.seleniumkotlin.webapp.PageFactoryRepository
import org.openqa.selenium.By
import org.openqa.selenium.WebDriver
import org.openqa.selenium.WebElement
import org.openqa.selenium.support.ui.ExpectedConditions
import org.openqa.selenium.support.ui.WebDriverWait

abstract class SampleBasePage(val driver: WebDriver) {
    val page:PageProvide
    val click=Click()
    val check=Checker()
    val type=Type()
    init {
        page = PageProvide(driver);
    }
    val slow=500L
    fun close(){
        driver.quit()
    }
    infix fun css(string:String):Lazy<WebElement> {
        val css=CSS(string)
        return lazy {
            return@lazy css.getValue()
        }
    }
    infix fun multiCSS(string:String):Lazy<List<WebElement>> {
        val css=MultiCSS(string)
        return lazy {
            return@lazy css.getValue()
        }
    }
    infix fun id(string:String):Lazy<WebElement> {
        val id=ID(string)
        return lazy {
            return@lazy id.getValue()
        }
    }
    infix fun xpath(string:String):Lazy<WebElement> {
        val xpath=XPath(string)
        return lazy {
            return@lazy xpath.getValue()
        }
    }
    inner abstract class Locator(val selector: String,var isStatic:Boolean=false){
        abstract fun getElement():WebElement
        var webElement: WebElement? = null
        fun getValue(): WebElement {
            if(webElement == null){
                webElement=getElement();
            }
            if(isStatic){
                return webElement!!;
            } else {
                return getElement()
            }
        }
    }
    inner abstract class ListLocator(val selector: String, var isStatic:Boolean=false){
        abstract fun getElements():List<WebElement>
        var webElements: List<WebElement>?=null
        fun getValue(): List<WebElement> {
            if(webElements == null){
                webElements=getElements();
            }
            if(isStatic){
                return webElements!!;
            } else {
                return getElements()
            }
        }
    }
    inner class MultiCSS( selector:String):ListLocator(selector,false){
        override fun getElements(): List<WebElement> {
            val wait=WebDriverWait(driver,10)
            try{
                wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector(selector)))
            } catch (tw:Throwable){

            }
            Thread.sleep(slow)
            return driver.findElements(By.cssSelector(selector))
        }

    }
    inner class CSS( selector:String, isStatic:Boolean=false):Locator(selector,isStatic){
        override fun getElement(): WebElement {
            val wait=WebDriverWait(driver,10);
            wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector(selector)))
            Thread.sleep(slow)
            return driver.findElement(By.cssSelector(selector))
        }

    }
    inner class ID( selector:String, isStatic:Boolean=false):Locator(selector,isStatic){
        override fun getElement(): WebElement {
            val wait=WebDriverWait(driver,10);
            wait.until(ExpectedConditions.presenceOfElementLocated(By.id(selector)))
            Thread.sleep(slow)
            return driver.findElement(By.id(selector))
        }

    }
    inner class XPath( selector:String, isStatic:Boolean=false):Locator(selector,isStatic){
        override fun getElement(): WebElement {
            val wait=WebDriverWait(driver,10);
            wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath(selector)))
            Thread.sleep(slow)
            return driver.findElement(By.xpath(selector))
        }

    }
    class PageProvide(val driver: WebDriver){
        infix inline fun <reified T : SampleBasePage>after(block:()->Unit):T{
            block()
            return PageFactoryRepository.page(driver)
        }
    }
    class Checker(){
        infix fun OneOfElement(elements: List<WebElement>):ListCheckContext{
            return ListCheckContext(elements,Match.ANY_ONE)
        }
        infix fun element(element:WebElement): ElementCheckContext {
            return ElementCheckContext(element)
        }
        infix fun elements(elements: List<WebElement>):AllElementsListCheckContext{
            return AllElementsListCheckContext(elements)
        }
    }
    abstract class CheckContext(){
    }
    abstract class ElementMatcherCheckContext(){
        abstract infix fun isWithText(text:String)
    }
    class ElementCheckContext(val element:WebElement):ElementMatcherCheckContext(){
        override fun isWithText(text: String) {
            assert(element.text == text)
        }

    }
    class AllElementsListCheckContext(val elements:List<WebElement>):CheckContext(){
        infix fun matchingTextExactly(values:List<String>){
            assert(elements.size == values.size){
                elements.forEach {
                    assert(values.contains(it.text))
                }
            }
        }
    }
    class ListCheckContext(val elements: List<WebElement>, val match:Match):ElementMatcherCheckContext(){
        override infix fun isWithText(text:String){
            assert(match){
                it.text == text
            }
        }
        fun assert(match:Match,block:(WebElement)->Boolean){
            if(match == Match.ANY_ONE){
                assert(elements.find(block) != null)
            } else {
                elements.forEach{
                    assert(block(it))
                }
            }
        }
    }
    enum class Match{
        ANY_ONE,
        ALL
    }
    class Click(){
        infix fun first(elements:List<WebElement>):ClickContext{
            return ClickContext(elements);
        }
        infix fun on(element: WebElement){
            element.click()
        }
    }
    class Type(){
        infix fun string(text:String):TypeContext{
            return TypeContext(text)
        }
    }
    class TypeContext(val text: String){
        infix fun within(element: WebElement){
            element.sendKeys(text)
        }
    }
    class ClickContext(val elements:List<WebElement>){
        infix fun withText(text: String){
            elements.find { it.text == text }!!.click()
        }
    }
}