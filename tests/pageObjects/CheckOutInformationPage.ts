import{Page} from '@playwright/test'

export default class CheckOutInformationPage{

    elements={
        productSection : "//span[@class=\"title\"]",
        paymentInformation : "//div[@data-test=\"payment-info-value\"]",
        shippingInformation : "//div[@data-test=\"shipping-info-value\"]",
        priceItem: "//div[@data-test=\"subtotal-label\"]",
        priceTax: "//div[@data-test=\"tax-label\"]",
        PriceTotal : "//div[@data-test=\"total-label\"]",
        finishBtn : "//button[@id=\"finish\"]"
    }

    //https://www.saucedemo.com/checkout-step-two.html

    constructor(public page:Page){}


    public async getProductHeader():Promise<string>{
        const producttext = await this.page.locator(this.elements.productSection).textContent();
        return producttext!;
    }

    public async getPaymentInformation():Promise<string>{
        const paymentInformation = await this.page.locator(this.elements.paymentInformation).textContent();
        return paymentInformation!;
    }

    public async getShippingInformation():Promise<string>{
        const shippingInformation = await this.page.locator(this.elements.shippingInformation).textContent();
        return shippingInformation!;
    }

    async getItemPrice():Promise<number>{
        const itemPrice= await this.page.locator(this.elements.priceItem).textContent();
        const regex = /\$\d+\.\d+/;
        const match = itemPrice?.match(regex)!;
        const itemPriceAmount = parseFloat(match[0].slice(1));
        return itemPriceAmount!;
    }

    async getTaxPrice():Promise<number>{
        const taxPrice= await this.page.locator(this.elements.priceTax).textContent();
        const regex = /\$\d+\.\d+/;
        const match = taxPrice?.match(regex)!;
        const taxPriceAmount = parseFloat(match[0].slice(1));
        return taxPriceAmount!;
    }

    async getTotalPrice():Promise<number>{
        const totalPrice= await this.page.locator(this.elements.PriceTotal).textContent();
        const regex = /\$\d+\.\d+/;
        const match = totalPrice?.match(regex)!;
        const totalPriceAmount = parseFloat(match[0].slice(1));
        return totalPriceAmount!;
    }
    public async proceedForCheckOut(){
        await this.page.locator(this.elements.finishBtn).click();
    }
}
