const { BROWSER } = require('ua-parser-js');
const LoginPage = require('../pageobjects/login.page');
const Page = require('./page');

class UserPage extends Page {
    get nameFiled() {
        return $('/html/body/div[1]/div/ui-view/div/div[2]/div/div[2]/div/form/div[1]/div[2]/span')
    }
    get emailFiled() {
        return $('/html/body/div[1]/div/ui-view/div/div[2]/div/div[2]/div/form/div[2]/div[2]/span')
    }
    get passwordFiled() {
        return $('/html/body/div[1]/div/ui-view/div/div[2]/div/div[2]/div/form/div[3]/div[2]/span')
    }
    get phoneFiled() {
        return $('/html/body/div[1]/div/ui-view/div/div[2]/div/div[2]/div/form/div[4]/div[2]/span');
    }
    get addressFiled() {
        return $('/html/body/div[1]/div/ui-view/div/div[2]/div/div[2]/div/form/div[5]/div[2]/span');
    }
    get supportPinFiled() {
        return $('/html/body/div[1]/div/ui-view/div/div[2]/div/div[2]/div/form/div[6]/div[2]/span');
    }
    get newsletterFiled() {
        return $('/html/body/div[1]/div/ui-view/div/div[2]/div/div[2]/div/form/div[7]/div[2]/button');
    }
    
    get dropdownButton(){
        return $('/html/body/div[1]/div/div/header/div/div/div[1]/button');
    }
    get logoutButton(){
        return $('/html/body/div[1]/div/div/header/div/div/div[1]/div/ul/li[5]/button')
                      
    }
    get logoutUserBtn(){
        return $('//*[@id="app"]/div/header/div/div/div[1]/div/ul/li[5]/button')
    }
    get titleH1(){
        return $('/html/body/div[1]/div/ui-view/div/div[1]/h1')
    }

    async saveValues(preCondition) {
        preCondition.name = await (await this.nameFiled).getText();
        preCondition.email = await (await this.emailFiled).getText();
        preCondition.pass = await (await this.passwordFiled).isDisplayed();
        preCondition.phone = await (await this.phoneFiled).getText();
        preCondition.address = await (await this.addressFiled).getText();
        preCondition.supportPin = await (await this.supportPinFiled).getText();
        await expect (await this.newsletterFiled).toHaveAttribute("class", "toggle-btn");
        preCondition.newsletter = "disabled";
        
        return preCondition;
    }
    async logout() {
        await LoginPage.open();
        await (await this.dropdownButton).click()
        await (await this.logoutButton).click();
    }
    async logoutUser(){
        await (await this.dropdownButton).click()
        await (await this.logoutUserBtn).click();
        await browser.pause(1000);

    }
   
    async checkProfilePage(){
            await (await this.titleH1).isDisplayed();
    }

    async compareValuesWithPrecondition(preCondition){
        await expect(await this.nameFiled).toHaveTextContaining(preCondition.name);
        await expect(await this.emailFiled).toHaveTextContaining(preCondition.email);
        await (await this.passwordFiled).isDisplayed();
        await expect(await this.phoneFiled).toHaveTextContaining(preCondition.phone);
        await expect(await this.addressFiled).toHaveTextContaining(preCondition.address);
        await expect(await this.supportPinFiled).toHaveTextContaining(preCondition.supportPin);
        await expect (await this.newsletterFiled).toHaveAttribute("class", "toggle-btn");

    }
}

module.exports = new UserPage();


