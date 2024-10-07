import { Page } from '@playwright/test'

export default class UserHomePage{

    elements = {
        applicationLogoHeader : "//div[@class=\"app_logo\"]",
        productSection : "//span[@class=\"title\"]",
        shoppingCartLink : "//a[@class=\"shopping_cart_link\"]",
        shoppingCartBadge : "//span[@class=\"shopping_cart_badge\"]",
        addToCartBtn : "//button[contains(@id,\"add\")]",
        removeFromCartBtn : "//button[contains(@id,\"remove\")]",
        cartBox : "//div[@id=\"shopping_cart_container\"]"
    }

    constructor(public page:Page){
    }

//https://www.saucedemo.com/inventory.html


    async getHeaderTest():Promise<string>{
        const headertext =await this.page.locator(this.elements.applicationLogoHeader).innerText();
        return headertext!;
    }

    async getProductTest():Promise<string>{
        const producttext = await this.page.locator(this.elements.productSection).textContent();
        return producttext!;
    }

    async selectFirstAvailableProduct(){
        await this.page.locator(this.elements.addToCartBtn).first().click()
    }

    async removeFirstSelectedProduct(){
        await this.page.locator(this.elements.removeFromCartBtn).first().click()
    }

    async clickOnCart(){
        await this.page.locator(this.elements.shoppingCartLink).click();
    }

    async getCartItemCount():Promise<string>{
        this.page.waitForSelector(this.elements.shoppingCartBadge)
        const cartItemCount= await this.page.locator(this.elements.shoppingCartBadge).textContent();
        return cartItemCount!;
    }

    async getCartBoundingBox(){
        return await this.page.locator(this.elements.cartBox).boundingBox();
    }

    public async addRemoveProduct(numberOfItems:number,toAdd:boolean){

        let count = 1;
        while(count<=numberOfItems){

            toAdd?
            await this.page.locator(this.elements.addToCartBtn).first().click():
            await this.page.locator(this.elements.removeFromCartBtn).first().click();

            count++;
        }
    }
}