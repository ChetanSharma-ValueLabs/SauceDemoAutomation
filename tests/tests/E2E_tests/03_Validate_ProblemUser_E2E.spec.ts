
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

test.describe('TC_03_Validate_ProblemUser_E2E_Flow',async ()=>{

    test('Test_01_Problem_User_E2E_Flow', async ({page,applicationHomePage,userHomePage,userCartPage,yourInformationPage,checkOutInformationPage,checkOutCompletePage})=>{
        await page.goto(process.env.APPLICATION_URL!);
        await applicationHomePage.enterUserName(process.env.PROBLEM_USERNAME!);
        await applicationHomePage.enterPassWord(process.env.DEFAULT_PASSWORD!);
        await applicationHomePage.clickLogin();

        expect(await userHomePage.page.url()).toBe(`${process.env.APPLICATION_URL}${homePageData.URL_EndPoint}`)
        
        expect(await userHomePage.getHeaderTest()).toBe(homePageData.Header_Text)
        expect(await userHomePage.getProductTest()).toBe(homePageData.Title_Text)

        //Select first Product
        await userHomePage.selectFirstAvailableProduct();
        expect(await userHomePage.getCartItemCount()).toBe("1")

        //Select first Product
        await userHomePage.selectFirstAvailableProduct();
        expect(await userHomePage.getCartItemCount()).toBe("2")
        

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

        expect(await yourInformationPage.getFirstName()==="Test").toBeFalsy()
        expect(await yourInformationPage.getLastName()==="User").toBeFalsy()
        await yourInformationPage.clickOnContinue();

        expect(await yourInformationPage.isErrorMessageAvailable()).toBeTruthy();
        expect(await yourInformationPage.getErrorMessage()).toContain("Last Name is required");
    })
})