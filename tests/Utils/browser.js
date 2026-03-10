import { chromium, firefox, webkit } from '@playwright/test';

export async function launchBrowser(browserType = 'chromium') {
  let browserLauncher;

  switch (browserType) {
    case 'firefox':
      browserLauncher = firefox;
      break;
    case 'webkit':
      browserLauncher = webkit;
      break;
    default:
      browserLauncher = chromium; // existing behavior
  }

  const browser = await browserLauncher.launch({
    headless: false,
    timeout: 60000,
    slowMo: 1000,
    devtools: false,
  });

  const context = await browser.newContext();
  const page = await context.newPage();
  return { browser, context, page };
}
