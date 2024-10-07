import{Page} from '@playwright/test'

export default class CheckOutCompletePage{

    elements={
        productSection : "//span[@class=\"title\"]",
        orderCompleteMessage: "//h2[@class=\"complete-header\"]",
        backToProductBtn : "//button[@name=\"back-to-products\"]"
    }

    //https://www.saucedemo.com/checkout-complete.html
    
    constructor(public page:Page){}

    public async getProductHeader():Promise<string>{
        const producttext = await this.page.locator(this.elements.productSection).textContent();
        return producttext!;
    }

    async getOrderCompleteMessage():Promise<string>{
        const orderCompleteMessage= await this.page.locator(this.elements.orderCompleteMessage).textContent();
        return orderCompleteMessage!;
    }

    public async backToHomeClick(){
        await this.page.locator(this.elements.backToProductBtn).click();
    }
}