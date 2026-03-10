import { test } from '@playwright/test';
import { launchBrowser } from '../Utils/browser.js';
import { LoginPage } from "../Pages/login";
import { SettingsPage } from '../Pages/settings.js';
import { GeneratePage } from '../Pages/generate.js';


test('EDisclosure Feature Validation', async () => {

    const { page } = await launchBrowser();
    const login = new LoginPage(page);
    const settings = new SettingsPage(page);
    const generate = new GeneratePage(page);
    //   await login.stagingLogin();
 //   await login.productionLogin();
    await login.stagingSSOLogin();
    //  await login.prodSSOLogin();

    await settings.edisclosureSettings();
    await generate.EDisclosureForL1();
    await page.bringToFront();
    await generate.EDisclosureForL2();
    await page.bringToFront();
    await generate.EDisclosureForL3();


});