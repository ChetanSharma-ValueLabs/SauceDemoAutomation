import{Page} from '@playwright/test'

export default class YourInformationPage{

    elements={
        productSection : "//span[@class=\"title\"]",
        firstNameTextBox: "//input[@name=\"firstName\"]",
        lastNameTextBox: "//input[@name=\"lastName\"]",
        postalCodeTextBox : "//input[@name=\"postalCode\"]",
        continueBtn : "//input[@id=\"continue\"]",
        errorElement:"//h3[@data-test=\"error\"]"
    }

    //https://www.saucedemo.com/checkout-step-one.html
    
    constructor(public page:Page){}

    async enterFirstName(firstName:string){
        await this.page.locator(this.elements.firstNameTextBox).pressSequentially(firstName,{delay:200})
    }

    async enterLastName(lastName:string){
        await this.page.locator(this.elements.lastNameTextBox).pressSequentially(lastName,{delay:200})
    }

    async enterPostalCode(postalCode:string){
        await this.page.locator(this.elements.postalCodeTextBox).pressSequentially(postalCode,{delay:200})
    }

    public async getProductHeader():Promise<string>{
        const producttext = await this.page.locator(this.elements.productSection).textContent();
        return producttext!;
    }

    public async getFirstName():Promise<string>{
        const firstNameText = await this.page.locator(this.elements.firstNameTextBox).textContent();
        return firstNameText!;
    }

    public async getLastName():Promise<string>{
        const lastNameText = await this.page.locator(this.elements.lastNameTextBox).textContent();
        return lastNameText!;
    }

    async clickOnContinue(){
        await this.page.locator(this.elements.continueBtn).click()
    }

    async getErrorMessage():Promise<string>{
        const errorText =await this.page.locator(this.elements.errorElement).textContent();
        return errorText!;
    }

    async isErrorMessageAvailable():Promise<boolean>{
        return await this.page.locator(this.elements.errorElement).isVisible();
    }
}