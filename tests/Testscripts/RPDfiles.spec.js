const { test, expect } = require('@playwright/test');
import { RPDfilesPage } from '../Pages/RPDfiles';
import { launchBrowser } from '../Utils/browser.js';

test('Open each HTML file in a separate tab', async () => {

    const { page } = await launchBrowser();
    const rpdFilesPage = new RPDfilesPage(page);
    await rpdFilesPage.RPDFiles(page);
});
