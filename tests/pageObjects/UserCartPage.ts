import{Page} from '@playwright/test'

export default class UserCartPage{

    elements={
        productSection : "//span[@class=\"title\"]",
        shoppingCartBadge : "//span[@class=\"shopping_cart_badge\"]",
        productRemoveBtn : "//button[contains(@id,\"remove\")]",
        items : "//div[@class=\"cart_item\"]",
        checkOutProductBtn : "//button[@id=\"checkout\"]",
        continueBtnBox : "//div[@id=\"shopping_cart_container\"]",
        cartBox : "//div[@id=\"shopping_cart_container\"]"
    }

    //https://www.saucedemo.com/cart.html
    
    constructor(public page:Page){}

    public async getProductHeader():Promise<string>{
        const producttext = await this.page.locator(this.elements.productSection).textContent();
        return producttext!;
    }

    public async getAllCartItems():Promise<number>{
        return await this.page.locator(this.elements.items).count();
    }
    
    public async removeProductFromCart(){
        await this.page.locator(this.elements.productRemoveBtn).first().click();
    }

    public async proceedForCheckOut(){
        await this.page.locator(this.elements.checkOutProductBtn).click();
    }

    async getCartItemCount():Promise<string>{
        const cartItemCount= await this.page.locator(this.elements.shoppingCartBadge).textContent();
        return cartItemCount!;
    }

    async getContinueBoundingBox(){
        return await this.page.locator(this.elements.checkOutProductBtn).boundingBox();
    }

    async getCartBoundingBox(){
        return await this.page.locator(this.elements.cartBox).boundingBox();
    }
}