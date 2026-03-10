import { test } from '@playwright/test';
import { launchBrowser } from '../Utils/browser.js';
import { LoginPage } from "../Pages/login";
import { SettingsPage } from '../Pages/settings.js';
import { SendPage } from "../Pages/send.js";
import { GeneratePage } from '../Pages/generate.js';

test('Applicable Features', async () => {
    const { page } = await launchBrowser();
    const login = new LoginPage(page);
    const settings = new SettingsPage(page);
    const send = new SendPage(page);
    const generate = new GeneratePage(page);
    //   await login.stagingLogin();
   // await login.productionLogin();
   await login.stagingSSOLogin();
 //  await login.prodSSOLogin();

    await settings.defaultValuesInSettings();
    await login.loadTime(async () => {
        await page.click("(//*[@name='Send'])[2]");
    }, "Send Tab Load Time");
    await send.ApplicableFeaturesWRTSecurityLevel({ securityLevel: 'L1' });
    await login.loadTime(async () => {
        await page.click("//a[@name='Create']");
    }, "Generate Tab Load Time");
    await generate.ApplicableFeaturesWRTSecurityLevelInGenerateTab({ securityLevel: 'L1' });

    await login.loadTime(async () => {
        await page.click("(//*[@name='Send'])[2]");
    }, "Send Tab Load Time Again");
    await send.ApplicableFeaturesWRTSecurityLevel({ securityLevel: 'L1' });

    //Select L2 security
    await page.click("//*[@class='readers pb-3p']");
    await send.ApplicableFeaturesWRTSecurityLevel({ securityLevel: 'L2' });
    await page.click("//a[@name='Create']");
    await generate.ApplicableFeaturesWRTSecurityLevelInGenerateTab({ securityLevel: 'L2' });
    await page.click("(//*[@name='Send'])[2]");
    await send.ApplicableFeaturesWRTSecurityLevel({ securityLevel: 'L2' });

    //Select L3 security
    await page.click("//*[@class='restrict pb-3p']");
    await send.ApplicableFeaturesWRTSecurityLevel({ securityLevel: 'L3' });
    await page.click("//a[@name='Create']");
    await generate.ApplicableFeaturesWRTSecurityLevelInGenerateTab({ securityLevel: 'L3' });
    await page.click("(//*[@name='Send'])[2]");
    await send.ApplicableFeaturesWRTSecurityLevel({ securityLevel: 'L3' });

})