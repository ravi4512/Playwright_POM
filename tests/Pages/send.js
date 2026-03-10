import config from "../Utils/config";
import path from "path";
import { ReaderPage } from "../Pages/reader";
import { expect } from '@playwright/test';
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');


export class SendPage {
    constructor(page) {
        this.page = page;
        // ================================
        // Security & Core Controls
        // ================================
        this.securityStyleIndicator = page.locator("//*[@class='card-body sendCreate-pt-12 res-p3']/div/div[2]/div/div[1]/span[2]");
        this.controlReadersIndicator = page.locator("//*[@class='card-body sendCreate-pt-12 res-p3']/div/div[3]/div/div/span[2]");
        this.loadingIndicator = page.locator("//img[@class='customChailedLoader']");

        // ================================
        // Main Action Buttons
        // ================================
        this.trackViewsButton = page.locator("(//*[@class='w-118px truncate'])[1]");
        this.controlReadersButton = page.locator("//*[@class='w-120px truncate']");
        this.sendButton = page.locator("(//*[@name='Send'])[2]");

        // ================================
        // Send Page Inputs
        // ================================
        this.recipientInput = page.locator("//input[@id='multipleEmails']");
        this.subjectInput = page.locator("//input[@name='subject']");
        this.fileInput = page.locator("//input[@type='file']");
        this.submitButton = page.locator("//button[text()='Send']");

        // ================================
        // Manage Tab
        // ================================
        this.manageTabIndicator = page.locator("(//*[text()='Subject/Description'])[1]");

        // ================================
        // Status Messages
        // ================================
        this.trackViewsSelectedMsg = "Selected Track Views";
        this.trackViewsAlreadySelectedMsg = "Already selected Track Views";
        this.controlReadersSelectedMsg = "Selected Control Readers";
        this.controlReadersAlreadySelectedMsg = "Already selected Control Readers";
        this.restrictReadersSelectedMsg = "selected Restrict Readers";
        this.restrictReadersAlreadySelectedMsg = "Already selected Restrict Readers";

        // ================================
        // Xerox Locators
        // ================================
        this.protectButton = page.locator("//*[text()='Protect']");
        this.filterDropdown = page.locator("//*[@class='filter-option ng-star-inserted']");
        this.boxOption = page.locator("//*[contains(text(),'Box')]");
        this.nextButton = page.locator("//*[text()='Next']");
        this.userListButton = page.locator("//*[text()='User List']");
        this.addUserButton = page.locator("//*[text()='Add']");
        this.emailDocButton = page.locator("//*[text()='Email Document To User List']");
        this.runButton = page.locator("//*[text()='Run']");
        this.menuOption = page.locator("//*[@class='dn-menu dn-level1 clearfix']/li[2]/a");
        this.settingsIcon = (i) => page.locator(`(//*[@class='doc-action-icon doc-icon-settings xgl-gear xglsize-24'])[${i}]`);
        this.noOfViews = page.locator("//*[@class='doc-info-bottom']/p[1]/span[3]");
        this.totalTime = page.locator("//*[@class='doc-info-bottom']/p[2]/span[3]");
        this.closeDialogButton = page.locator("//*[@class='xrx-btn btn-secondary']");

        // ================================
        // Configure Settings
        // ================================
        this.sideNoteInput = page.locator("(//*[@name='message'])[2]");
        this.allowResponseCheckbox = page.locator("(//*[@class='ps-0 control'])[1]");
        this.allowResponseText = page.locator("(//*[@class='form-control h-50p border-Left'])[1]");

        this.sendVerificationSection = page.locator('#sendVerification_id');
        this.sendVerificationCheckbox = page.locator('#emailVerify');

        this.proofOfSendingCheckbox = page.locator('#confirmation');

        this.distributionListSection = page.locator('#distribution_id');
        this.distributionListCheckbox = page.locator('#distribution');

        this.votingSection = page.locator("//*[@id='voting_id']/..");
        this.votingCheckbox = page.locator('#voting');

        this.sharesVotesSection = page.locator('#voteShare_id');
        this.sharesVotesCheckbox = page.locator('#voteShare');

        this.pageLockerSection = page.locator("//*[@id='pagelevelrestriction']/../..");
        this.pageLockerCheckbox = page.locator('#pagelevelrestriction');

        this.notificationReadingSection = page.locator('#notification_id');
        this.notificationReadingCheckbox = page.locator('#readNotify');

        this.maxReadsInput = page.locator('#maxReads');
        this.maxViewsInput = page.locator('#maxViewsPerDocument');

        this.timestampCheckbox = page.locator('#txtTimestamp');
        this.canPrintCheckbox = page.locator('#txtPrint');

        this.restrictDomainsInput = page.locator('#txtRestrictDomains');

        this.ipCheckbox = page.locator('#restrictIP');
        this.ipLabel = page.locator('#labelIp0');
        this.ip2Label = page.locator("//*[@class='d-flex align-items-center']");

        // ================================
        // Regions (Dynamic)
        // ================================
        this.regions = (i) => page.locator("(//*[@class='map-unselected gContinent' or @class='map-selected gContinent'])" + `[${i}]`);
        //      this.loadingIndicator = page.locator("//img[@class='customChailedLoader']");

        // ================================
        // Text Authentication
        // ================================
        this.securityDropdown = page.locator("//div[contains(@class,'select__value-container')]");
        this.dropdownInput = page.locator("//input[contains(@id,'react-select-') and contains(@id,'-input')]");
        this.readerDropdownIcon = page.locator("(//*[@class='css-1xc3v61-indicatorContainer'])[1]");
        this.removeEmailTag = page.locator("(//*[@class='select__multi-value__remove css-v7duua'])[1]");
        this.dropdownOptions = page.locator("//div[contains(@id,'react-select') and contains(@class,'option')]");
        this.addTextDropdownIcon = page.locator("//*[@class='select__indicators css-1wy0on6']");
        this.textDropdownMenu = page.locator("//div[@class='select__menu css-16tsuj-menu']");
        this.closeDropdown = page.locator("//*[@class='material-icons font-20']");
        this.recipientEmailInput = page.locator("//input[@id='multipleEmails']");
        this.longTextLabel = page.locator("//*[@class='longtextLabel']");
        this.emailTile = page.locator("//div[contains(@class,'select__multi-value__label') and text()='Email']");
        this.selectedValues = page.locator("//div[contains(@class,'select__multi-value__label')]");

    }

    async selectL1Security() {
        await this.loadingIndicator.waitFor({ state: 'hidden', timeout: 60000 });
        const click = await this.securityStyleIndicator.getAttribute("style");
        if (click.includes("display: block;")) {
            await this.trackViewsButton.click();
        }
    }

    async selectL2Security() {
        await this.loadingIndicator.waitFor({ state: 'hidden', timeout: 60000 });
        const securityStyle = await this.securityStyleIndicator.getAttribute("style");
        const controlReadersStyle = await this.controlReadersIndicator.getAttribute("style");

        if (controlReadersStyle.includes("display: none;") && securityStyle.includes("display: block;")) {

        }
        else if (controlReadersStyle.includes("display: block;") && securityStyle.includes("display: block;")) {
            await this.controlReadersButton.click();
        }
        else {
            await this.trackViewsButton.click();

        }
    }

    async selectL3Security() {
        await this.loadingIndicator.waitFor({ state: 'hidden', timeout: 60000 });
        const controlReadersStyle = await this.controlReadersIndicator.getAttribute("style");

        if (controlReadersStyle.includes("display: none;")) {
            await this.controlReadersButton.click();

        }

    }

    async sendL1RPD(subject = 'Send L1 RPD ' + timestamp) {
        await this.sendButton.click();
        await this.recipientInput.fill(config.stagingDetails.recipientemail);
        await this.subjectInput.fill(subject);
        await this.selectL2Security();
        const filePath = path.resolve(__dirname, "../../Files/Do.pdf");
        await this.fileInput.setInputFiles(filePath);
        await this.submitButton.click();
        await this.manageTabIndicator.waitFor();
        return subject;
    }

    async sendL2RPD(subject = 'Send L2 RPD ' + timestamp) {
        await this.sendButton.click();
        await this.recipientInput.fill(config.stagingDetails.recipientemail);
        await this.subjectInput.fill(subject);
        await this.recipientInput.fill(config.stagingDetails.recipientemail1);
        await this.selectL2Security();
        const filePath = path.resolve(__dirname, "../../Files/Do.pdf");
        await this.fileInput.setInputFiles(filePath);
        await this.submitButton.click();
        return subject;
    }

    async sendL3RPD(subject = 'Send L3 RPD ' + timestamp) {
        await this.sendButton.click();
        await this.recipientInput.fill(config.stagingDetails.recipientemail);
        await this.subjectInput.fill(subject);
        await this.recipientInput.fill(config.stagingDetails.recipientemail1);
        await this.selectL3Security();
        const filePath = path.resolve(__dirname, "../../Files/Do.pdf");
        await this.fileInput.setInputFiles(filePath);
        await this.submitButton.click();
        return subject;
    }


    async XeroxRPD() {
        const MSG1 = `Send L1 RPD Xerox theme ${timestamp}`;
        const MSG2 = `Send L2 RPD Xerox theme ${timestamp}`;
        const MSG3 = `Send L3 RPD Xerox theme ${timestamp}`;
        const zoomLevels = {
            1: "Actualsize",
            2: "Fitpage",
            3: "Fullwidth",
            4: "50%",
            5: "75%",
            6: "100%",
            7: "125%",
            8: "150%",
        };

        await this.page.goto(config.xeroxDetails.url);

        // Login to Xerox Workflow Center
        const [popup] = await Promise.all([
            this.page.waitForEvent("popup"),
            this.page.click("(//span[@class='btn-label'])[1]"),
        ]);

        const username = await popup.locator("//input[@name='email']");
        await username.evaluate((el, val) => el.value = val, config.xeroxDetails.username);
        await username.click();
        await popup.keyboard.type("m")
        await popup.click("//button[contains(text(),'Next')]");
        const password = await popup.locator("//input[@name='password']")
        await password.click();
        await password.evaluate((el, val) => el.value = val, config.xeroxDetails.password);
        await popup.keyboard.type("2");
        await popup.click("//*[@type='submit']");
        console.log("Logged into Xerox workflow center");

        // Loop for L1, L2, L3
        for (let i = 1; i <= 3; i++) {
            await this.page.bringToFront();
            await this.protectButton.click();
            await this.filterDropdown.click();
            await this.page.waitForTimeout(2000);

            const [boxPopup] = await Promise.all([this.page.waitForEvent("popup"), this.boxOption.click()]);
            const boxUser = await boxPopup.locator("//*[@id='login']");
            await boxUser.evaluate((el, val) => (el.value = val), config.boxDetails.username);
            const boxPass = await boxPopup.locator("//*[@id='password']");
            await boxPass.evaluate((el, val) => (el.value = val), config.boxDetails.password);
            await boxPopup.click("//*[@name='login_submit']");
            await boxPopup.click("//*[text()='Grant Access to Box']");
            await this.page.click("//*[contains(text(),'eclipse-workspace')]");
            await this.page.click("//*[@class='first-icon xgl-check_off glyph-chbx-radio-theme-uchkd']");
            await this.page.click("//*[text()='OK']");
            console.log(`Uploaded document from Box for L${i} RPD`);
            await this.nextButton.click();

            // Select RPD levels
            if (i === 2) {
                await this.page.locator("(//*[@class='first-icon xgl-radio_off glyph-chbx-radio-theme-uchkd'])[2]").click();
            } else if (i === 3) {
                await this.page.locator("(//*[@class='first-icon xgl-radio_off glyph-chbx-radio-theme-uchkd'])[3]").click();
            }
            const currentMsg = i === 1 ? MSG1 : i === 2 ? MSG2 : MSG3;
            await this.page.locator("//*[@id='undefined']").fill(currentMsg);
            if (i !== 1) {
                await this.page.locator("//*[text()='Identify Screen Capture']").click();
            }
            await this.page.locator("//*[text()='Include Timestamp']").click();
            await this.page.locator("//*[text()='Allow Printing']").click();
            await this.userListButton.click();
            await this.page.fill("(//*[@name='enterEmail'])[2]", config.xeroxDetails.xerox_mailinator);
            await this.addUserButton.click();
            await this.emailDocButton.click();
            await this.page.fill("(//*[@id='subject'])[2]", currentMsg);
            await this.page.fill("(//*[@id='coverLetter'])[2]", currentMsg);
            console.log(`Sent L${i} RPD`);
            await this.nextButton.click();

            if (i === 1) {
                // === DOWNLOAD AND VALIDATION ===
                const [download] = await Promise.all([
                    this.page.waitForEvent("download"),
                    this.runButton.click(),
                ]);
                const downloadDir = path.resolve(__dirname, "../../Downloads");
                const downloadPath = path.resolve(downloadDir, `Xerox L${i} RPD ${timestamp}.html`);
                await download.saveAs(downloadPath);
                const filePath = `file:///${downloadPath}`;

                // Open the RPD file in new page (same context)
                const rpdPage = await this.page.context().newPage();
                await rpdPage.goto(filePath);
                await rpdPage.bringToFront();
                console.log(`Opened L${i} RPD file`);
                await this.verifyRPDPage(rpdPage, currentMsg, i, zoomLevels);
            }

            // Mailinator Passcode flow for L2 & L3 only
            else if (i === 2 || i === 3) {
                const [download] = await Promise.all([
                    this.page.waitForEvent("download"),
                    this.runButton.click(),
                ]);
                const downloadDir = path.resolve(__dirname, "../../Downloads");
                const downloadPath = path.resolve(downloadDir, `Xerox L${i} RPD ${timestamp}.html`);
                await download.saveAs(downloadPath);
                const filePath = `file:///${downloadPath}`;

                // Open the RPD file in new page (same context)

                const rpdPage = await this.page.context().newPage();
                const start = Date.now();
                await rpdPage.goto(filePath);
                await rpdPage.bringToFront();
                console.log(`Opened L${i} RPD file`);
                await rpdPage.click("//p[text()='Get Passcode']");
                const seconds = (Date.now() - start) / 1000;
                console.log("Time taken to load L2 Xerox RPD before authentication:", seconds, "seconds");
                const email = rpdPage.locator("//*[@id='email']");
                await email.click();
                await rpdPage.keyboard.type(config.xeroxDetails.readeremail);
                await rpdPage.click("//*[text()='OK']");
                await rpdPage.click("//*[text()='OK']");

                // open Mailinator to fetch passcode
                const mailTab = await this.page.context().newPage();
                await mailTab.goto("https://www.mailinator.com");
                await mailTab.fill("//*[@id='search']", config.xeroxDetails.readeremail);
                await mailTab.click("//*[text()='GO']");
                await mailTab.click("(//*[@class='ng-binding'])[1]");

                // get passcode inside mail iframe
                const passcodeFrame = mailTab.frameLocator("//*[@id='html_msg_body']");
                const passcode = await passcodeFrame.locator("//span[@class='font-10']").textContent();

                // enter passcode in RPD page
                await rpdPage.bringToFront();
                const passField = rpdPage.locator("//*[@class='RobotoFont form-control input_pass']");
                await passField.click();
                await rpdPage.keyboard.type(passcode.trim());
                await rpdPage.click("//*[text()='OK']");
                await rpdPage.bringToFront();
                console.log(`Passcode entered successfully for L${i} RPD`);
                await this.verifyRPDPage(rpdPage, currentMsg, i);
            }
        }

        // === VERIFY REPORTS ===
        await this.page.waitForTimeout(310000);
        await this.page.bringToFront();
        await this.menuOption.click();

        for (let i = 1; i <= 3; i++) {
            await this.settingsIcon(i).click();
            const views = await this.noOfViews.textContent();
            const totalTime = await this.totalTime.textContent();

            if (views === "1" && totalTime === "0:05:00") {
                console.log(`L${i} - No of views: ${views}, Total time: ${totalTime}`);
                expect(views).toBe("1");
                expect(totalTime).toBe("0:05:00");
            }

            await this.closeDialogButton.click();
        }
    }

    async verifyRPDPage(rpdPage, message, level, zoomLevels) {
        try {
            const start = Date.now();
            const img = rpdPage.locator('#page');
            await img.waitFor({ state: "attached" });
            await img.evaluate((node) => node.complete && node.naturalWidth > 0);
            //    await rpdPage.waitForTimeout(3000);
            const seconds = (Date.now() - start) / 1000;
            console.log(`Time taken to load L${level} RPD after authentication:`, seconds, "seconds");
            for (let j = 1; j <= 8; j++) {
                await rpdPage.bringToFront();
                //         console.log(`Checking zoom option ${zoomLevels[j]}`);
                await rpdPage.click("//*[text()=' expand_more ']");
                await rpdPage.locator(`(//button[@class='RobotoFont dropdown-item'])[${j}]`).click();
                await rpdPage.waitForTimeout(2000);
                //   const reader = new ReaderPage(this.page);
                //   await reader.validateZoomLevel(rpdPage,zoomLevels[j]);
            }
            await rpdPage.click("(//*[@id='btnNxt'])[2]");
            const theme =
                (await rpdPage.locator("(//*[@class='collapse navbar-collapse'])[2]").isVisible())
                    ? "RPost Theme"
                    : "Xerox Theme";
            console.log(`L${level} RPD is displayed in ${theme}`);

            await rpdPage.click("//*[@title='View SideNote®']");
            const sideNote = await rpdPage.locator("//*[@title='View SideNote®']/../ul/li[3]").textContent();
            console.log(`SideNote: ${sideNote}`);

            await rpdPage.click("//span[text()=' drafts ']");
            await rpdPage.fill("//*[@name='subject']", message);
            await rpdPage.fill("//*[@name='replymessage']", message);
            await rpdPage.click("//*[text()='Send']");
            await rpdPage.click("//*[@class='RobotoFont btn btn-secondary w-50 py-2']");
            console.log(`Successfully replied to L${level} RPD`);
        } catch (err) {
            console.log(`Failed to load L${level} RPD`);
            console.log(err);
        }
    }

    async ConfiguredSettings({ ip, maxviews, maxreads, sidenote, restrictdomains, securityLevel }) {
        // ✅ Validate Security Level Behavior
        // const securityStyle = await this.securityStyleIndicator.getAttribute("style");

        // if (securityLevel === "L1") {
        //   expect(securityStyle).toContain("display: none;");
        //   console.log(`Selected ${securityLevel} in send tab security`);
        // } else if (securityLevel === "L2" || securityLevel === "L3") {
        //   await this.loadingIndicator.waitFor({ state: 'hidden', timeout: 60000 });
        //   expect(securityStyle).toBe("display: block;");
        //   console.log(`Selected ${securityLevel} in send tab security`);
        // }
        await test.step('Validate corporate site login', async () => {
        await this.page.waitForTimeout(2000);
        if (securityLevel === 'L1') {
            const bt = this.page.locator("//*[@class='card-body sendCreate-pt-12 res-p3']/div/div[2]/div/div[1]/span[2]");
            const click = await bt.getAttribute("style");
            expect(click).toContain("display: none;");
            console.log(`Selected ${securityLevel} in send tab security`);
        }
        else if (securityLevel === 'L2' || securityLevel === 'L3') {
            await this.page.waitForTimeout(4000);
            const bt = this.page.locator("//*[@class='card-body sendCreate-pt-12 res-p3']/div/div[2]/div/div[1]/span[2]");
            const click = await bt.getAttribute("style");
            expect(click).toBe("display: block;");
            console.log(`Selected ${securityLevel} in send tab security`);
        }

        //  Validate Regions
        if (["L1", "L2", "L3"].includes(securityLevel)) {
            for (let i = 1; i <= 6; i++) {
                const regions = this.page.locator("//*[@class='map-unselected gContinent']" + `[${i}]`);
                const className = await regions.getAttribute("class");
                expect(className).toBe("map-unselected gContinent");
            }
            console.log(`Verified Regions for ${securityLevel}`);
        }

        // Validate Sidenote
        await expect(this.sideNoteInput).toHaveText(sidenote);
        console.log(`Verified Sidenote for ${securityLevel}`);

        //  Validate Allow response
        const allowResponseChecked = await this.allowResponseCheckbox.isChecked();
        const allowResponseText = await this.allowResponseText.textContent();

        expect(allowResponseChecked).toBe(true);
        expect(allowResponseText).not.toBeNull();
        console.log(`Verified Allow response for ${securityLevel}`);

        //  Validate Send Verification Code
        const svcClass = await this.sendVerificationSection.getAttribute("class");
        const svcChecked = await this.sendVerificationCheckbox.isChecked();

        if (securityLevel === "L1") {
            expect(svcClass).toContain("disable_section");
            expect(svcChecked).toBe(false);
            console.log(`Send verification is disabled for ${securityLevel}`);
        } else {
            expect(svcClass).not.toContain("disable_section");
            expect(svcChecked).toBe(true);
            console.log(`Send verification is enabled for ${securityLevel}`);
        }

        //  Validate Proof of Sending
        expect(this.proofOfSendingCheckbox).toBeEnabled();
        expect(this.proofOfSendingCheckbox).toBeChecked();
        console.log(`Verified Proof of sending for ${securityLevel}`);

        //  Validate Distribution List
        const dlClass = await this.distributionListSection.getAttribute("class");
        const dlChecked = await this.distributionListCheckbox.isChecked();

        if (securityLevel === "L1") {
            expect(dlClass).toContain("disable_section");
            expect(dlChecked).toBe(false);
            console.log(`Distribution list disabled for ${securityLevel}`);
        } else {
            expect(dlClass).not.toContain("disable_section");
            expect(dlChecked).toBe(true);
            console.log(`Distribution list enabled for ${securityLevel}`);
        }

        //  Validate Voting
        const voteClass = await this.votingSection.getAttribute("class");
        const voteChecked = await this.votingCheckbox.isChecked();

        if (securityLevel === "L1") {
            expect(voteClass).toContain("disable_section");
            expect(voteChecked).toBe(false);
            console.log(`Voting disabled for ${securityLevel}`);
        } else {
            expect(voteClass).not.toContain("disable_section");
            expect(voteChecked).toBe(true);
            console.log(`Voting enabled for ${securityLevel}`);
        }

        //  Validate Shares Votes
        const sharesClass = await this.sharesVotesSection.getAttribute("class");
        const sharesChecked = await this.sharesVotesCheckbox.isChecked();
        const sharesClassSplit = sharesClass.split(" ");

        if (securityLevel === "L1") {
            expect(sharesClassSplit.includes("disable_sectionChailed")).toBe(true);
            expect(sharesChecked).toBe(false);
            console.log(`Shares votes disabled for ${securityLevel}`);
        } else {
            expect(sharesClassSplit.includes("disable_sectionChailed")).toBe(false);
            expect(sharesChecked).toBe(true);
            console.log(`Shares votes enabled for ${securityLevel}`);
        }

        //  Validate Page Locker
        const pageLockerClass = await this.pageLockerSection.getAttribute("class");

        expect(pageLockerClass).not.toContain("disable_section");
        expect(this.pageLockerCheckbox).toBeEnabled();
        console.log(`Page locker enabled for ${securityLevel}`);

        //  Validate Notification of Reading
        const notifClass = await this.notificationReadingSection.getAttribute("class");
        const notifChecked = await this.notificationReadingCheckbox.isChecked();

        if (securityLevel === "L1") {
            expect(notifClass).toContain("disable_section");
            expect(notifChecked).toBe(false);
            console.log(`Notification Reading disabled for ${securityLevel}`);
        } else {
            expect(notifClass).not.toContain("disable_section");
            expect(notifChecked).toBe(true);
            console.log(`Notification Reading enabled for ${securityLevel}`);
        }

        //  Validate Max Reads per Reader
        if (securityLevel === "L1") {
            await expect(this.maxReadsInput).toBeDisabled();
            console.log(`Max reads disabled for ${securityLevel}`);
        } else {
            await expect(this.maxReadsInput).toBeEnabled();
            expect(await this.maxReadsInput.inputValue()).toBe(maxreads);
            console.log(`Max reads enabled for ${securityLevel}`);
        }

        //  Validate Max Views per Document
        await expect(this.maxViewsInput).toBeEnabled();
        expect(await this.maxViewsInput.inputValue()).toBe(maxviews);
        console.log(`Verified max views for ${securityLevel}`);

        //  Validate Timestamp
        expect(await this.timestampCheckbox.isChecked()).toBe(true);
        console.log(`Timestamp enabled for ${securityLevel}`);

        //  Validate Can Print
        expect(await this.canPrintCheckbox.isChecked()).toBe(true);
        console.log(`Can print enabled for ${securityLevel}`);

        //  Validate Restrict to Domains
        if (securityLevel === "L1") {
            await expect(this.restrictDomainsInput).toBeDisabled();
            console.log(`Restrict domains disabled for ${securityLevel}`);
        } else {
            await expect(this.restrictDomainsInput).toBeEnabled();
            expect(await this.restrictDomainsInput.inputValue()).toBe(restrictdomains);
            console.log(`Restrict domains enabled for ${securityLevel}`);
        }

        //  Validate IP Address
        const ipChecked = await this.ipCheckbox.isChecked();
        expect(ipChecked).toBe(true);
        await expect(this.ipLabel).toContainText(ip);
        console.log(`IP address validated for ${securityLevel}`);
    });
    }
    
    async ApplicableFeaturesWRTSecurityLevel({ securityLevel }) {
        const style = await this.securityStyleIndicator.getAttribute("style");
        if (securityLevel === 'L1') {
            expect(style).toContain("display: none;");
            console.log(`Selected ${securityLevel} in send tab security`);
        } else {
            expect(style).toBe("display: block;");
            console.log(`Selected ${securityLevel} in send tab security`);
        }

        //  Regions validation
        for (let i = 1; i <= 6; i++) {
            const className = await this.regions(i).getAttribute("class");
            expect(["map-unselected gContinent", "map-selected gContinent"]).toContain(className);
        }
        console.log(`Verified Regions for ${securityLevel} in send tab`);

        //  Sidenote empty validation
        expect(await this.sideNoteInput.inputValue()).toBe("");
        console.log(`Sidenote is empty ${securityLevel} in send tab`);

        //  Allow response validation
        await expect(this.allowResponseCheckbox).not.toBeChecked();
        const text = await this.allowResponseText.textContent();
        expect(text).not.toBeNull();
        console.log(`Verified Allow Response for ${securityLevel} in send tab`);

        //  Send Verification Code
        const svcClass = await this.sendVerificationSection.getAttribute("class");
        if (securityLevel === 'L1') {
            expect(svcClass).toContain("disable_section");
            expect(await this.sendVerificationCheckbox.isChecked()).toBe(false);
            console.log(`Send Verification Code checkbox is unchecked ${securityLevel}`);
        } else {
            expect(svcClass).not.toContain("disable_section");
            expect(await this.sendVerificationCheckbox.isChecked()).toBe(false);
            console.log(`Verified Send Verification Code for ${securityLevel}`);
        }

        //  Proof of Sending
        expect(await this.proofOfSendingCheckbox.isChecked()).toBe(false);
        console.log(`Proof of Sending checkbox is unchecked ${securityLevel}`);

        // Distribution list
        const dlClass = await this.distributionListSection.getAttribute("class");
        const distCheck = await this.distributionListCheckbox.isChecked();
        if (securityLevel === 'L1') {
            expect(dlClass).toContain("disable_section");
            expect(distCheck).toBe(false);
        } else {
            expect(dlClass).not.toContain("disable_section");
            expect(distCheck).toBe(false);
        }
        console.log(`Distribution List validated for ${securityLevel}`);

        //  Voting
        const votingClass = await this.votingSection.getAttribute("class");
        const votingCheck = await this.votingCheckbox.isChecked();
        if (securityLevel === 'L1') {
            expect(votingClass).toContain("disable_section");
            expect(votingCheck).toBe(false);
        } else {
            expect(votingClass).not.toContain("disable_section");
            expect(votingCheck).toBe(false);
        }
        console.log(`Voting validated for ${securityLevel}`);

        //  Shares Votes
        const className2 = await this.sharesVotesSection.getAttribute("class");
        const classes = className2.split(" ");
        const shareVotesCheck = await this.sharesVotesCheckbox.isChecked();

        if (securityLevel === 'L1') {
            expect(classes.includes("disable_sectionChailed")).toBe(true);
            expect(shareVotesCheck).toBe(false);
        } else {
            expect(classes.includes("disable_sectionChailed")).toBe(true);
            expect(shareVotesCheck).toBe(false);
        }
        console.log(`Shares votes validated for ${securityLevel}`);

        //  Page Locker
        const className5 = await this.pageLockerSection.getAttribute("class");
        expect(className5).toContain("disable_section");
        await expect(this.pageLockerCheckbox).toBeDisabled();
        console.log(`Page Locker validated for ${securityLevel}`);

        //  Notification of Reading
        const notifClass = await this.notificationReadingSection.getAttribute("class");
        if (securityLevel === 'L1') {
            expect(notifClass).toContain("disable_section");
        } else {
            expect(await this.notificationReadingCheckbox.isChecked()).toBe(false);
        }
        console.log(`Notification of Reading validated for ${securityLevel}`);

        //  Max Reads
        if (securityLevel === 'L1') {
            await expect(this.maxReadsInput).toBeDisabled();
        } else {
            await expect(this.maxReadsInput).toBeEnabled();
            expect(await this.maxViewsInput.inputValue()).toBe("");
        }
        console.log(`Max Reads validated for ${securityLevel}`);

        //  Max Views
        await expect(this.maxViewsInput).toBeEnabled();
        expect(await this.maxViewsInput.inputValue()).toBe("");
        console.log(`Max Views validated for ${securityLevel}`);

        // Timestamp
        expect(await this.timestampCheckbox.isChecked()).toBe(false);
        console.log(`Timestamp validated for ${securityLevel}`);

        //  Can Print
        expect(await this.canPrintCheckbox.isChecked()).toBe(false);
        console.log(`Can Print validated for ${securityLevel}`);

        // IP Address
        expect(await this.ipCheckbox.isChecked()).toBe(false);
        expect(await this.ip2Label.count()).toBe(0);
        console.log(`IP restriction validated for ${securityLevel}`);
    }

    async TextAuthentication() {
        await this.sendButton.click();
        await this.selectL2Security(); // reference from your existing function
        await this.securityDropdown.click();
        await this.dropdownInput.focus();
        await this.page.keyboard.press('ArrowDown');
        const ariaValue = await this.dropdownInput.getAttribute('aria-activedescendant');

        if (ariaValue && ariaValue.includes('react-select-2-option-1')) {
            console.log("Text authentication is enabled");
            await expect(this.emailTile).toBeVisible();
            let rpdSelectedValues;

            // Step 1: Validate default Email
            await this.recipientEmailInput.fill(config.stagingDetails.recipientemail);
            await this.subjectInput.click();
            await this.longTextLabel.dblclick();
            rpdSelectedValues = await this.selectedValues.allTextContents();
            console.log("Default option at RPD:", rpdSelectedValues);

            // Validate Reader Dropdown
            await this.readerDropdownIcon.click();
            await this.dropdownOptions.first().waitFor({ state: 'visible', timeout: 5000 });
            let allReaderTexts = await this.dropdownOptions.allTextContents();
            let expectedReaderOptions = rpdSelectedValues.includes("Email") ? ["Email"] : [];
            let actualReaderOptions = allReaderTexts.filter(text => expectedReaderOptions.includes(text.trim()));
            console.log("Reader options after default:", actualReaderOptions);
            expect(actualReaderOptions.sort()).toEqual(expectedReaderOptions.sort());
            await this.closeDropdown.click();

            // Step 2: Add Text
            await this.addTextDropdownIcon.click();
            await this.page.waitForTimeout(2000);
            await this.textDropdownMenu.click();
            rpdSelectedValues = await this.selectedValues.allTextContents();
            console.log("Options at RPD:", rpdSelectedValues);
            await this.longTextLabel.dblclick();

            // Validate Reader Dropdown after adding Text
            await this.readerDropdownIcon.click();
            await this.dropdownOptions.first().waitFor({ state: 'visible', timeout: 5000 });
            allReaderTexts = await this.dropdownOptions.allTextContents();
            if (rpdSelectedValues.includes("Email") && rpdSelectedValues.includes("Text")) {
                let expectedReaderOptionss = ["Email", "Text", "Both"];
                let actualReaderOptionss = allReaderTexts.filter(text => expectedReaderOptionss.includes(text.trim()));
                console.log("Reader options after adding Text:", actualReaderOptionss);
                expect(actualReaderOptionss.sort()).toEqual(expectedReaderOptionss.sort());
            }
            await this.closeDropdown.click();

            // Step 3: Remove Email at RPD
            await this.removeEmailTag.click();
            rpdSelectedValues = await this.selectedValues.allTextContents();
            console.log("Options after removing email:", rpdSelectedValues);
            await this.longTextLabel.dblclick();
            await this.readerDropdownIcon.click();
            await this.dropdownOptions.first().waitFor({ state: 'visible', timeout: 5000 });
            allReaderTexts = await this.dropdownOptions.allTextContents();
            expectedReaderOptions = rpdSelectedValues.includes("Text") ? ["Text"] : [];
            actualReaderOptions = allReaderTexts.filter(text => expectedReaderOptions.includes(text.trim()));
            console.log("Reader options after removing Email:", actualReaderOptions);
            expect(actualReaderOptions.sort()).toEqual(expectedReaderOptions.sort());
        }

        else {
            console.log("Text authentication is disabled");
        }
    }
}
