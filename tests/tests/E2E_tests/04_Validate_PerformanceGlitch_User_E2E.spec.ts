
import {test,expect} from '../../base/baseFixture'

import * as envData from 'dotenv';
const path = require('path')
const envPath = path.join(__dirname, '../../../.env/');
const envFile = process.env.TEST_ENV ?? 'uat';
const fullPath = path.join(envPath, `\\.env.${envFile}`);
envData.config({path: fullPath})

import * as homePageData from '../../testData/UserHome_Data.json'

test.describe('TC_04_Validate_PerformanceGlitchUser_E2E_Flow',async ()=>{

    test('Test_04_Performance_Glitch_User_E2E_Flow', async ({page,applicationHomePage,userHomePage})=>{
        await page.goto(process.env.APPLICATION_URL!);
        await applicationHomePage.enterUserName(process.env.PERFORMANCE_GLITCH_USERNAME!);
        await applicationHomePage.enterPassWord(process.env.DEFAULT_PASSWORD!);
        await applicationHomePage.clickLogin();
        
        const navigationTimingJson = await page.evaluate(() =>
            JSON.stringify(performance.getEntriesByType('navigation'))
          )
        const navigationTiming = (JSON.parse(navigationTimingJson))[0].duration

        expect(await userHomePage.page.url()).toBe(`${process.env.APPLICATION_URL}${homePageData.URL_EndPoint}`)
        
        expect(await userHomePage.getHeaderTest()).toBe(homePageData.Header_Text)
        expect(await userHomePage.getProductTest()).toBe(homePageData.Title_Text)
        expect(await navigationTiming).toBeLessThan(homePageData.PageLoadThreshold)

    })
})