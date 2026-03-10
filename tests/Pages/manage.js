import { expect } from '@playwright/test';
import config from '../Utils/config.js';

export class ManagePage {
    constructor(page) {
        this.page = page;
        // Menu + Search
        this.manageMenu = page.locator("//a[@name='Manage']");
        this.subjectSearchInput = page.locator("(//input[@placeholder='Subject/Description'])[1]");
        this.searchIcon = page.locator("(//span[@class='material-icons searchHistory'])[1]");
        this.firstResultRow = page.locator("(//td[@class='innertTableTd'])[1]");

        // Tabs
        this.interactivityTab = page.locator("//*[@id='trChailed0']/td/div/div/ul/li[2]/a/span[2]");
        this.summaryTab = "(//*[text()='Summary'])[1]";

        // Interactivity section
        this.interactivityEntry = page.locator("(//*[@id='trMain0'])[1]");
        this.interactivityStatus = page.locator("//*[@class='col-sm-12 text-start d-flex tracktext']/span[2]");

        // Activity log – Opened / Restricted events
        this.activityOpenedEvent = page.locator("//*[@class='activityLog-table mb-2 box-shadow-light bg-white collapse show header-fixed']/tbody/tr[1]/td/table/tr/td[1]");
        this.activityRestrictedEvent = page.locator("//*[@class='activityLog-table mb-2 box-shadow-light bg-white collapse show header-fixed']/tbody/tr[2]/td/table/tr/td[1]");

        // Access Control – Protect Views
        this.accessControlProtectViews = page.locator("(//input[@value='Protect Views'])[1]");

        // Opened Row Details (index 1)
        this.openedRowTime = page.locator("//*[@id='collapseExample0']/tbody/tr[1]/td/table/tr/td[2]");
        this.openedRowIP = page.locator("//*[@id='collapseExample0']/tbody/tr[1]/td/table/tr/td[3]");
        this.openedRowLocation = page.locator("//*[@id='collapseExample0']/tbody/tr[1]/td/table/tr/td[4]");
        this.openedRowCountry = page.locator("//*[@id='collapseExample0']/tbody/tr[1]/td/table/tr/td[5]");
        this.openedRowNetwork = page.locator("//*[@id='collapseExample0']/tbody/tr[1]/td/table/tr/td[6]");
        this.openedRowReader = page.locator("//*[@id='collapseExample0']/tbody/tr[1]/td/table/tr/td[2]");

        // Restricted Row Details (index 2)
        this.restrictedRowReader = page.locator("//*[@id='collapseExample0']/tbody/tr[2]/td/table/tr/td[2]");
        this.restrictedRowTime = page.locator("//*[@id='collapseExample0']/tbody/tr[2]/td/table/tr/td[3]");
        this.restrictedRowIP = page.locator("//*[@id='collapseExample0']/tbody/tr[2]/td/table/tr/td[4]");
        this.restrictedRowLocation = page.locator("//*[@id='collapseExample0']/tbody/tr[2]/td/table/tr/td[5]");
        this.restrictedRowCountry = page.locator("//*[@id='collapseExample0']/tbody/tr[2]/td/table/tr/td[6]");
        this.restrictedRowNetwork = page.locator("//*[@id='collapseExample0']/tbody/tr[2]/td/table/tr/td[7]");

        // Summary Page Fields
        this.generatedDate = "//*[@id='trChailed0']/td/div/div/div/div/div/div[2]/table/tbody/tr/td[1]";
        this.firstRead = "//*[@id='trChailed0']/td/div/div/div/div/div/div[2]/table/tbody/tr/td[2]";
        this.lastViewedDate = "//*[@id='trChailed0']/td/div/div/div/div/div/div[2]/table/tbody/tr/td[3]";
        this.reads = "//*[@id='trChailed0']/td/div/div/div/div/div/div[2]/table/tbody/tr/td[4]";
        this.totalTime = "//*[@id='trChailed0']/td/div/div/div/div/div/div[2]/table/tbody/tr/td[5]";

        // Readers Tab (Access Control States)
        this.reader1Active = "(//*[@id='trMain0'])[1]/td[10]/button";
        this.reader1Banned = "(//*[@id='trMain0'])[1]/td[10]/div/button";
        this.reader2Active = "(//*[@id='trMain1'])[1]/td[10]/button";
        this.reader2Banned = "(//*[@id='trMain1'])[1]/td[10]/div/button";
        this.reader3Active = "(//*[@id='trMain2'])[1]/td[10]/button";
        this.reader3Banned = "(//*[@id='trMain2'])[1]/td[10]/div/button";
        this.reader4Active = "(//*[@id='trMain3'])[1]/td[10]/button";
        this.reader4Banned = "(//*[@id='trMain3'])[1]/td[10]/div/button";

        // Pause States
        this.reader1Pause = "(//*[@id='trMain0'])[1]/td[10]/div/button";
        this.reader2Pause = "(//*[@id='trMain1'])[1]/td[10]/div/button";
        this.reader3Pause = "(//*[@id='trMain2'])[1]/td[10]/div/button";
        this.reader4Pause = "(//*[@id='trMain3'])[1]/td[10]/div/button";

        // RPD Status
        this.rpdStatusActive = "//*[@class='btn btn-outline-success w-120p truncate ']";
        this.rpdStatusExpire = "//*[@class='btn btn-outline-danger w-120p truncate ']";

        // Add Reader Modal
        this.addReaderBtn = "//*[@title='Add authorized readers']";
        this.emailInput = "//*[@name='email']";
        this.saveReaderBtn = "//*[@title='Save']";
        this.okButton = "//*[@class='btn btn-primary px-5']";


    }

    async EDisclosureTrackInteractivity(subject) {
        await this.page.bringToFront();
        await this.manageMenu.click();
        await this.page.waitForTimeout(10000);
        await this.subjectSearchInput.fill(subject);
        await this.searchIcon.click();
        await this.page.waitForTimeout(8000);
        await this.firstResultRow.click({ timeout: 15000 });
        await this.page.waitForTimeout(2000);
        await this.interactivityTab.click();
        await this.interactivityEntry.click();
        const status = await this.interactivityStatus.textContent();
        if (status.includes("Disagreed")) {
            expect(status).toContain("Disagreed");
        } else {
            expect(status).toContain("Agreed");
        }
    }

    async ActivityLog() {
        const eventOpened = await this.activityOpenedEvent.textContent();
        const eventRestricted = await this.activityRestrictedEvent.textContent();
        const accessControlVisible = await this.accessControlProtectViews.isVisible();

        if (accessControlVisible) {
            // Protect Views Enabled case
            if (eventRestricted.includes("Restricted")) {
                expect(await this.openedRowTime.textContent()).not.toBeNull();
                expect(await this.openedRowIP.textContent()).not.toBeNull();
                expect(await this.openedRowLocation.textContent()).not.toBeNull();
                expect(await this.openedRowCountry.textContent()).not.toBeNull();
                expect(await this.openedRowNetwork.textContent()).not.toBeNull();
            }
            else if (eventOpened.includes("Opened")) {
                expect(await this.openedRowTime.textContent()).not.toBeNull();
                expect(await this.openedRowIP.textContent()).not.toBeNull();
                expect(await this.openedRowLocation.textContent()).not.toBeNull();
                expect(await this.openedRowCountry.textContent()).not.toBeNull();
                expect(await this.openedRowNetwork.textContent()).not.toBeNull();
            }
        }
        else {
            //  Access Control Disabled / Other modes
            if (eventRestricted.includes("Restricted")) {
                expect(await this.restrictedRowReader.textContent()).not.toBeNull();
                expect(await this.restrictedRowTime.textContent()).not.toBeNull();
                expect(await this.restrictedRowIP.textContent()).not.toBeNull();
                expect(await this.restrictedRowLocation.textContent()).not.toBeNull();
                expect(await this.restrictedRowCountry.textContent()).not.toBeNull();
                expect(await this.restrictedRowNetwork.textContent()).not.toBeNull();
            }
            else if (eventOpened.includes("Opened")) {
                expect(await this.openedRowReader.textContent()).not.toBeNull();
                expect(await this.openedRowTime.textContent()).not.toBeNull();
                expect(await this.openedRowIP.textContent()).not.toBeNull();
                expect(await this.openedRowLocation.textContent()).not.toBeNull();
                expect(await this.openedRowCountry.textContent()).not.toBeNull();
                expect(await this.openedRowNetwork.textContent()).not.toBeNull();
            }
        }
    }

    async summary() {
        await this.page.click(this.summaryTab);

        const generatedDateText = await this.page.locator(this.generatedDate).textContent();
        const firstReadText = await this.page.locator(this.firstRead).textContent();
        const lastViewedDateText = await this.page.locator(this.lastViewedDate).textContent();
        const readsText = await this.page.locator(this.reads).textContent();
        const totalTimeText = await this.page.locator(this.totalTime).textContent();

        expect(generatedDateText).not.toBeNull();
        expect(firstReadText).not.toBeNull();
        expect(lastViewedDateText).not.toBeNull();
        expect(readsText).not.toBeNull();
        expect(totalTimeText).not.toBeNull();
    }

    async trackInteractivity(subject) {
        await this.page.click("//a[@name='Manage']");
        await this.subjectSearchInput.fill(subject);
        await this.searchIcon.click();
        await this.firstResultRow.click();
        await this.interactivityTab.click();

        const reader1Active = this.page.locator(this.reader1Active);
        const reader1Banned = this.page.locator(this.reader1Banned);
        const reader2Active = this.page.locator(this.reader2Active);
        const reader2Banned = this.page.locator(this.reader2Banned);
        const reader3Active = this.page.locator(this.reader3Active);
        const reader3Banned = this.page.locator(this.reader3Banned);
        const reader4Active = this.page.locator(this.reader4Active);
        const reader4Banned = this.page.locator(this.reader4Banned);

        const reader1Pause = this.page.locator(this.reader1Pause);
        const reader2Pause = this.page.locator(this.reader2Pause);
        const reader3Pause = this.page.locator(this.reader3Pause);
        const reader4Pause = this.page.locator(this.reader4Pause);

        const rpdStatusActive = this.page.locator(this.rpdStatusActive);
        const rpdStatusExpire = this.page.locator(this.rpdStatusExpire);

        await expect(rpdStatusActive).toContainText("Active");
        await expect(reader1Active).toContainText("Active");
        await expect(reader2Active).toContainText("Active");

        await reader1Active.click();
        await this.page.waitForTimeout(3000);
        await expect(rpdStatusActive).toContainText("Active");
        await expect(reader1Banned).toContainText("Banned");
        await expect(reader2Active).toContainText("Active");

        await reader2Active.click();
        await expect(rpdStatusActive).toContainText("Active");
        await expect(reader1Banned).toContainText("Banned");
        await expect(reader2Banned).toContainText("Banned");

        await reader1Banned.click();
        await expect(rpdStatusActive).toContainText("Active");
        await expect(reader1Active).toContainText("Active");
        await expect(reader2Banned).toContainText("Banned");

        await reader2Banned.click();
        await expect(rpdStatusActive).toContainText("Active");
        await expect(reader1Active).toContainText("Active");
        await expect(reader2Active).toContainText("Active");

        await rpdStatusActive.click();
        await expect(rpdStatusExpire).toContainText("Expire");
        await expect(reader1Pause).toContainText("Pause");
        await expect(reader2Pause).toContainText("Pause");

        await rpdStatusExpire.click();
        await expect(rpdStatusActive).toContainText("Active");
        await expect(reader1Active).toContainText("Active");
        await expect(reader2Active).toContainText("Active");

        await reader1Active.click();
        await rpdStatusActive.click();
        await expect(rpdStatusExpire).toContainText("Expire");
        await expect(reader1Banned).toContainText("Banned");
        await expect(reader2Pause).toContainText("Pause");

        await rpdStatusExpire.click();
        await expect(rpdStatusActive).toContainText("Active");
        await expect(reader1Banned).toContainText("Banned");
        await expect(reader2Active).toContainText("Active");

        await reader2Active.click();
        await rpdStatusActive.click();
        await expect(rpdStatusExpire).toContainText("Expire");
        await expect(reader1Banned).toContainText("Banned");
        await expect(reader2Banned).toContainText("Banned");

        await rpdStatusExpire.click();
        await expect(rpdStatusActive).toContainText("Active");
        await expect(reader1Banned).toContainText("Banned");
        await expect(reader2Banned).toContainText("Banned");

        await reader1Banned.click();
        await reader2Banned.click();
        await rpdStatusActive.click();
        await expect(rpdStatusExpire).toContainText("Expire");
        await expect(reader1Pause).toContainText("Pause");
        await expect(reader2Pause).toContainText("Pause");

        await rpdStatusExpire.click();
        await expect(rpdStatusActive).toContainText("Active");
        await expect(reader1Active).toContainText("Active");
        await expect(reader2Active).toContainText("Active");

        await reader1Active.click();
        await reader2Active.click();
        await this.page.click(this.addReaderBtn);
        await this.page.fill(this.emailInput, config.stagingDetails.demoemail);
        await this.page.click(this.saveReaderBtn);
        await this.page.click(this.okButton);
        await expect(reader1Banned).toContainText("Banned");
        await expect(reader2Banned).toContainText("Banned");
        await expect(reader3Active).toContainText("Active");

        await rpdStatusActive.click();
        await expect(rpdStatusExpire).toContainText("Expire");
        await expect(reader1Banned).toContainText("Banned");
        await expect(reader2Banned).toContainText("Banned");
        await expect(reader3Pause).toContainText("Pause");

        await this.page.click(this.addReaderBtn);
        await this.page.fill(this.emailInput, config.stagingDetails.demoemail1);
        await this.page.click(this.saveReaderBtn);
        await this.page.click(this.okButton);
        await expect(rpdStatusExpire).toContainText("Expire");
        await expect(reader1Banned).toContainText("Banned");
        await expect(reader2Banned).toContainText("Banned");
        await expect(reader3Pause).toContainText("Pause");
        await expect(reader4Pause).toContainText("Pause");

        await rpdStatusExpire.click();
        await expect(rpdStatusActive).toContainText("Active");
        await expect(reader1Banned).toContainText("Banned");
        await expect(reader2Banned).toContainText("Banned");
        await expect(reader3Active).toContainText("Active");
        await expect(reader4Active).toContainText("Active");

        await reader1Banned.click();
        await reader2Banned.click();
        await reader3Active.click();
        await reader4Active.click();
        await expect(rpdStatusActive).toContainText("Active");
        await expect(reader1Active).toContainText("Active");
        await expect(reader2Active).toContainText("Active");
        await expect(reader3Banned).toContainText("Banned");
        await expect(reader4Banned).toContainText("Banned");

        await reader3Banned.click();
        await reader4Banned.click();
        await expect(reader1Active).toContainText("Active");
        await expect(reader2Active).toContainText("Active");
        await expect(reader3Active).toContainText("Active");
        await expect(reader4Active).toContainText("Active");

        await rpdStatusActive.click();
        await expect(rpdStatusExpire).toContainText("Expire");
        await expect(reader1Pause).toContainText("Pause");
        await expect(reader2Pause).toContainText("Pause");
        await expect(reader3Pause).toContainText("Pause");
        await expect(reader4Pause).toContainText("Pause");
    }
}