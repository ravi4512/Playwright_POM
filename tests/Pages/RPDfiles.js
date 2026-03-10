import { time } from "console";
import config from "../Utils/config.js";
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');
import { GeneratePage } from "./generate.js";
import { expect } from "@playwright/test";

export class RPDfilesPage {

  constructor(page) {
    this.page = page;
    this.openBtn = "//*[contains(text(),'Get Passcode')]";
    this.emailField = "//*[@id='email']";
    this.okBtn = "//*[text()='OK']";
    this.continue = "(//*[@name='button'])[2]";
    this.img = "//*[@id='imgContainer']/img";
    this.xeroxImg = "#page"
    this.nxtbtn = "(//*[@id='btnNxt'])[2]";
    this.loader = page.locator("//*[@class='loading']/img");
    this.reply = "(//*[normalize-space()='drafts'])[2]";
    this.subject = "//*[@name='subject']";
    this.message = "//*[@name='replymessage']";
    this.send = "//*[text()='Send']";

  }
  async RPDFiles() {
    const folderPath = path.resolve(process.cwd(), 'OldRPDs');
    const files = fs.readdirSync(folderPath).filter(file => file.endsWith('.html'));

    for (const file of files) {
      const filePath = path.join(folderPath, file);
      const fileUrl = pathToFileURL(filePath).href;
      console.log('Opening in new tab:', fileUrl);

      //  Open new tab
      const RPDPage = await this.page.context().newPage();
      await RPDPage.goto(fileUrl, { waitUntil: 'domcontentloaded' });
      await RPDPage.waitForLoadState('networkidle');
      const RPostHeder = RPDPage.locator("#navbarCollapse1");
      const xeroxHeader = RPDPage.locator("//*[@class='RobotoFont collapse navbar-collapse d-sm-none d-lg-block']");
      const passcodeField = RPDPage.locator("//*[contains(text(),'Get Passcode')]");
      await this.loader.waitFor({ state: 'hidden' });
      await RPDPage.waitForTimeout(4000);
      if (await RPostHeder.isVisible() && await passcodeField.isVisible() || await xeroxHeader.isVisible() && await passcodeField.isVisible()) {
        await RPDPage.click(this.openBtn);
        await RPDPage.locator(this.emailField).click();
        await RPDPage.keyboard.type(config.xeroxDetails.readeremail);
        await RPDPage.click(this.okBtn);
        await RPDPage.click(this.okBtn);
        const mp = new GeneratePage(this.page);
        await mp.mailinatorPage(RPDPage);
        try {
          await RPDPage.click(this.continue, { timeout: 5000 });
          await expect(RPDPage.locator("//*[text()='Protected Document Viewer']")).toBeVisible();
          const img = RPDPage.locator(this.img);
          await img.waitFor({ state: "attached" });
          await img.evaluate((node) => node.complete && node.naturalWidth > 0);
          await this.loader.waitFor({ state: 'hidden' });
          const button = RPDPage.locator("(//*[@id='btnNxt'])");
          const classValue = await button.getAttribute("class");
          if (!classValue.includes("disabled"))
            await button.click();
          await img.waitFor({ state: "attached" });
          await img.evaluate((node) => node.complete && node.naturalWidth > 0);
          await this.loader.waitFor({ state: 'hidden' });
          await RPDPage.click(this.reply);
          await RPDPage.fill(this.subject, "Automated Reply for RPost RPD");
          await RPDPage.fill(this.message, "This is an RPost theme L2 RPD");
          await RPDPage.click(this.send);
          console.log("Reply sent successfully.");

        }
        catch {
          const img1 = RPDPage.locator(this.xeroxImg);
          await img1.waitFor({ state: "attached" });
          await img1.evaluate((node) => node.complete && node.naturalWidth > 0);
          await this.loader.waitFor({ state: 'hidden' });
          const button1 = RPDPage.locator(this.nxtbtn);
          const classValue1 = await button1.getAttribute("class");
          if (!classValue1.includes("disabled"))
            await button1.click();
          await img1.waitFor({ state: "attached" });
          await img1.evaluate((node) => node.complete && node.naturalWidth > 0);
          await this.loader.waitFor({ state: 'hidden' });
          await RPDPage.click(this.reply);
          await RPDPage.fill(this.subject, "Automated Reply for Xerox RPD");
          await RPDPage.fill(this.message, "This is an Xerox theme L2 RPD");
          await RPDPage.click(this.send);
          console.log("Reply sent successfully.");

        }
      }
      else {
        await RPDPage.waitForLoadState('networkidle');
        await this.loader.waitFor({ state: 'hidden' });
        try {
          await RPDPage.click("(//*[normalize-space()='info'])[2]");
          await expect(RPDPage.locator("//*[text()='Protected Document Viewer']")).toBeVisible();
          const img = RPDPage.locator(this.img);
          await img.waitFor({ state: "attached" });
          await img.evaluate((node) => node.complete && node.naturalWidth > 0);
          await this.loader.waitFor({ state: 'hidden' });
          const button = RPDPage.locator("(//*[@id='btnNxt'])");
          const classValue = await button.getAttribute("class");
          if (!classValue.includes("disabled"))
            await button.click();
          await img.waitFor({ state: "attached" });
          await img.evaluate((node) => node.complete && node.naturalWidth > 0);
          await this.loader.waitFor({ state: 'hidden' });
          await RPDPage.click(this.reply);
          await RPDPage.fill(this.subject, "Automated Reply for RPost RPD");
          await RPDPage.fill(this.message, "This is an RPost theme L1 RPD");
          await RPDPage.click(this.send);
          console.log("Reply sent successfully.");
        }
        catch {
          const img1 = RPDPage.locator(this.xeroxImg);
          await img1.waitFor({ state: "attached" });
          await img1.evaluate((node) => node.complete && node.naturalWidth > 0);
          await this.loader.waitFor({ state: 'hidden' });
          const button1 = RPDPage.locator(this.nxtbtn);
          const classValue1 = await button1.getAttribute("class");
          if (!classValue1.includes("disabled"))
            await button1.click();
          await img1.waitFor({ state: "attached" });
          await img1.evaluate((node) => node.complete && node.naturalWidth > 0);
          await this.loader.waitFor({ state: 'hidden' });
          await RPDPage.click(this.reply);
          await RPDPage.fill(this.subject, "Automated Reply for Xerox RPD");
          await RPDPage.fill(this.message, "This is an Xerox theme L1 RPD");
          await RPDPage.click(this.send);
          console.log("Reply sent successfully.");

        }
      }
    }

  }

}