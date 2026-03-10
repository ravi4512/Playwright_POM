import { test } from '@playwright/test'
import { launchBrowser } from '../Utils/browser.js';
import { LoginPage } from "../Pages/login";
import { SendPage } from "../Pages/send.js";

test('Text Authentication in send tab', async () => {
    const { page } = await launchBrowser();
    const login = new LoginPage(page);
    const send = new SendPage(page);
 //   await login.stagingLogin();
 //   await login.productionLogin();
    await login.stagingSSOLogin();
    //   await login.prodSSOLogin();
    await send.TextAuthentication();

})