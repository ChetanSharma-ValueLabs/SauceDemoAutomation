
import {test,expect} from '../../base/baseFixture'
import * as envData from 'dotenv';
const path = require('path')
const envPath = path.join(__dirname, '../../../.env/');
const envFile = process.env.TEST_ENV ?? 'uat';
const fullPath = path.join(envPath, `\\.env.${envFile}`);
envData.config({path: fullPath})

import * as homePageData from '../../testData/UserHome_Data.json'
import * as userCartData from '../../testData/UserCart_Data.json'
import * as youInformationData from '../../testData/YourInformation_Data.json'
import * as checkOutInformationData from '../../testData/CheckOutInformation_Data.json'
import * as checkOutConfirmationData from '../../testData/CheckOutComplete_Data.json'

test.describe('TC_01_Validate_StandardUser_E2E_Flow',async ()=>{

    test('Test_01_Standard_User_E2E_Flow', async ({page,applicationHomePage,userHomePage,userCartPage,yourInformationPage,checkOutInformationPage,checkOutCompletePage})=>{
        await page.goto(process.env.APPLICATION_URL!);
        await applicationHomePage.enterUserName(process.env.STANDARD_USERNAME!);
        await applicationHomePage.enterPassWord(process.env.DEFAULT_PASSWORD!);
        await applicationHomePage.clickLogin();

        expect(await userHomePage.page.url()).toBe(`${process.env.APPLICATION_URL}${homePageData.URL_EndPoint}`)
        
        expect(await userHomePage.getHeaderTest()).toBe(homePageData.Header_Text)
        expect(await userHomePage.getProductTest()).toBe(homePageData.Title_Text)

        //Select first Product
        await userHomePage.addRemoveProduct(homePageData.addProductCount,true)
        
        expect(parseInt(await userHomePage.getCartItemCount())).toBe(homePageData.addProductCount)

        //remove item from Cart
        await userHomePage.addRemoveProduct(homePageData.removeProductCount,false)
        
        const remainingProducts = homePageData.addProductCount-homePageData.removeProductCount
        expect(parseInt(await userHomePage.getCartItemCount())).toBe(remainingProducts)

        await userHomePage.clickOnCart()

        expect(await userCartPage.page.url()).toBe(`${process.env.APPLICATION_URL}${userCartData.URL_EndPoint}`)
        expect(await userCartPage.getProductHeader()).toBe(userCartData.Title_Text)

        const allItems:number = await userCartPage.getAllCartItems();

        await userCartPage.removeProductFromCart()
        expect(await userCartPage.getAllCartItems()).toEqual((allItems-1))

        await userCartPage.proceedForCheckOut();


        expect(await yourInformationPage.page.url()).toBe(`${process.env.APPLICATION_URL}${youInformationData.URL_EndPoint}`)
        expect(await yourInformationPage.getProductHeader()).toBe(youInformationData.Title_Text)

        await yourInformationPage.enterFirstName(youInformationData.FirstName);
        await yourInformationPage.enterLastName(youInformationData.LastName);
        await yourInformationPage.enterPostalCode(youInformationData.PostalCode);

        await yourInformationPage.clickOnContinue();

        expect(await checkOutInformationPage.page.url()).toBe(`${process.env.APPLICATION_URL}${checkOutInformationData.URL_EndPoint}`)
        expect(await checkOutInformationPage.getProductHeader()).toBe(checkOutInformationData.Title_Text)

        expect (await checkOutInformationPage.getPaymentInformation()).toContain(checkOutInformationData.Payment_Test);

        expect (await checkOutInformationPage.getShippingInformation()).toContain(checkOutInformationData.Shipment_Test);

        const expectedTotalPrice = await checkOutInformationPage.getItemPrice()+await checkOutInformationPage.getTaxPrice();

        expect(await checkOutInformationPage.getTotalPrice()).toEqual(expectedTotalPrice)

        await checkOutInformationPage.proceedForCheckOut()

        expect(await checkOutCompletePage.page.url()).toBe(`${process.env.APPLICATION_URL}${checkOutConfirmationData.URL_EndPoint}`)
        expect (await checkOutCompletePage.getProductHeader()).toBe(checkOutConfirmationData.Title_Text);

        expect (await checkOutCompletePage.getOrderCompleteMessage()).toBe(checkOutConfirmationData.ThanksForOrder_Text);

        await checkOutCompletePage.backToHomeClick();

        expect(await userHomePage.page.url()).toBe(`${process.env.APPLICATION_URL}${homePageData.URL_EndPoint}`)
        
        expect(await userHomePage.getHeaderTest()).toBe(homePageData.Header_Text)
        expect(await userHomePage.getProductTest()).toBe(homePageData.Title_Text)  

    })
})