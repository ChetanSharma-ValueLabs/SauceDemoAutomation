
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

test.describe('TC_05_Validate_VisualUser_E2E_Flow',async ()=>{

    test('Test_01_Visual_User_E2E_Flow', async ({page,applicationHomePage,userHomePage,userCartPage,yourInformationPage,checkOutInformationPage,checkOutCompletePage})=>{
        await page.goto(process.env.APPLICATION_URL!);
        await applicationHomePage.enterUserName(process.env.VISUAL_USERNAME!);
        await applicationHomePage.enterPassWord(process.env.DEFAULT_PASSWORD!);
        await applicationHomePage.clickLogin();

        expect(await userHomePage.page.url()).toBe(`${process.env.APPLICATION_URL}${homePageData.URL_EndPoint}`)
        
        expect(await userHomePage.getHeaderTest()).toBe(homePageData.Header_Text)
        expect(await userHomePage.getProductTest()).toBe(homePageData.Title_Text)

        let homePageCartBoundingbox = await userHomePage.getCartBoundingBox();
        expect(await homePageCartBoundingbox?.x===homePageData.Cart_X_Locator).toBeFalsy
        expect(await homePageCartBoundingbox?.y===homePageData.Cart_Y_Locator).toBeFalsy

        //Select first Product
        await userHomePage.selectFirstAvailableProduct();
        expect(await userHomePage.getCartItemCount()).toBe("1")

        await userHomePage.selectFirstAvailableProduct();
        expect(await userHomePage.getCartItemCount()).toBe("2")

        await userHomePage.clickOnCart()
        
        expect(await userCartPage.page.url()).toBe(`${process.env.APPLICATION_URL}${userCartData.URL_EndPoint}`)
        expect(await userCartPage.getProductHeader()).toBe(userCartData.Title_Text)

        const cartPageCartBoundingbox = await userCartPage.getCartBoundingBox();
        expect(await cartPageCartBoundingbox?.x===userCartData.Cart_X_Locator).toBeFalsy
        expect(await cartPageCartBoundingbox?.y===userCartData.Cart_Y_Locator).toBeFalsy

        const continueBtnBox = await userCartPage.getContinueBoundingBox();
        expect(await continueBtnBox?.x===userCartData.ContinueBtn_X_Locator).toBeFalsy
        expect(await continueBtnBox?.y===userCartData.ContinueBtn_Y_Locator).toBeFalsy
        
        const allItems:number = await userCartPage.getAllCartItems();

        await userCartPage.removeProductFromCart()
        expect(await userCartPage.getAllCartItems()).toEqual((allItems-1))


        await userCartPage.page.waitForTimeout(4000);

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