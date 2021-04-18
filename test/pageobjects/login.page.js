const Page = require('./page');

class LoginPage extends Page {
   
    get loginText(){
        return $('/html/body/div[1]/div/div/header/div/div/button[1]/span');
    }
    get inputUsername () { 
        return $('/html/body/div[1]/div/ui-view/div/ng-include/div/div/form/div[1]/div/input');
    }
    get inputPassword () { 
        return $('/html/body/div[1]/div/ui-view/div/ng-include/div/div/form/div[2]/div/div[1]/div[1]/input');
    }
    get secretEyeButton(){
        return $('/html/body/div[1]/div/ui-view/div/ng-include/div/div/form/div[2]/div/div[1]/div[2]/button')
    }
    get loginButton () {
         return $('/html/body/div[1]/div/ui-view/div/ng-include/div/div/form/div[3]/button');
         }
    
    get userEmailTextButton(){
        return $('/html/body/div[1]/div/div/header/div/div/div[1]/button/span');
    }
    get errorMessage(){
        return $('/html/body/ul/li/div/div/div[2]')
    }
    get dropdownButton(){
        return $('/html/body/div[1]/div/div/header/div/div/div[1]/button');
      
    }
    get profileTab(){
        return $('/html/body/div[1]/div/div/header/div/div/div[1]/div/ul/li[2]/a')
    }

   async clickOnLoginText(){
       await (await this.loginText).click();
   }

    async login (username, password) {
        await (await this.inputUsername).setValue(username);
        await (await this.inputPassword).setValue(password);
        await (await this.secretEyeButton).click();
        await expect(await this.inputPassword).toHaveAttribute("type", "text");
        await (await this.loginButton).click();
    }
    async checkErrorMessage(){
        await expect(await this.errorMessage).toBeExisting();
        await expect(await this.errorMessage).toHaveTextContaining(
            'Uh oh! Email or password is incorrect');
    }
    async checkUserEmailButton(email){
        const Upp = email.toUpperCase();
        await expect(await this.userEmailTextButton).toBeExisting();
        await expect(await this.userEmailTextButton).toHaveTextContaining(Upp);
        await expect(await this.dropdownButton).toBeExisting();
    }
    async clickDropdownButton(){
        await (await this.dropdownButton).click();
    }
    async selectProfile(){
        await (await this.profileTab).click();
    }
    async waitForDisplayed(){
        await expect(await this.loginButton).toBeExisting();
    }

 
    open () {
        return super.open();
    }
}

module.exports = new LoginPage();
