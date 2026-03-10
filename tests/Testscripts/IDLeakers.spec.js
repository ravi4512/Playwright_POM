import { test } from '@playwright/test';
import { launchBrowser } from '../Utils/browser.js';
import { LoginPage } from "../Pages/login";
import { SettingsPage } from '../Pages/settings.js';

test('ID Leakers', async () => {
    const { page } = await launchBrowser();
    const login = new LoginPage(page);
    const settings = new SettingsPage(page);
    //   await login.stagingLogin();
    //   await login.productionLogin();
    await login.stagingSSOLogin();
    //    await login.prodSSOLogin();
    await settings.contentSecurity()
}
);