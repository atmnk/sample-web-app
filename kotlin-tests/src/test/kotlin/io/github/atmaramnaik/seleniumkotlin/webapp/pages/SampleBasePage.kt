package io.github.atmaramnaik.seleniumkotlin.webapp.pages

import org.openqa.selenium.By
import org.openqa.selenium.WebDriver
import org.openqa.selenium.WebElement
import org.openqa.selenium.support.ui.ExpectedConditions
import org.openqa.selenium.support.ui.WebDriverWait
import kotlin.reflect.KProperty

abstract class SampleBasePage(val driver: WebDriver) {
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
}