import { Page } from '@playwright/test'

export default class ApplicationHomePage{

    elements = {
       userName:"//input[@id=\"user-name\"]",
       password:"//input[@id=\"password\"]",
       submit:"//input[@id=\"login-button\"]",
       errorElement:"//h3[@data-test=\"error\"]"
    }
    constructor(public page:Page){
    }

    async enterUserName(userName:string){
        await this.page.locator(this.elements.userName).pressSequentially(userName,{delay:50})
    }

    async enterPassWord(passWord:string){
        await this.page.locator(this.elements.password).pressSequentially(passWord,{delay:50})
    }

    async clickLogin(){
        await this.page.locator(this.elements.submit).click()
    }

    async getErrorMessage():Promise<string>{
        const errorText =await this.page.locator(this.elements.errorElement).textContent();
        return errorText!;
    }

    async isErrorMessageAvailable():Promise<boolean>{
        return await this.page.locator(this.elements.errorElement).isVisible();
    }
};