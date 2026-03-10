import { test } from '@playwright/test';
import { launchBrowser } from '../Utils/browser.js';
import { LoginPage } from "../Pages/login";
import { SettingsPage } from '../Pages/settings.js';
import { SendPage } from "../Pages/send.js";
import { GeneratePage } from '../Pages/generate.js';

test('Default Settings Validation', async () => {
  const { page } = await launchBrowser();
  const login = new LoginPage(page);
  const settings = new SettingsPage(page);
  const send = new SendPage(page);
  const generate = new GeneratePage(page);
  //   await login.stagingLogin();
//  await login.productionLogin();
await login.stagingSSOLogin();
//  await login.prodSSOLogin();

  //Configure L1 in Settings
  const { ip, maxviews, maxreads, sidenote, restrictdomains } = await settings.defaultDocumentSettings();
  await page.click("(//*[@name='Send'])[2]");
  await page.click("//*[contains(@class,'btn-primary')]")
  await send.ConfiguredSettings({ ip, maxviews, maxreads, sidenote, restrictdomains, securityLevel: 'L1' });
  await page.click("//a[@name='Create']");
  await generate.ConfiguredSettingsInGenerateTab({ ip, maxviews, maxreads, sidenote, restrictdomains, securityLevel: 'L1' });


  //Configure L2 in Settings
  await page.click("//*[@id='navbarSupportedContent']/ul/li[4]");
  await page.click("//*[text()='settings_accessibility']")
  await page.click("#v-tabs-DefaultDocumentSettings-tab")
  await page.selectOption('#AccessControl', "Control Readers");
  await page.click("(//button[@type='button'])[2]")
  await page.click("//*[contains(@class,'btn-primary')]")
  await page.click("(//*[@name='Send'])[2]");
  await send.ConfiguredSettings({ ip, maxviews, maxreads, sidenote, restrictdomains, securityLevel: 'L2' });
  await page.click("//a[@name='Create']");
  await generate.ConfiguredSettingsInGenerateTab({ ip, maxviews, maxreads, sidenote, restrictdomains, securityLevel: 'L2' });


  //Configure L3 in Settings
  await page.click("//*[@id='navbarSupportedContent']/ul/li[4]");
  await page.click("//*[text()='settings_accessibility']")
  await page.click("#v-tabs-DefaultDocumentSettings-tab")
  await page.selectOption('#AccessControl', "Restrict Readers");
  await page.click("(//button[@type='button'])[2]")
  await page.click("//*[contains(@class,'btn-primary')]")
  await page.click("(//*[@name='Send'])[2]");
  await send.ConfiguredSettings({ ip, maxviews, maxreads, sidenote, restrictdomains, securityLevel: 'L3' });
  await page.click("//a[@name='Create']");
  await generate.ConfiguredSettingsInGenerateTab({ ip, maxviews, maxreads, sidenote, restrictdomains, securityLevel: 'L3' });


});