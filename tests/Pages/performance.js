import { LoginPage } from "./login.js";
import { SendPage } from "./send.js";
import path from 'path';
import config from "../Utils/config.js";
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
import { GeneratePage } from "./generate.js";
const { writeToExcel } = require("./excel.js");
import { test, expect } from "@playwright/test";    

export class PerformancePage {
    constructor(page) {
        this.page = page;
        this.createLink = "//a[@name='Create']";
        this.messageBox = "//textarea[@name='message'][1]";
        this.fileInput = page.locator("//input[@type='file']");
        this.generateBtn = "//button[text()='Generate ']";
        this.closeBtn = "//*[@class='btn btn-danger px-4 me-1']";
        this.identifyLeakersCheckbox = '#chkIdentifyLeakersDiv';
        this.printCheckbox = "//*[@class='checkbox mt-2 res-mt0']";
        this.save = "//*[@class='btn btn-primary px-2 ms-1 w-140p truncate']"
        this.openBtn = "//*[@class='getCode1']";
        this.emailField = "//*[@id='email']";
        this.okBtn = "//*[text()='OK']";
        this.mailinatorURL = "https://www.mailinator.com";
        this.mailinatorSearch = "//*[@id='search']";
        this.mailinatorGoBtn = "//*[text()='GO']";
        this.firstMail = "(//*[@class='ng-binding'])[1]";
        this.passcodeFrame = "//*[@id='html_msg_body']";
        this.passcodeLocator = "//td[contains(text(),'Passcode:')]/../td[2]/span";
        this.passField = "//*[@type='password']";
        this.submitPassBtn = "//*[@name='button']";
        this.continue = "(//*[@name='button'])[2]";
        this.addMultiEmailIcon = "//*[@class='material-icons text-danger top-2 ms-2']";
        this.multiEmailField = "#multipleAuthorizedEmails";
        this.rpdTopMenu = "(//*[@class='collapse navbar-collapse'])[2]";
        this.infoicon = "(//*[text()='info'])[2]";
        this.loadingIndicator = page.locator("//img[@class='customChailedLoader']");
        this.canPrintCheckbox = page.locator('#txtPrint');
        this.img = "//*[@id='imgContainer']/img";
    }

    async performance(filepath, sizeLabel, reader = config.xeroxDetails.readeremail) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        let subject = "Performance Generate L2 RPD " + timestamp;
        await this.page.bringToFront();
        const login = new LoginPage(this.page);
        await this.page.click(this.createLink);
        await this.page.fill(this.messageBox, subject);
        const send = new SendPage(this.page);
        await send.selectL2Security();
        // await this.page.click(this.addMultiEmailIcon);
        // await this.page.fill(this.multiEmailField, reader);

        const filePath = path.resolve(__dirname, filepath);
        await this.fileInput.setInputFiles(filePath);

        const downloadDir = path.resolve(__dirname, "../../Downloads");
  /*      await this.page.click(this.identifyLeakersCheckbox, ({ force: true }));
        await this.loadingIndicator.waitFor({ state: 'hidden' });
        await this.page.waitForTimeout(1000);
        await this.page.click(this.save, ({ force: true }));   */
        if (await this.canPrintCheckbox.isChecked() === false)
            await this.page.click(this.printCheckbox, ({ force: true }));

        /* ------------------- Timing 1: Generate RPD ------------------- */
        const startGenerate = Date.now();
        const [download] = await Promise.all([
            this.page.waitForEvent("download"),
            this.page.click(this.generateBtn)
        ]);
        const t_generate = ((Date.now() - startGenerate) / 1000);
        console.log(`Time taken to generate RPD: ${t_generate} seconds`);

        await this.page.click(this.closeBtn);
        const savePath = path.resolve(downloadDir, `${subject}.html`);
        await download.saveAs(savePath);

        const fileURL = `file:///${savePath}`;
        const RPDPage = await this.page.context().newPage();

        /* ------------------- Timing 2: Before authentication ------------------- */
        const t_before = await login.loadTime(async () => {
            await RPDPage.goto(fileURL);
            await RPDPage.click(this.openBtn);
        }, "Time taken to open RPD before authentication");

        /* ------------------- Authentication ------------------- */
        await RPDPage.locator(this.emailField).click();
        await RPDPage.keyboard.type(reader);
        await RPDPage.click(this.okBtn);
        await RPDPage.click(this.okBtn);

        const generatePage = new GeneratePage(this.page);
        await generatePage.mailinatorPage(RPDPage);

        /* ------------------- Timing 3: After authentication ------------------- */
        const t_after = await login.loadTime(async () => {
            await RPDPage.click(this.continue);
            const img = RPDPage.locator(this.img);
            await img.waitFor({ state: "attached" });
            await img.evaluate((node) => node.complete && node.naturalWidth > 0);
            await this.loadingIndicator.waitFor({ state: 'hidden' });
        }, "Time taken to open RPD after authentication");

        /* ------------------- Timing 4: Print popup ------------------- */
        const t_print = await login.loadTime(async () => {
            await RPDPage.locator("//*[@title='Click to Print']").click();
            await RPDPage.locator("//img[@class='customChailedLoader']").waitFor({ state: 'hidden' });
            await RPDPage.waitForTimeout(2000);
            await RPDPage.keyboard.press("Escape");
        }, "Time taken to print RPD");

        /* ------------------- Excel Write Section ------------------- */
        const Excel = require("exceljs");
        const excelPath = path.resolve(process.cwd(), "performance-results.xlsx");  // SAME PATH EVERYWHERE

        const today = new Date().toLocaleDateString("en-GB").replace(/\//g, "-"); // e.g., 04-12-2025
        let iteration = 1;

        // count iterations already today
        try {
            const wb = new Excel.Workbook();
            await wb.xlsx.readFile(excelPath);
            const sheet = wb.getWorksheet(today);
            if (sheet) {
                iteration = sheet.getColumn(1).values.filter(v => typeof v === "string" && v.includes("pages")).length + 1;
            }
        } catch {
            console.log(" Excel not found — will create new one");
        }

        await writeToExcel(today, sizeLabel, {
            generate: t_generate,
            beforeAuth: t_before,
            afterAuth: t_after,
            print: t_print
        });
        console.log("Logged values:", sizeLabel, t_generate, t_before, t_after, t_print);
    }

    async load(filepath,reader = config.xeroxDetails.readeremail) {
         const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        let subject = "Performance Generate L2 RPD " + timestamp;
        await this.page.bringToFront();
        const login = new LoginPage(this.page);
        await this.page.click(this.createLink);
        await this.page.fill(this.messageBox, subject);
        const send = new SendPage(this.page);
        await send.selectL2Security();
        const filePath = path.resolve(__dirname, filepath);
        await this.fileInput.setInputFiles(filePath);
        const downloadDir = path.resolve(__dirname, "../../Downloads");
        if (await this.canPrintCheckbox.isChecked() === false)
            await this.page.click(this.printCheckbox, ({ force: true }));

        /* ------------------- Timing 1: Generate RPD ------------------- */
        const startGenerate = Date.now();
        const [download] = await Promise.all([
            this.page.waitForEvent("download"),
            this.page.click(this.generateBtn)
        ]);
        const t_generate = ((Date.now() - startGenerate) / 1000);
        console.log(`Time taken to generate RPD: ${t_generate} seconds`);

        await this.page.click(this.closeBtn);
        const savePath = path.resolve(downloadDir, `${subject}.html`);
        await download.saveAs(savePath);

        const fileURL = `file:///${savePath}`;
        const RPDPage = await this.page.context().newPage();

        /* ------------------- Timing 2: Before authentication ------------------- */
        const t_before = await login.loadTime(async () => {
            await RPDPage.goto(fileURL);
            await RPDPage.click(this.openBtn);
        }, "Time taken to open RPD before authentication");

        /* ------------------- Authentication ------------------- */
        await RPDPage.locator(this.emailField).click();
        await RPDPage.keyboard.type(reader);
        await RPDPage.click(this.okBtn);
        await RPDPage.click(this.okBtn);

        const generatePage = new GeneratePage(this.page);
        await generatePage.mailinatorPage(RPDPage);

        /* ------------------- Timing 3: After authentication ------------------- */
        const t_after = await login.loadTime(async () => {
            await RPDPage.click(this.continue);
            const img = RPDPage.locator(this.img);
            await img.waitFor({ state: "attached" });
            await img.evaluate((node) => node.complete && node.naturalWidth > 0);
            await this.loadingIndicator.waitFor({ state: 'hidden' });
        }, "Time taken to open RPD after authentication");

    }


}

