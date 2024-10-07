import {test as SuarceLabTest} from '@playwright/test'
import ApplicationHomePage from '../pageObjects/ApplicationHomePage'
import UserHomePage from '../pageObjects/UserHomePage'
import UserCartPage from '../pageObjects/UserCartPage'
import YourInformationPage from '../pageObjects/YourInformationPage'
import CheckOutCompletePage from '../pageObjects/CheckOutCompletePage'
import CheckOutInformationPage from '../pageObjects/CheckOutInformationPage'

type allPages = {
    applicationHomePage : ApplicationHomePage;
    userHomePage : UserHomePage;
    userCartPage : UserCartPage;
    yourInformationPage : YourInformationPage;
    checkOutCompletePage : CheckOutCompletePage;
    checkOutInformationPage : CheckOutInformationPage;    
}

const testAutomationPages = SuarceLabTest.extend<allPages>({
    applicationHomePage: async ({page},use) =>{
        await use(new ApplicationHomePage(page))
    },

    userHomePage: async ({page},use) =>{
        await use(new UserHomePage(page))
    },

    userCartPage: async ({page},use) =>{
        await use(new UserCartPage(page))
    },

    yourInformationPage: async ({page},use) =>{
        await use(new YourInformationPage(page))
    },
    checkOutCompletePage: async ({page},use) =>{
        await use(new CheckOutCompletePage(page))
    },

    checkOutInformationPage: async ({page},use) =>{
        await use(new CheckOutInformationPage(page))
    }
})

export const test = testAutomationPages;
export const expect = testAutomationPages.expect;
