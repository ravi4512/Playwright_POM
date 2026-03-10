import { test } from '@playwright/test'
import { launchBrowser } from '../Utils/browser.js';
import { LoginPage } from "../Pages/login";
import { SendPage } from "../Pages/send.js";
import { ManagePage } from '../Pages/manage.js';


test('Trackinteractivity RPD status', async () => {
    const { page } = await launchBrowser();
    const login = new LoginPage(page);
    const send = new SendPage(page);
    const manage = new ManagePage(page);
    //   await login.stagingLogin();
  //  await login.productionLogin();
    await login.stagingSSOLogin();
    //  await login.prodSSOLogin();
    const subject = await send.sendL3RPD();
    await manage.trackInteractivity(subject);


})