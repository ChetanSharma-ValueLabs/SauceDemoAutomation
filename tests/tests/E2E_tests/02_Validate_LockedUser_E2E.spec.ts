
import {test,expect} from '../../base/baseFixture'
import * as applicationHomePage_Data from '../../testData/ApplicationHome_Data.json'
import * as envData from 'dotenv';
const path = require('path')
const envPath = path.join(__dirname, '../../../.env/');
const envFile = process.env.TEST_ENV ?? 'uat';
const fullPath = path.join(envPath, `\\.env.${envFile}`);
envData.config({path: fullPath})

test.describe('TC_02_Validate_LockedOutUser_E2E_Flow',async ()=>{

    test('Test_01_LockedOut_User_E2E_Flow', async ({page,applicationHomePage})=>{
        await page.goto(process.env.APPLICATION_URL!);
        await applicationHomePage.enterUserName(process.env.LOCKED_OUT_USERNAME!);
        await applicationHomePage.enterPassWord(process.env.DEFAULT_PASSWORD!);
        await applicationHomePage.clickLogin();    
        
        expect(await applicationHomePage.isErrorMessageAvailable()).toBeTruthy();
        expect(await applicationHomePage.getErrorMessage()).toContain(applicationHomePage_Data.errorMessage);

    })
})