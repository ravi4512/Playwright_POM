import { test } from '@playwright/test';
import { launchBrowser } from '../Utils/browser.js';
import { SendPage } from "../Pages/send.js";

test('Xerox RPD', async () => {
    const { page } = await launchBrowser();
    const send = new SendPage(page);
    await send.XeroxRPD();

}
)