const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
import {test, expect } from "@playwright/test";
import { SendPage } from "./send.js";
import path from "path";
import { ReaderPage } from "./reader.js";
import config from "../Utils/config.js";
import { LoginPage } from "./login.js";

export class GeneratePage {
    constructor(page) {
        this.page = page;
        // ================================
        // Generate Page Locators
        // ================================
        this.createLink = "//a[@name='Create']";
        this.messageBox = "(//textarea[@name='message'])[1]";
        this.fileInput = page.locator("//input[@type='file']");
        this.addMultiEmailIcon = "//*[@class='material-icons text-danger top-2 ms-2']";
        this.multiEmailField = "#multipleAuthorizedEmails";
        this.eDisclosureChk = "//*[@id='chkEDisclosureDiv']";
        this.generateBtn = "//button[text()='Generate ']";
        this.closeBtn = "//*[@class='btn btn-danger px-4 me-1']";
        this.openBtn = "//*[@class='getCode1']";
        this.emailField = "//*[@id='email']";
        this.okBtn = "//*[text()='OK']";
        this.rpdTopMenu = "(//*[@class='collapse navbar-collapse'])[2]";
        this.printCheckbox = "//*[@class='checkbox mt-2 res-mt0']";
        this.canPrintCheckbox = page.locator('#txtPrint');

        // ================================
        // Draft Page Locators
        // ================================
        this.draftTab = "//span[text()=' drafts ']";
        this.subjectInput = "//*[@name='subject']";
        this.replyMessage = "//*[@name='replymessage']";
        this.saveDraftButton = "//*[@class='btn btn-secondary cpx-5 cpy-1 w-50 rp-btn']";
        this.closeDraftButton = "//*[@class='btn btn-secondary w-50 py-2']";
        this.continue = "(//*[@name='button'])[2]";
        this.img = "//*[@id='imgContainer']/img";
        this.loadingIndicator = page.locator("//img[@class='customChailedLoader']");

        // ================================
        // Mailinator Locators
        // ================================
        this.mailinatorURL = "https://www.mailinator.com";
        this.mailinatorSearch = "//*[@id='search']";
        this.mailinatorGoBtn = "//*[text()='GO']";
        this.firstMail = "(//*[@class='ng-binding'])[1]";
        this.passcodeFrame = "//*[@id='html_msg_body']";
        this.passcodeLocator = "//td[contains(text(),'Passcode:')]/../td[2]/span";
        this.passField = "//*[@type='password']";
        this.submitPassBtn = "//*[@name='button']";

        // ================================
        // Security & Feature Locators 
        // ================================
        this.securityStyleIndicator = "//*[@class='card-body sendCreate-pt-12 res-p3']/div/div[2]/div/div[1]/span[2]";
        this.regionLocator = "(//*[@class='map-unselected gContinent' or @class='map-selected gContinent'])";
        this.sidenote = "(//*[@name='message'])[2]";

        this.allowResponseCheckbox = "(//*[@class='ps-0 control'])[1]";
        this.allowResponseText = "(//*[@class='form-control h-50p border-Left'])[1]";

        this.sendVerificationCode = "#sendVerification_id";
        this.emailVerify = "#emailVerify";

        this.proofMain = "//*[@id='confirmation']/../..";
        this.proofCheckbox = "#confirmation";

        this.distributionMain = "#distribution_id";
        this.distributionCheckbox = "#distribution";

        this.votingMain = "//*[@id='voting_id']/..";
        this.votingCheckbox = "#voting";

        this.sharesVoteMain = "#voteShare_id";
        this.sharesVoteCheckbox = "#voteShare";

        this.pageLockerMain = "//*[@id='pagelevelrestriction']/../..";
        this.pageLockerCheckbox = "#pagelevelrestriction";

        this.notifMain = "#notification_id";
        this.notifCheckbox = "#readNotify";

        this.restrictDomainsInput = "#txtRestrictDomains";
        this.maxReads = "#maxReads";
        this.maxViews = "#maxViewsPerDocument";

        this.identifyLeakersMain = "#chkIdentifyLeakersDiv";

        this.timestamp = "#txtTimestamp";
        this.canPrint = "#txtPrint";

        this.ipCheckbox = "#restrictIP";
        this.ipLabel = "//*[@class='d-flex align-items-center']";

        // ===============================
        // ID Leakers Locators
        // ===============================

        this.cipherText = '#CipherText__CipherText';
        this.opacityCipher = '#Opacity__CipherText';
        this.cipherView = '#CipherView__CipherText';
        this.cipherPattern = '#CipherPattern__CipherText';
        this.shape = '#Shape__CipherText';
        this.floatingText = '#FloatingText__FloatingText';
        this.suffixPrefix = '#SuffixPrefixFloatingText__FloatingText';
        this.opacityFloat = '#Opacity__FloatingText';
        this.navigation = '#Navigation__FloatingText';
        this.fontColor = '#FontColor__FloatingText';
        this.fontSize = '#FontSize__FloatingText';
        this.speed = '#Speed__FloatingText';



    }
    async generateRPDforServiceLanguage(language, value) {

        await this.createButton.click();
        await this.messageTextArea.fill(language);
        await selectL1Security(this.page);
        const filePath = path.resolve(__dirname, "../../Files/Do.pdf");
        await this.fileUpload.setInputFiles(filePath);
        const downloadDir = path.resolve(__dirname, "../../Downloads");
        await this.page.waitForTimeout(2000);
        const [download] = await Promise.all([
            this.page.waitForEvent("download"),
            this.generateBtn.click()
        ]);
        await this.cancelButton.click();
        const savePath = path.resolve(downloadDir, `Service Language ${timestamp}.html`);
        await download.saveAs(savePath);
        const fileURL = `file:///${savePath}`;
        await this.page.waitForTimeout(2000);
        const previewPage = await this.page.context().newPage();
        await previewPage.goto(fileURL);
        await validateRPDTranslation(previewPage, value);
        await previewPage.click(this.draftTab);
        await previewPage.fill(this.subjectInput, language);
        await previewPage.fill(this.replyMessage, language);
        await previewPage.click(this.saveDraftButton);
        await previewPage.click(this.closeDraftButton);
    }

    async demo(subject = "Demo" + timestamp, reader = config.xeroxDetails.readeremail) {
        await this.page.click(this.createLink);
        await this.page.fill(this.messageBox, subject);
        const send = new SendPage(this.page);
        await send.selectL3Security();
        await this.page.click(this.addMultiEmailIcon);
        await this.page.fill(this.multiEmailField, reader);
        const filePath = path.resolve(__dirname, "../../Files/sample.docx");
        await this.fileInput.setInputFiles(filePath);
        const downloadDir = path.resolve(__dirname, "../../Downloads");
        //       await this.page.click(this.eDisclosureChk, ({ force: true }));
        const [download] = await Promise.all([
            this.page.waitForEvent("download"),
            this.page.click(this.generateBtn)
        ]);
        await this.page.click(this.closeBtn);
        const savepath = path.resolve(downloadDir, `${subject} ${new Date().getTime()}.html`);
        await download.saveAs(savepath);
        const filepath = `file:///${savepath}`;
        await this.page.waitForTimeout(2000);
        const start = Date.now();
        const RPDPage = await this.page.context().newPage();
        await RPDPage.goto(filepath);
        await RPDPage.waitForLoadState("load");
        await RPDPage.click(this.openBtn);
        const seconds = (Date.now() - start) / 1000;
        console.log("Time taken to load RPD:", seconds, "seconds");

        await RPDPage.locator(this.emailField).click();
        await RPDPage.keyboard.type(reader);
        await RPDPage.click(this.okBtn);
        await RPDPage.click(this.okBtn);
        const mailinatorPage = await this.page.context().newPage();
        await mailinatorPage.goto(this.mailinatorURL);
        await mailinatorPage.fill(this.mailinatorSearch, config.xeroxDetails.readeremail);
        await mailinatorPage.click(this.mailinatorGoBtn);
        await mailinatorPage.click(this.firstMail);
        const passcodeFrame = mailinatorPage.frameLocator(this.passcodeFrame);
        const passcode = await passcodeFrame.locator(this.passcodeLocator).textContent();
        await RPDPage.bringToFront();
        await RPDPage.locator(this.passField).click();
        await RPDPage.keyboard.type(passcode);
        await RPDPage.click(this.submitPassBtn);
        try {
            await RPDPage.locator(this.rpdTopMenu).isVisible()
            await RPDPage.click('#btnNxt');
            await this.page.waitForTimeout(2000);
            await RPDPage.click('#btnNxt');
            await this.page.waitForTimeout(2000);
            await RPDPage.click('#btnNxt');
            await this.page.waitForTimeout(2000);
            await RPDPage.click('#btnNxt');
            await this.page.waitForTimeout(2000);
            await RPDPage.click('#btnNxt');
        }
        catch (err) {
            console.log("Failed to load RPD page");
            console.log(err);
        }

    }
    async generateL1RPD(subject = "Generate L1 RPD" + timestamp) {
        await test.step('Validate corporate site login', async () => {
        const login = new LoginPage(this.page);
        await login.loadTime(async () => {
            await this.page.click(this.createLink);
        }, "Generate Tab Load Time");
        await this.page.fill(this.messageBox, subject);
        const send = new SendPage(this.page);
        await send.selectL1Security();
        const filePath = path.resolve(__dirname, "../../Files/Do.pdf");
        //     const filePath = path.resolve(__dirname, "../../Files/sample.docx");
        await this.fileInput.setInputFiles(filePath);
        const downloadDir = path.resolve(__dirname, "../../Downloads");
        await this.page.click(this.eDisclosureChk, ({ force: true }));

        const [download] = await Promise.all([
            this.page.waitForEvent("download"),
            this.page.click(this.generateBtn)
        ]);
        await this.page.click(this.closeBtn);
        const savePath = path.resolve(downloadDir, `${subject}.html`);
        await download.saveAs(savePath);
        const fileURL = `file:///${savePath}`;
        const RPDPage = await this.page.context().newPage();
        await login.loadTime(async () => {
            await RPDPage.goto(fileURL);
        }, "RPD Load Time");
        return { RPDPage, fileURL, subject };
    });
}

    async generateL2RPD(subject = "Generate L2 RPD" + timestamp, reader = config.xeroxDetails.readeremail) {
        const login = new LoginPage(this.page);
        await login.loadTime(async () => {
            await this.page.click(this.createLink);
        }, "Generate Tab Load Time");
        await this.page.fill(this.messageBox, subject);
        const send = new SendPage(this.page);
        await send.selectL2Security();
        const filePath = path.resolve(__dirname, "../../Files/Do.pdf");
        await this.fileInput.setInputFiles(filePath);
        const downloadDir = path.resolve(__dirname, "../../Downloads");
        await this.page.click(this.eDisclosureChk, ({ force: true }));
        const [download] = await Promise.all([
            this.page.waitForEvent("download"),
            this.page.click(this.generateBtn)
        ]);

        await this.page.click(this.closeBtn);

        const savepath = path.resolve(downloadDir, `${subject}.html`);
        await download.saveAs(savepath);
        const filepath = `file:///${savepath}`;
        await this.page.waitForTimeout(2000);
        const start = Date.now();
        const RPDPage = await this.page.context().newPage();
        await login.loadTime(async () => {
            await RPDPage.goto(filepath);
        }, "RPD Load Time before authentication");
        await RPDPage.bringToFront();
        await RPDPage.click(this.openBtn);
        const seconds = (Date.now() - start) / 1000;
        console.log("Time taken to load RPD before authentication:", seconds, "seconds");
        await RPDPage.locator(this.emailField).click();
        await RPDPage.keyboard.type(reader);
        await RPDPage.click(this.okBtn);
        await RPDPage.click(this.okBtn);

        return { RPDPage, filepath, subject, reader };
    }

    async generateL3RPD(subject = "Generate L3 RPD" + timestamp, reader = config.xeroxDetails.readeremail) {
        const login = new LoginPage(this.page);
        await login.loadTime(async () => {
            await this.page.click(this.createLink);
        }, "Generate Tab Load Time");
        await this.page.fill(this.messageBox, subject);
        const send = new SendPage(this.page);
        await send.selectL3Security();
        await this.page.click(this.addMultiEmailIcon);
        await this.page.fill(this.multiEmailField, reader);
        const filePath = path.resolve(__dirname, "../../Files/Do.pdf");
        await this.fileInput.setInputFiles(filePath);
        const downloadDir = path.resolve(__dirname, "../../Downloads");
        await this.page.click(this.eDisclosureChk, ({ force: true }));

        const [download] = await Promise.all([
            this.page.waitForEvent("download"),
            this.page.click(this.generateBtn)
        ]);

        await this.page.click(this.closeBtn);

        const savepath = path.resolve(downloadDir, `${subject} ${new Date().getTime()}.html`);
        await download.saveAs(savepath);

        const filepath = `file:///${savepath}`;
        await this.page.waitForTimeout(2000);
        const RPDPage = await this.page.context().newPage();
        await login.loadTime(async () => {
            await RPDPage.goto(filepath);
        }, "RPD Load Time before authentication");
        await RPDPage.click(this.openBtn);
        await RPDPage.locator(this.emailField).click();
        await RPDPage.keyboard.type(reader);

        await RPDPage.click(this.okBtn);
        await RPDPage.click(this.okBtn);

        return { RPDPage, filepath, subject };
    }
    async mailinatorPage(RPDPage) {

        const mailinatorPage = await this.page.context().newPage();
        await mailinatorPage.goto(this.mailinatorURL);
        await mailinatorPage.waitForTimeout(2000);
        await mailinatorPage.fill(this.mailinatorSearch, config.xeroxDetails.readeremail);
        await mailinatorPage.click(this.mailinatorGoBtn);
        await mailinatorPage.click(this.firstMail);

        const passcodeFrame = mailinatorPage.frameLocator(this.passcodeFrame);
        const passcode = await passcodeFrame.locator(this.passcodeLocator).textContent();
        await mailinatorPage.close();
        await RPDPage.bringToFront();
        await RPDPage.locator(this.passField).click();
        await RPDPage.keyboard.type(passcode);
        await RPDPage.click(this.submitPassBtn);
        await RPDPage.bringToFront();
    }

    async EDisclosureForL1() {
        const reader = new ReaderPage(this.page);
        const { RPDPage, fileURL, subject } = await this.generateL1RPD(`EDisclosure for L1 ${timestamp}`);
        await reader.readerActionsForEDisclosureL1RPD(RPDPage, fileURL, subject);
    }
    async EDisclosureForL2() {
        const reader1 = new ReaderPage(this.page);
        const { RPDPage, filepath, subject } = await this.generateL2RPD(`EDisclosure for L2 ${timestamp}`);
        await this.mailinatorPage(RPDPage);
        await reader1.readerActionsForEDisclosure(RPDPage, filepath, subject);
    }

    async EDisclosureForL3() {
        const reader1 = new ReaderPage(this.page);
        const { RPDPage, filepath, subject } = await this.generateL3RPD(`EDisclosure for L3 ${timestamp}`);
        await this.mailinatorPage(RPDPage);
        await reader1.readerActionsForEDisclosure(RPDPage, filepath, subject);
    }

    async ApplicableFeaturesWRTSecurityLevelInGenerateTab({ securityLevel }) {

        await this.page.waitForTimeout(2000);

        const style = await this.page.locator(this.securityStyleIndicator).getAttribute("style");
        if (securityLevel === 'L1') {
            expect(style).toContain("display: none;");
        } else {
            expect(style).toBe("display: block;");
        }

        for (let i = 1; i <= 6; i++) {
            const region = this.page.locator(`${this.regionLocator}[${i}]`);
            const className = await region.getAttribute("class");
            expect(["map-unselected gContinent", "map-selected gContinent"]).toContain(className);
        }

        expect(await this.page.locator(this.sidenote).inputValue()).toBe("");

        await expect(this.page.locator(this.allowResponseCheckbox)).not.toBeChecked();
        expect(await this.page.locator(this.allowResponseText).textContent()).not.toBeNull();

        const svcClass = await this.page.locator(this.sendVerificationCode).getAttribute("class");
        expect(svcClass).toContain("disable_section");
        expect(await this.page.locator(this.emailVerify).isChecked()).toBe(false);

        const proofClass = await this.page.locator(this.proofMain).getAttribute("class");
        expect(proofClass).toContain("disable_section");
        await expect(this.page.locator(this.proofCheckbox)).not.toBeChecked();

        const dlClass = await this.page.locator(this.distributionMain).getAttribute("class");
        expect(await this.page.locator(this.distributionCheckbox).isChecked()).toBe(false);
        if (securityLevel === 'L1') {
            expect(dlClass).toContain("disable_section");
        } else {
            expect(dlClass).not.toContain("disable_section");
        }

        const votingClass = await this.page.locator(this.votingMain).getAttribute("class");
        expect(await this.page.locator(this.votingCheckbox).isChecked()).toBe(false);
        if (securityLevel === 'L1') {
            expect(votingClass).toContain("disable_section");
        } else {
            expect(votingClass).not.toContain("disable_section");
        }

        const svClass = await this.page.locator(this.sharesVoteMain).getAttribute("class");
        expect(await this.page.locator(this.sharesVoteCheckbox).isChecked()).toBe(false);

        expect(await this.page.locator(this.pageLockerMain).getAttribute("class")).toContain("disable_section");
        await expect(this.page.locator(this.pageLockerCheckbox)).toBeDisabled();

        if (securityLevel === 'L1') {
            expect(await this.page.locator(this.notifMain).getAttribute("class")).toContain("disable_section");
        } else {
            expect(await this.page.locator(this.notifCheckbox).isChecked()).toBe(false);
        }

        if (securityLevel === 'L1') {
            await expect(this.page.locator(this.restrictDomainsInput)).toBeDisabled();
        } else {
            await expect(this.page.locator(this.restrictDomainsInput)).toBeEnabled();
            expect(await this.page.locator(this.restrictDomainsInput).inputValue()).toBe("");
        }

        if (securityLevel === 'L1') {
            await expect(this.page.locator(this.maxReads)).toBeDisabled();
        } else {
            await expect(this.page.locator(this.maxReads)).toBeEnabled();
            expect(await this.page.locator(this.maxReads).inputValue()).toBe("");
        }

        await expect(this.page.locator(this.maxViews)).toBeEnabled();
        expect(await this.page.locator(this.maxViews).inputValue()).toBe("");

        const ilClass = await this.page.locator(this.identifyLeakersMain).getAttribute("class");
        if (securityLevel === 'L1') {
            expect(ilClass).toContain("disable_section");
        }

        expect(await this.page.locator(this.timestamp).isChecked()).toBe(false);

        expect(await this.page.locator(this.canPrint).isChecked()).toBe(false);

        expect(await this.page.locator(this.ipCheckbox).isChecked()).toBe(false);
        expect(await this.page.locator(this.ipLabel).count()).toBe(0);
    }

    async ConfiguredSettingsInGenerateTab({ ip, maxviews, maxreads, sidenote, restrictdomains, securityLevel }) {
        await this.page.waitForTimeout(2000);

        // Security Style Indicator
        const style = await this.page.locator(this.securityStyleIndicator).getAttribute("style");

        if (securityLevel === 'L1') {
            expect(style).toContain("display: none");
        } else {
            expect(style).toContain("display: block");
        }

        // Region selections
        if (["L1", "L2", "L3"].includes(securityLevel)) {
            for (let i = 1; i <= 6; i++) {
                const region = this.page.locator(`${this.regionLocator}[${i}]`);
                const regionClass = await region.getAttribute("class");
                expect(regionClass).toBe("map-unselected gContinent");
            }
        }

        //  Validate Sidenote
        if (["L1", "L2", "L3"].includes(securityLevel)) {
            await expect(this.page.locator(this.sidenote)).toHaveValue(sidenote);
        }

        //  Allow response
        const allowCheck = this.page.locator(this.allowResponseCheckbox);
        const allowText = this.page.locator(this.allowResponseText);

        if (["L1", "L2", "L3"].includes(securityLevel)) {
            expect(await allowCheck.isChecked()).toBe(true);
            expect(await allowText.inputValue()).not.toBeNull();
        }

        // Send Verification Code (Disabled Always)
        const svcClass = await this.page.locator(this.sendVerificationCode).getAttribute("class");
        expect(svcClass).toContain("disable_section");
        expect(await this.page.locator(this.emailVerify).isChecked()).toBe(false);

        // Proof Options
        const proofClass = await this.page.locator(this.proofMain).getAttribute("class");
        expect(proofClass).toContain("disable_section");
        expect(await this.page.locator(this.proofCheckbox).isChecked()).toBe(false);

        //  Distribution List
        const distClass = await this.page.locator(this.distributionMain).getAttribute("class");
        const distCheck = await this.page.locator(this.distributionCheckbox).isChecked();

        if (securityLevel === "L1") {
            expect(distClass).toContain("disable_section");
            expect(distCheck).toBe(false);
        } else {
            expect(distClass).not.toContain("disable_section");
            expect(distCheck).toBe(true);
        }

        //  Voting
        const voteClass = await this.page.locator(this.votingMain).getAttribute("class");
        const voteCheck = await this.page.locator(this.votingCheckbox).isChecked();

        if (securityLevel === "L1") {
            expect(voteClass).toContain("disable_section");
            expect(voteCheck).toBe(false);
        } else {
            expect(voteClass).not.toContain("disable_section");
            expect(voteCheck).toBe(true);
        }

        //  Shares Vote
        const svClass = await this.page.locator(this.sharesVoteMain).getAttribute("class");
        const svChecked = await this.page.locator(this.sharesVoteCheckbox).isChecked();

        const svSplit = svClass.split(" ");
        if (securityLevel === "L1") {
            expect(svSplit.includes("disable_sectionChailed")).toBe(true);
            expect(svChecked).toBe(false);
        } else {
            expect(svSplit.includes("disable_sectionChailed")).toBe(false);
            expect(svChecked).toBe(true);
        }

        //  Page Locker
        const plClass = await this.page.locator(this.pageLockerMain).getAttribute("class");
        expect(plClass).not.toContain("disable_section");
        await expect(this.page.locator(this.pageLockerCheckbox)).toBeEnabled();

        //  Notification
        const notifClass = await this.page.locator(this.notifMain).getAttribute("class");
        if (securityLevel === "L1") {
            expect(notifClass).toContain("disable_section");
        } else {
            expect(await this.page.locator(this.notifCheckbox).isChecked()).toBe(true);
        }

        // Restrict Domains
        const restrictInput = this.page.locator(this.restrictDomainsInput);
        if (securityLevel === "L1") {
            await expect(restrictInput).toBeDisabled();
        } else {
            await expect(restrictInput).toBeEnabled();
            expect(await restrictInput.inputValue()).toBe(restrictdomains);
        }

        //  Max Reads
        const maxReadsInput = this.page.locator(this.maxReads);
        if (securityLevel === "L1") {
            await expect(maxReadsInput).toBeDisabled();
        } else {
            await expect(maxReadsInput).toBeEnabled();
            expect(await maxReadsInput.inputValue()).toBe(maxreads);
        }

        //  Max Views
        await expect(this.page.locator(this.maxViews)).toBeEnabled();
        expect(await this.page.locator(this.maxViews).inputValue()).toBe(maxviews);

        //  Identify leakers
        const leakClass = await this.page.locator(this.identifyLeakersMain).getAttribute("class");
        if (securityLevel === "L1") {
            expect(leakClass).toContain("disable_section");
        }

        // Timestamp
        const tsChecked = await this.page.locator(this.timestamp).isChecked();
        expect(tsChecked).toBe(true);

        //  Can Print
        const cpChecked = await this.page.locator(this.canPrint).isChecked();
        expect(cpChecked).toBe(true);
    }

    async IdLeakers(selectedValues) {
        const login = new LoginPage(this.page);
        let message = `Mode: ${selectedValues.mode}\n`;

        // Cipher values (if present)
        if (selectedValues.cipher) {
            message += `Cipher Text: ${selectedValues.cipher.CipherText}\n`;
            message += `Opacity Cipher: ${selectedValues.cipher.OpacityCipher}\n`;
            message += `Cipher View: ${selectedValues.cipher.CipherView}\n`;
            message += `Cipher Pattern: ${selectedValues.cipher.CipherPattern}\n`;
        }

        // Shape (only for pattern = 2)
        if (selectedValues.shape !== null && selectedValues.shape !== undefined) {
            message += `Shape: ${selectedValues.shape}\n`;
        }

        // Floating values (if present)
        if (selectedValues.floating) {
            message += `Floating Text: ${selectedValues.floating.FloatingText}\n`;
            message += `Suffix / Prefix: ${selectedValues.floating.SuffixPrefix}\n`;
            message += `Opacity Float: ${selectedValues.floating.OpacityFloat}\n`;
            message += `Navigation: ${selectedValues.floating.Navigation}\n`;
            message += `Font Color: ${selectedValues.floating.FontColor}\n`;
            message += `Font Size: ${selectedValues.floating.FontSize}\n`;
            message += `Speed: ${selectedValues.floating.Speed}\n`;
        }
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const subject = "IdLeakers " + timestamp;
        const filePath = path.resolve(__dirname, "../../Files/Do.pdf");
        await this.fileInput.setInputFiles(filePath);
        console.log('RPD VALUES:', selectedValues);
        await this.page.fill(this.messageBox, message.trim());
        if (await this.canPrintCheckbox.isChecked() === false)
            await this.page.click(this.printCheckbox, ({ force: true }));
        const downloadDir = path.resolve(__dirname, "../../Downloads");
        const [download] = await Promise.all([
            this.page.waitForEvent("download"),
            this.page.click(this.generateBtn)
        ]);
        await this.page.click(this.closeBtn);
        const savepath = path.resolve(downloadDir, `${subject}.html`);
        await download.saveAs(savepath);
        const filepath = `file:///${savepath}`;
        await this.page.waitForTimeout(2000);
        const start = Date.now();
        const RPDPage = await this.page.context().newPage();
        await login.loadTime(async () => {
            await RPDPage.goto(filepath);
        }, "RPD Load Time before authentication");
        await RPDPage.bringToFront();
        await RPDPage.click(this.openBtn);
        const seconds = (Date.now() - start) / 1000;
        console.log("Time taken to load RPD before authentication:", seconds, "seconds");
        await RPDPage.locator(this.emailField).click();
        await RPDPage.keyboard.type(config.xeroxDetails.readeremail);
        await RPDPage.click(this.okBtn);
        await RPDPage.click(this.okBtn);
        const mailinatorPage = await this.page.context().newPage();
        await mailinatorPage.goto(this.mailinatorURL);
        await mailinatorPage.fill(this.mailinatorSearch, config.xeroxDetails.readeremail);
        await mailinatorPage.click(this.mailinatorGoBtn);
        await mailinatorPage.click(this.firstMail);
        const passcodeFrame = mailinatorPage.frameLocator(this.passcodeFrame);
        const passcode = await passcodeFrame.locator(this.passcodeLocator).textContent();
        await RPDPage.bringToFront();
        await RPDPage.locator(this.passField).click();
        await RPDPage.keyboard.type(passcode);
        await RPDPage.click(this.submitPassBtn);

        await login.loadTime(async () => {
            await RPDPage.click(this.continue);
            const img = RPDPage.locator(this.img);
            await img.waitFor({ state: "attached" });
            await img.evaluate((node) => node.complete && node.naturalWidth > 0);
            await this.loadingIndicator.waitFor({ state: 'hidden' });
        }, "Time taken to open RPD after authentication");

        /* ------------------- Timing 4: Print popup ------------------- */
        await login.loadTime(async () => {
            await RPDPage.locator("//*[@title='Click to Print']").click();
            await RPDPage.locator("//img[@class='customChailedLoader']").waitFor({ state: 'hidden' });
            await RPDPage.waitForTimeout(2000);
            await RPDPage.keyboard.press("Escape");
        }, "Time taken to print RPD");

    }

    async validateIdLeakersValues(selectedValues) {

        // ===== MODE =====
        console.log(`VALIDATING MODE → ${selectedValues.mode}`);

        // ===== CIPHER VALIDATION =====
        if (selectedValues.cipher) {

            expect(await this.page.locator(this.cipherText).inputValue())
                .toBe(selectedValues.cipher.CipherText);

            expect(await this.page.locator(this.opacityCipher).inputValue())
                .toBe(selectedValues.cipher.OpacityCipher);

            expect(await this.page.locator(this.cipherView).inputValue())
                .toBe(selectedValues.cipher.CipherView);

            expect(await this.page.locator(this.cipherPattern).inputValue())
                .toBe(selectedValues.cipher.CipherPattern);
        }

        // ===== SHAPE =====
        if (selectedValues.shape !== null && selectedValues.shape !== undefined) {
            expect(await this.page.locator(this.shape).inputValue())
                .toBe(selectedValues.shape);
        }

        // ===== FLOATING VALIDATION =====
        if (selectedValues.floating) {
            expect(await this.page.locator(this.floatingText).inputValue())
                .toBe(selectedValues.floating.FloatingText);

            expect(await this.page.locator(this.suffixPrefix).inputValue())
                .toBe(selectedValues.floating.SuffixPrefix);

            expect(await this.page.locator(this.opacityFloat).inputValue())
                .toBe(selectedValues.floating.OpacityFloat);

            expect(await this.page.locator(this.navigation).inputValue())
                .toBe(selectedValues.floating.Navigation);

            expect(await this.page.locator(this.fontColor).inputValue())
                .toBe(selectedValues.floating.FontColor);

            expect(await this.page.locator(this.fontSize).inputValue())
                .toBe(selectedValues.floating.FontSize);

            expect(await this.page.locator(this.speed).inputValue())
                .toBe(selectedValues.floating.Speed);
        }

        console.log('Generate tab values MATCH Settings values');
    }
}