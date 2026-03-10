import { launchBrowser } from '../Utils/browser.js';
import { LoginPage } from "../Pages/login.js";
import { test } from '@playwright/test';


test('Corporate Site', async () => {
   const { page } = await launchBrowser();
   const login = new LoginPage(page);
   await login.corporateSiteLogin();
})