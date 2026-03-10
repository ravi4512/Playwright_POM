import { LoginPage } from "../Pages/login";
import { test } from '@playwright/test';
import { launchBrowser } from '../Utils/browser.js';
import { PerformancePage } from "../Pages/performance.js";


test('Performance test', async () => {
    
 const browsers = ['chromium', 'firefox'];
  await Promise.all(browsers.map(async (type) => {
    const { browser, page } = await launchBrowser(type);
    const login = new LoginPage(page);
  const performance = new PerformancePage(page);
  // await login.stagingLogin();
  //    await login.productionLogin();
   //    await login.stagingSSOLogin();
      await login.prodSSOLogin();
   for (let i = 1; i <= 3; i++) {
    console.log(`******** Metrics for 20 MB - 218 Pages document - iteration ${i}  *******`);
    await performance.load("../../Files/20MB.pptx");
  }

}));
});