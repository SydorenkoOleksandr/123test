const LoginPage = require('../pageobjects/login.page');
const UserPage = require('../pageobjects/user.page');

describe('It\'s a test suite for Namecheap\'s AQA test task', () => {


    it.skip('shouldn\'t login with invalid credentials', async () => {

        await LoginPage.open();
        await LoginPage.clickOnLoginText();
        await LoginPage.login('tomsmith@mail.com', 'SuperSecretPassword!');
        await LoginPage.checkErrorMessage();
    
    });

    it('user is able to login with valid credentials', async () => {
        await LoginPage.open();
        await LoginPage.clickOnLoginText();
        await LoginPage.login('ssls.automation+666@gmail.com', '123456');
        await LoginPage.checkUserEmailButton('ssls.automation+666@gmail.com');
        await UserPage.logoutUser();
    });

    it('check values in the fields', async () => {

        const preCondition= {};
        await LoginPage.open();
        await LoginPage.clickOnLoginText();
        await LoginPage.login('ssls.automation+666@gmail.com', '123456');
        await LoginPage.clickDropdownButton();
        await LoginPage.selectProfile();
        await UserPage.saveValues(preCondition);
        await UserPage.logout();
       
        await LoginPage.login('ssls.automation+666@gmail.com', '123456');
        await LoginPage.clickDropdownButton();
        await LoginPage.selectProfile();
        await UserPage.checkProfilePage();
        await UserPage.compareValuesWithPrecondition(preCondition);
    })
});


