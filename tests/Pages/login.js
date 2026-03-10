const config = require('../Utils/config.js');
import { test} from '@playwright/test';
export class LoginPage {
  constructor(page) {
    this.page = page;
    this.username = page.locator("//input[@type='email']");
    this.password = page.locator("//input[@type='password']");
    this.signIn = page.locator("//*[@class='btn-md btn-theme btn-block mt-2 w-75 login-btns']");
    this.signupLink = "//a[@class='ms-1 forgetlink']"
    this.email = page.locator("//input[@id='user_email']");
    this.pswd = page.locator("//input[@id='user_password']");
    this.submitButton = page.locator("//button[@id='modal-submit']");
    this.submitButton1 = page.locator("(//button[@type='submit'])[1]");
    this.rdocs = page.locator("(//a[@target='_blank']//button[1])[2]");
    this.send = page.locator("(//*[@name='Send'])[1]");
    // SSO specific locators
    this.ssoButton = page.locator("//span[text()='Single Sign-On (SSO)']");
    this.azureLoginButton = page.locator("//*[@id='btnAzureLogin']");
    this.microsoftEmail = "//input[@type='email']";
    this.microsoftPassword = "//input[@type='password']";
    this.microsoftSubmit = "//*[@type='submit']";
    this.forgotPasswordLink = "//*[@id='idA_PWD_ForgotPassword']";
  }

  async stagingLogin() {
    await this.loadTime(async () => {
      await this.page.goto(config.stagingDetails.url);
    }, "Staging URL Load Time");
    await this.username.fill(config.stagingDetails.username);
    await this.password.fill(config.stagingDetails.password);
    //     await this.page.click('#recaptcha-anchor')
    await this.signIn.click();
  }

  async productionLogin() {
    await this.loadTime(async () => {
      await this.page.goto(config.productionDetails.url);
    }, "Production URL Load Time");
    await this.username.fill(config.productionDetails.username);
    await this.password.fill(config.productionDetails.password);
    await this.signIn.click();
  }

  async stagingSSOLogin() {
    await this.page.goto(config.stagingDetails.url);
    await this.ssoButton.click();
    const [Microsoftloginpage] = await Promise.all([
      this.page.waitForEvent("popup"),
      this.azureLoginButton.click()
    ]);
    await Microsoftloginpage.locator(this.microsoftEmail, {
      timeout: 60000,
    }).evaluate((el, val) => el.value = val, config.SSODetails.username);
    await Microsoftloginpage.locator(this.microsoftSubmit).click();
    await Microsoftloginpage.waitForSelector(this.forgotPasswordLink);
    await Microsoftloginpage.locator(this.microsoftPassword, {
      timeout: 60000,
    }).evaluate((el, val) => el.value = val, config.SSODetails.password);
    await Microsoftloginpage.locator(this.microsoftSubmit).click();
    await Microsoftloginpage.locator(this.microsoftSubmit).click();

  }

  async prodSSOLogin() {
    await this.page.goto(config.productionDetails.url);
    await this.ssoButton.click();
    const [Microsoftloginpage] = await Promise.all([
      this.page.waitForEvent("popup"),
      this.azureLoginButton.click()
    ]);
    await Microsoftloginpage.locator(this.microsoftEmail, {
      timeout: 120000,
    }).evaluate((el, val) => el.value = val, config.SSODetails.username);
    await Microsoftloginpage.locator(this.microsoftSubmit).click();
    await Microsoftloginpage.waitForSelector(this.forgotPasswordLink);
    await Microsoftloginpage.locator(this.microsoftPassword, {
      timeout: 120000,
    }).evaluate((el, val) => el.value = val, config.SSODetails.password);
    await Microsoftloginpage.locator(this.microsoftSubmit).click();
    await Microsoftloginpage.locator(this.microsoftSubmit).click();
    //  await this.multipleEmails.waitFor({ timeout: 120000 });
  }

  async loadTime(actionCallback, message = "Load Time", page = this.page, waitFor = "load") {
    const start = Date.now();
    await actionCallback(page);
    await page.waitForLoadState(waitFor);
    const seconds = (Date.now() - start) / 1000;
    console.log(`${message}: ${seconds} seconds`);
    return seconds;
  }

  async corporateSiteLogin() {
    await test.step('Validate corporate site login', async () => {
    await this.page.goto(config.productionDetails.url);
    await this.page.locator(this.signupLink).click();
    await this.email.fill(config.productionDetails.username);
    await this.submitButton.click();
    await this.pswd.clear();
    await this.pswd.fill(config.productionDetails.password);
    await this.submitButton1.click();
    const [rdocsPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.rdocs.click()]);
    await rdocsPage.waitForLoadState('networkidle');
    await rdocsPage.locator("(//*[@name='Send'])[1]").click();

  })
  }
}

