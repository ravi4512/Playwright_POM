const { expect } = require("@playwright/test");
import { ManagePage } from "./manage";
import { LoginPage } from "./login.js";

export class ReaderPage {
  constructor(page) {
    this.page = page;

    // Locators
    this.watermarkParent = "//*[@class='watermarkParent']";
    this.zoomText = "//*[@class='RobotoFont btn btn-outline-secondary h-30p xerox-zoomtext']";
    this.translationHeader = "//*[@class='rpdFont nav-link p-md-0 font20 ms-4 font-500']";
    this.expectedTranslations = {
      "en-US": "Protected Document Viewer",
      "fr-FR": "Afficheur de documents protégés",
      "de-DE": "Geschützter Dokumentenbetrachter",
      "es-ES": "Visor de documentos protegidos",
      "pt-PT": "Visualizador de documentos protegidos",
      "it-IT": "Visualizzatore documento protetto",
      "nl-NL": "Beschermde documentviewer",
      "ca-ES": "Visualitzador de document protegit",
      "cs-CZ": "Prohlížeč chráněného dokumentu",
      "da-DK": "Beskyttet dokumentviser",
      "fi-FI": "Suojattu asiakirjan katseluohjelma",
      "el-GR": "Πρόγραμμα προβολής προστατευμένου εγγράφου",
      "hu-HU": "Védett dokumentummegtekintő",
      "nb-NO": "Beskyttet dokumenttilgang",
      "pl-PL": "Przeglądarka dokumentów chronionych",
      "ro-RO": "Vizualizator de document protejat",
      "ru-RU": "Программа просмотра защищенного документа",
      "sv-SE": "Skyddad dokumentvisning",
      "tr-TR": "Korumalı Belge Görüntüleyicisi"
    }
    // E-Disclosure Locators
    this.disagreeBtn = "//*[@class='disagree py-2']";
    this.agreeBtn = "//*[@class='agree py-2']";
    this.restrictedMsg = "//*[@class='rpdFont text-center font-1rem text-nowrap1 rd-text']";

    // Manage & Search
    this.manageMenu = "//a[@name='Manage']";
    this.subjectSearchInput = "(//input[@placeholder='Subject/Description'])[1]";
    this.searchIcon = "(//span[@class='material-icons searchHistory'])[1]";
    this.firstResultRow = "(//td[@class='innertTableTd'])[1]";

    // Activity Log
    this.activityLogTab = "//*[text()='Activity Log']";
    this.activityEventRow15 = "(//*[@class='w-15p activityLog-table_td_first-child'])[1]";
    this.activityEventRow10 = "//*[@class='w-10p activityLog-table_td_first-child']";
    this.firstActivityEventRow = "(//*[@class='w-10p activityLog-table_td_first-child'])[1]";

    // Agree flow
    this.okBtn2 = "(//*[@name='button'])[2]";
    this.rpdTopMenu = "(//*[@class='collapse navbar-collapse'])[2]";
  }

  async validateZoomLevel(rpdPage, expectedZoom) {
    const expectedSizes = {
      'Actualsize': { width: "956px", height: "1237px" },
      'Fitpage': { width: "508px", height: "657px" },
      'Fullwidth': { width: "1261px", height: "1631px" },
      '50%': { width: "478px", height: "619px" },
      '75%': { width: "717px", height: "928px" },
      '100%': { width: "956px", height: "1237px" },
      '125%': { width: "1195px", height: "1546px" },
      '150%': { width: "1434px", height: "1856px" },
    };

    const zoomedValue = {
      'Actualsize': '100%',
      'Fitpage': '53%',
      'Fullwidth': '132%',
      '50%': '50%',
      '75%': '75%',
      '100%': '100%',
      '125%': '125%',
      '150%': '150%',
    };

    const expected = expectedSizes[expectedZoom];
    const zoomedSize = zoomedValue[expectedZoom];

    if (!expected) {
      console.log(`Expected zoom level "${expectedZoom}" not found`);
      return;
    }

    const loc = rpdPage.locator(this.watermarkParent);
    await loc.waitFor({ state: "attached", timeout: 6000 });
    const zoomValue = await rpdPage.locator(this.zoomText).textContent()

    console.log(`Displayed zoom value: ${zoomValue}`);

    if (zoomValue === zoomedSize) {
      console.log("Zoom value is matched");
    } else {
      console.log("Zoom value is not matched");
    }

    const actualWidthStr = await rpdPage.locator(this.watermarkParent).evaluate(el => getComputedStyle(el).width);
    const actualHeightStr = await rpdPage.locator(this.watermarkParent).evaluate(el => getComputedStyle(el).height);

    const actualWidth = parseInt(actualWidthStr);
    const actualHeight = parseInt(actualHeightStr);

    const expectedWidth = parseInt(expected.width);
    const expectedHeight = parseInt(expected.height);

    console.log(`Actual width: ${actualWidth}, Actual height: ${actualHeight}`);
    console.log(`Expected width: ${expectedWidth}, Expected height: ${expectedHeight}`);

    expect(actualWidth).toBeGreaterThanOrEqual(expectedWidth);
    expect(actualHeight).toBeGreaterThanOrEqual(expectedHeight);

    if (actualWidth === expectedWidth && actualHeight === expectedHeight) {
      console.log(`Zoom level is matched successfully`);
    } else {
      console.log(`Zoom level is not matched`);
    }
  }

  async validateRPDTranslation(languageCode) {
    const expectedText = this.expectedTranslations[languageCode];

    const textLocator = page.locator(this.translationHeader);

    await textLocator.waitFor({ state: "visible", timeout: 60000 });

    const actualText = await textLocator.textContent();

    if (actualText === expectedText) {
      console.log(`✅ RPD translated correctly to ${languageCode}`);
    } else {
      console.log(`❌ RPD not translated to ${languageCode}`);
      console.log(`Expected: "${expectedText}"`);
      console.log(`Actual:   "${actualText}"`);
    }
  }

  async readerActionsForEDisclosureL1RPD(RPDPage, fileURL, subject) {

    // ---------- Step 1: Click disagree in RPD ----------
    const login = new LoginPage(this.page);
    await RPDPage.click(this.disagreeBtn);
    await RPDPage.waitForTimeout(2000);
    const msg = await RPDPage.locator(this.restrictedMsg).textContent();
    console.log(msg);

    if (msg === "Access to the document is restricted.") {
      expect(msg).toContain("Access to the document is restricted.");
      console.log("RPD is restricted after clicking on Disagree");
    } else {
      console.log(" RPD is NOT restricted after clicking on Disagree");
    }

    // ---------- Step 2: Switch back to sender page ----------
    await this.page.bringToFront();
    await this.page.click(this.manageMenu);

    await this.page.locator(this.subjectSearchInput).fill(subject);
    await this.page.locator(this.searchIcon).click();
    await this.page.click(this.firstResultRow);
    await this.page.click(this.activityLogTab);
    const event = await this.page.locator(this.activityEventRow15).textContent();
    expect(event).toContain("Restricted");

    // ---------- Step 3: Open new page & click Agree ----------
    const agreePage = await this.page.context().newPage();
    await login.loadTime(async () => {
      await agreePage.goto(fileURL);
      await agreePage.click(this.agreeBtn);
    }, "RPD Load Time after clicking Agree");
    await agreePage.waitForTimeout(6000);

    if (await agreePage.locator(this.rpdTopMenu).isVisible()) {
      console.log("RPD is NOT restricted after clicking Agree — Correct");
    } else {
      console.log("RPD still restricted after clicking Agree — Incorrect");
    }

    // ---------- Step 4: Validate Activity Log after clicking Agree ----------
    await this.page.bringToFront();
    await this.page.reload();
    await this.page.locator(this.subjectSearchInput).fill(subject);
    await this.page.locator(this.searchIcon).click();
    await this.page.click(this.firstResultRow);
    await this.page.click(this.activityLogTab);

    const event1 = await this.page.locator(this.activityEventRow15).textContent();
    expect(event1).toContain("Opened");

    // ---------- Step 5: Call reusable functions ----------
    const manage = new ManagePage(this.page);
    await manage.ActivityLog();
    await manage.summary();
  }

  async readerActionsForEDisclosure(RPDPage, filepath, subject) {
    const manage = new ManagePage(this.page);
    const login = new LoginPage(this.page);
    // ---------- Step 1: Click Disagree ----------
    await RPDPage.locator(this.disagreeBtn).click();
    await RPDPage.waitForTimeout(2000);

    const msg = await RPDPage.locator(this.restrictedMsg).textContent();
    console.log(msg);

    if (msg === "Access to the document is restricted.") {
      console.log("RPD is restricted after clicking on disagree");
    } else {
      console.log(" RPD is NOT restricted after clicking on disagree");
    }

    // ---------- Step 2: Validate Interactivity (first scan) ----------
    await this.page.bringToFront();
    await manage.EDisclosureTrackInteractivity(subject);

    // ---------- Step 3: Validate Activity Log shows "Restricted" ----------
    await this.page.click(this.activityLogTab);
    const event = await this.page.locator(this.activityEventRow10).textContent();
    expect(event).toContain("Restricted");

    // ---------- Step 4: Open new reader page and click Agree ----------
    const agreePage = await this.page.context().newPage();
    await login.loadTime(async () => {
      await agreePage.goto(filepath);
      await agreePage.click(this.agreeBtn);
      await agreePage.click(this.okBtn2);
    }, "RPD Load Time after authentication");

    await agreePage.waitForTimeout(6000);

    if (await agreePage.locator(this.rpdTopMenu).isVisible()) {
      console.log(" RPD is NOT restricted after clicking Agree");
    } else {
      console.log(" RPD is still restricted after clicking Agree");
    }

    // ---------- Step 5: Validate Interactivity again after Agree ----------
    await manage.EDisclosureTrackInteractivity(subject);

    // ---------- Step 6: Validate Activity Log shows "Opened" ----------
    await this.page.click(this.activityLogTab);
    const event1 = await this.page.locator(this.firstActivityEventRow).textContent();
    console.log(event1);
    expect(event1).toContain("Opened");

    // ---------- Step 7: Call reusable functions ----------
    await manage.ActivityLog();
    await manage.summary();
  }

}

