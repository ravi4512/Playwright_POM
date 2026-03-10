import { LoginPage } from "../Pages/login";
import { SettingsPage } from '../Pages/settings.js';
import { test } from '@playwright/test';
import { launchBrowser } from '../Utils/browser.js';


test("Restore Settings", async () => {
    const { page } = await launchBrowser();
    const login = new LoginPage(page);
 //     await login.stagingLogin();
  //  await login.productionLogin()
   // await login.stagingSSOLogin();
    await login.prodSSOLogin();
    const settings = new SettingsPage(page);
    await page.locator("//*[@id='navbarSupportedContent']/ul/li[4]").click();
    await page.locator("//*[text()='settings_accessibility']").click();
    await settings.GeneralRestore();
    await settings.DDSRestore();
    await settings.DSDRestore();
    await settings.advanceRestore();
    await settings.contentSecurityRestore();
    if (await page.locator("//*[text()='business']").isVisible()) {
        // Company tab
        await page.click("//*[text()='business']")
        if (await page.locator("#CompanyName").isVisible() && await page.locator("#userMailId").isVisible()) {
            await page.click("//*[text()='settings_accessibility']");
            const cmpnyName = await page.locator("#companyName").inputValue();
            const userMail = await page.locator("#email").inputValue();
            await page.click("//*[text()='business']")
            await page.locator("#CompanyName").fill(cmpnyName);
            await page.click("//*[text()='search']")
            await settings.GeneralRestore()
            await settings.DDSRestore()
            await settings.DSDRestore()
            await settings.advanceRestore()
            await settings.contentSecurityRestore()
            await page.click("//*[@class='btn btn-danger reseticon']");
            await page.locator("#userMailId").fill(userMail);
            await page.click("//*[text()='search']")
            await settings.GeneralRestore()
            await settings.DDSRestore()
            await settings.DSDRestore()
            await settings.advanceRestore()
            await settings.contentSecurityRestore()
        }
        else {
            await page.click("//*[text()='business']")
            await settings.GeneralRestore()
            await settings.DDSRestore()
            await settings.DSDRestore()
            await settings.advanceRestore()
            await settings.contentSecurityRestore()
        }
    }
    else
        console.log("Company tab is not present. Logged in as a normal user.")
});