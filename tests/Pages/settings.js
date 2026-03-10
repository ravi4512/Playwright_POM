import { test,expect } from '@playwright/test';
import { SendPage } from './send.js';
import { LoginPage } from "./login.js";
import { GeneratePage } from "./generate.js";

export class SettingsPage {
  constructor(page) {
    this.page = page;

    // SETTINGS – COMMON
    this.settingsMenu = page.locator("//*[@id='navbarSupportedContent']/ul/li[4]");
    this.accessibilityTab = page.locator("//*[text()='settings_accessibility']");
    this.personalCustomerAdmin = page.locator("//*[text()='business']");

    // GENERAL TAB
    this.generalTab = page.locator("//*[@id='v-tabs-General-tab']");
    this.serviceLanguageDropdown = page.locator("//select[@id='ServiceLanguage']");
    this.languages = [
      'English', 'Dutch', 'German', 'Danish', 'French', 'Spanish', 'Portuguese',
      'Italian', 'Catalan', 'Czech', 'Finnish', 'Greek', 'Hungarian', 'Norwegian',
      'Polish', 'Romanian', 'Russian', 'Swedish', 'Turkish'
    ];
    this.dateformat = page.locator("#DateFormat");
    this.timezone = page.locator("#TimeZone");
    this.applanguage = page.locator("#AppLanguage");
    this.landingpage = page.locator("#LandingPage");

    // ADVANCE TAB
    this.advanceTab = page.locator("//*[@id='v-tabs-Advance-tab']");
    this.eDisclosureToggle = page.locator("#Enabled_EDisclosure_common");
    this.cbProtectViews = page.locator("//*[text()='Protect Views']");
    this.cbControlReaders = page.locator("//*[text()='Control Readers']");
    this.cbRestrictReaders = page.locator("//*[text()='Restrict Readers']");
    this.passwordlength = page.locator("#PasscodeLength");
    this.trackkilleddocuments = page.locator("#Disabled_TrackKilledDocument_common");
    this.edisclosuredisable = page.locator("#Disabled_EDisclosure_common");

    // DEFAULT DOCUMENT SETTINGS TAB
    this.defaultDocumentSettingsTab = page.locator("#v-tabs-DefaultDocumentSettings-tab");
    this.accessControl = page.locator("#AccessControl");
    this.clearIndicator = page.locator("//*[@class='select__indicator select__clear-indicator css-1xc3v61-indicatorContainer']");
    this.bannedRegionsInput = page.locator("//*[@class='select__input-container css-19bb58m']");
    this.removeIP = page.locator("(//*[@class='material-icons text-danger top-2 ms-2'])");
    this.ipaddressInput = page.locator("#AllowedIP");
    this.launchesDropdown = page.locator("#Launches");
    this.expires = page.locator("#Expires");
    this.restrictToDomains = page.locator("#RestrictToDomains");
    this.watermark = page.locator("#Watermark");
    this.maxViewsPerDocument = page.locator("#maxViewsPerDocument");
    this.maxReadsPerReader = page.locator("#MaxReadsperReader");
    this.maxReadsPerReaderl2 = page.locator("#MaxReadsPerReader");
    this.sideNote = page.locator("#SideNote");
    this.restorebutton = page.locator("//*[text()='settings_backup_restore']");
    this.allowedipaddresses = page.locator("#AllowedIP");
    this.bannedregions = page.locator("input[role='combobox']");

    // CONTENT SECURITY TAB
    this.contentSecurityTab = page.locator("#v-tabs-ContentSecurity-tab");
    this.idleakersToggle = page.locator("#Enabled_IDLeakers_commonContentSecuritySetting");
    this.cipherTextDropdown = page.locator("#CipherText");
    this.opacityCipherDropdown = page.locator("#Opacity");
    this.cipherViewDropdown = page.locator("#CipherView");
    this.cipherPatternDropdown = page.locator("#CipherPattern");
    this.shapeDropdown = page.locator("#Shape");
    this.floatingTextDropdown = page.locator("#FloatingText");
    this.suffixPrefixDropdown = page.locator("select#SuffixPrefixFloatingText");
    this.opacityFloatDropdown = page.locator("#Opacity");
    this.navigationDropdown = page.locator("#Navigation");
    this.fontColorDropdown = page.locator("#FontColor");
    this.fontSizeDropdown = page.locator("#FontSize");
    this.speedDropdown = page.locator("#Speed");
    this.cipherTextTab = page.locator("//*[text()='Cipher Text']");

    // FLOATING TEXT TAB
    this.floatingTextTab = page.locator("//*[text()='Floating Text']");
    this.previewButton = page.locator("//*[@title='Preview']");
    this.closePreview = page.locator("//*[@class='btn btn-outline-danger Readerclose modalclose download mt-1']");
    this.sendButton = page.locator("(//*[@name='Send'])[2]");
    this.identifyLeakersCheckbox = page.locator("#chkIdentifyLeakersDiv");
    this.innerTab = page.locator("//*[@class='nav-link d-flex align-items-center inner-tab ']");
    this.goBackButton = page.locator("//*[@class='btn btn-danger px-2 me-2 ms-1 w-140p truncate']");
    this.createLink = "//a[@name='Create']";

    //Direct send defaults
    this.directsendDefaultsTab = page.locator("//*[@title='Direct Send Defaults']");
    this.protectViews = page.locator("//*[text()='visibility_lock']");
    this.controlReaders = page.locator("//*[text()='manage_accounts']");
    this.restrictReaders = page.locator("//*[text()='lock_person']");
    this.allowResponsesTol1 = page.locator("#Disabled_AllowResponsesTo_l1");
    this.timestampl1 = page.locator("#Disabled_Timestamp_l1");
    this.proofOfSendingl1 = page.locator("#Disabled_ProofOfSending_l1");
    this.canPrintl1 = page.locator("#Disabled_CanPrint_l1");
    this.trackkilleddocumentsl1 = page.locator("#Disabled_TrackKilledDocuments_l1");
    this.edisclosurel1 = page.locator("#Disabled_EDisclosure_l1");
    this.allowResponsesTol2 = page.locator("#Disabled_AllowResponsesTo_l2");
    this.timestampl2 = page.locator("#Disabled_Timestamp_l2");
    this.proofOfSendingl2 = page.locator("#Disabled_ProofOfSending_l2");
    this.canPrintl2 = page.locator("#Disabled_CanPrint_l2");
    this.trackkilleddocumentsl2 = page.locator("#Disabled_TrackKilledDocuments_l2");
    this.edisclosurel2 = page.locator("#Disabled_EDisclosure_l2");
    this.distributionListl2 = page.locator("#Disabled_DisplayDistributionList_l2");
    this.votingl2 = page.locator("#Disabled_Voting_l2");
    this.shareVotesl2 = page.locator("#Disabled_ShareVotes_l2");
    this.notificationOfReadingl2 = page.locator("#Disabled_NotificationOfReading_l2");
    this.textauthenticationl2 = page.locator("#Disabled_SMSAuthentication_l2");
    this.allowResponsesTol3 = page.locator("#Disabled_AllowResponsesTo_l3");
    this.timestampl3 = page.locator("#Disabled_Timestamp_l3");
    this.proofOfSendingl3 = page.locator("#Disabled_ProofOfSending_l3");
    this.canPrintl3 = page.locator("#Disabled_CanPrint_l3");
    this.trackkilleddocumentsl3 = page.locator("#Disabled_TrackKilledDocuments_l3");
    this.edisclosurel3 = page.locator("#Disabled_EDisclosure_l3");
    this.distributionListl3 = page.locator("#Disabled_DisplayDistributionList_l3");
    this.votingl3 = page.locator("#Disabled_Voting_l3");
    this.shareVotesl3 = page.locator("#Disabled_ShareVotes_l3");
    this.notificationOfReadingl3 = page.locator("#Disabled_NotificationOfReading_l3");
    this.textauthenticationl3 = page.locator("#Disabled_SMSAuthentication_l3");
    this.defaultsettingsfor = page.locator("#DefaultSettingsFor");
    this.maxViewsPerDocument1 = page.locator("#MaxViewsPerDocument");

    // SAVE + CONFIRM BUTTONS (unified)
    this.saveButton = page.locator("//*[text()='Save']");
    this.confirmPopupButton = page.locator("//*[text()='Confirm']");
    this.cancelPopupButton = page.locator("//*[text()='Cancel']");

  }

  async servicelanguageSettings() {
    for (let i = 0; i < this.languages.length; i++) {

      const language = this.languages[i];
      await this.page.bringToFront(); ings
      await this.settingsMenu.click();
      if (await this.personalUserRole.isVisible()) {
        await this.personalUserRole.click();
      } else {
        await this.personalCustomerAdmin.click();
      }
      await this.generalTab.click();
      const options = await this.serviceLanguageDropdown.locator("option");
      const value = await options.nth(i).getAttribute("value");
      console.log("Selecting value:", value);
      await this.page.selectOption("//select[@id='ServiceLanguage']", value); e
      await this.saveButton.click();
      await this.confirmPopupButton.click();
      await generateRPDforServiceLanguage(this.page, context, language, value);
    }
  }

  async edisclosureSettings() {
    await this.settingsMenu.click();
    await this.accessibilityTab.click();
    await this.advanceTab.click();

    const isEnabled = await this.eDisclosureToggle.isChecked();

    const checkboxes = [
      this.cbProtectViews,
      this.cbControlReaders,
      this.cbRestrictReaders
    ];
    if (!isEnabled) {
      await this.eDisclosureToggle.click({ force: true });
      for (const checkbox of checkboxes) {
        if (!(await checkbox.isChecked())) {
          await checkbox.click({ force: true });
        }
      }
    } else {
      console.log("EDisclosure is already enabled");
      for (const checkbox of checkboxes) {
        if (!(await checkbox.isChecked())) {
          await checkbox.click({ force: true });
        }
      }
    }
    await this.saveButton.click();
    await this.confirmPopupButton.click();
  }

  async defaultDocumentSettings(
    
    ip = "127.0.0.1",
    maxviews = "10",
    maxreads = "10",
    sidenote = "SideNote",
    restrictdomains = "rpostlabs.com,yahoo.com,yahoo1.com"
  ) {
    await test.step('Validate corporate site login', async () => {
    const settings = {
      1: 'Allow responses to',
      2: 'Send verification code',
      3: 'Proof of sending',
      4: 'Display distribution list',
      5: 'Voting',
      6: 'Share votes',
      7: 'Notification of reading',
      8: 'Timestamp',
      9: 'Can print',
    };

    await this.settingsMenu.click();
    await this.accessibilityTab.click();
    await this.defaultDocumentSettingsTab.click();
    await this.accessControl.selectOption("Protect Views");
    if (await this.clearIndicator.isVisible()) {
      await this.clearIndicator.click();
    }

    await this.bannedRegionsInput.click();
    const regions = ["Europe", "North America", "South America", "Asia", "Oceania", "Africa"];
    for (const region of regions) {
      await this.page.keyboard.type(region);
      await this.page.keyboard.press("Enter");
    }

    const deleteIPCount = await this.removeIP.count();
    if (deleteIPCount > 0) {
      while (await this.removeIP.count() > 0) {
        await this.removeIP.first().click();
      }
    }

    await this.ipaddressInput.fill(ip);
    await this.launchesDropdown.selectOption("0");
    await this.expires.fill("10");
    await this.restrictToDomains.fill(restrictdomains);
    await this.watermark.selectOption("1");
    await this.maxViewsPerDocument.fill(maxviews);
    await this.maxReadsPerReader.fill(maxreads);
    await this.sideNote.fill(sidenote);

    for (let i = 1; i <= 9; i++) {
      const checkbox = this.page.locator("(//*[text()='Pre-Select'])" + `[${i}]`);
      const isChecked = await checkbox.isChecked();
      if (!isChecked) {
        await checkbox.click({ force: true });
        console.log(`Enabled ${settings[i]} setting`);
      }
      else {
        console.log(`${settings[i]} setting is already enabled`);
      }
    }

    const radioButtons = [
      this.page.locator("#Enabled_PageLevelRestrictions_common"),
      this.page.locator("#Enabled_SMSAuthentication_common"),
    ];

    for (const radioButton of radioButtons) {
      const isChecked = await radioButton.isChecked();
      if (!isChecked) {
        await radioButton.click({ force: true });
      }
      else {
      }
    }

    await this.saveButton.click();
    await this.confirmPopupButton.click();

    return { ip, maxviews, maxreads, sidenote, restrictdomains };
  });
}

  async defaultValuesInSettings() {
    const login = new LoginPage(this.page);
    await login.loadTime(async () => {
      await this.settingsMenu.click();
    }, "Settings tab Load Time");
    await this.accessibilityTab.click();
    await login.loadTime(async () => {
      await this.defaultDocumentSettingsTab.click();
    }, "Default Document Settings tab Load Time");
    await this.accessControl.selectOption("Protect Views");

    if (await this.clearIndicator.isVisible()) {
      await this.clearIndicator.click();
    }

    const deleteIPCount = await this.removeIP.count();
    if (deleteIPCount > 0) {
      while (await this.removeIP.count() > 0) {
        await this.removeIP.first().click();
      }
    }

    await this.launchesDropdown.selectOption("0");
    await this.expires.fill('');
    await this.restrictToDomains.fill('');
    await this.watermark.selectOption("0");
    await this.maxViewsPerDocument.fill('');
    await this.maxReadsPerReader.fill('');
    await this.sideNote.fill('');

    for (let i = 1; i <= 9; i++) {
      const checkbox = this.page.locator("(//*[text()='Pre-Select'])" + `[${i}]`);
      const isChecked = await checkbox.isChecked();
      if (isChecked) {
        await checkbox.click({ force: true });
      }
    }

    const radioButtons = [
      this.page.locator("#Disabled_PageLevelRestrictions_common"),
      this.page.locator("#Disabled_SMSAuthentication_common")
    ];

    for (const radioButton of radioButtons) {
      const isChecked = await radioButton.isChecked();
      if (!isChecked) {
        await radioButton.click({ force: true });
      }
    }
    await this.saveButton.click();
    await this.confirmPopupButton.click();
  }

  async contentSecurity() {

    await this.settingsMenu.click();
    await this.accessibilityTab.click();
    await this.contentSecurityTab.click();

    if (!(await this.idleakersToggle.isChecked())) {
      await this.idleakersToggle.click({ force: true });
    }

    const cipherDropdowns = [
      { key: 'CipherText', locator: '#CipherText', options: ['0', '1', '2', '3'] },
      { key: 'OpacityCipher', locator: '#Opacity', options: ['0', '1', '2', '3', '4', '5', '6', '7', '8'] },
      { key: 'CipherView', locator: '#CipherView', options: ['0', '1', '2'] },
      { key: 'CipherPattern', locator: '#CipherPattern', options: ['0', '1', '2'] },
      { key: 'Shape', locator: '#Shape', options: ['1', '2', '3'] }
    ];

    const floatingDropdowns = [
      { key: 'FloatingText', locator: '#FloatingText', options: ['0', '1', '2'] },
      { key: 'SuffixPrefix', locator: 'select#SuffixPrefixFloatingText', textboxLocator: 'input#SuffixPrefixFloatingText', options: ['0', '1'] },
      { key: 'OpacityFloat', locator: '#Opacity', options: ['0', '1', '2', '3', '4', '5', '6', '7', '8'] },
      { key: 'Navigation', locator: '#Navigation', options: ['0', '1'] },
      { key: 'FontColor', locator: '#FontColor', options: ['0', '1', '2'] },
      { key: 'FontSize', locator: '#FontSize', options: ['0', '1', '2'] },
      { key: 'Speed', locator: '#Speed', options: ['0', '1', '2'] }
    ];

    const cipherIterations = Math.max(
      ...cipherDropdowns.filter(d => d.key !== 'Shape').map(d => d.options.length)
    );

    const floatingIterations = Math.max(
      ...floatingDropdowns.map(d => d.options.length)
    );

    const generate = new GeneratePage(this.page);

    /* ====================================================
       CIPHER TEXT ONLY
       ==================================================== */

    await this.page.locator('#IDLeakersType').selectOption('Cipher Text Only');
    console.log('MODE → CIPHER ONLY');
    await expect(this.cipherTextTab).toHaveCSS('pointer-events', 'auto');
    await expect(this.floatingTextTab).toHaveCSS('pointer-events', 'none');

    for (let i = 0; i < cipherIterations; i++) {

      let cipherLog = {};
      let shapeValue = null;

      await this.cipherTextTab.click();
      let cipherPatternValue = null;

      for (const c of cipherDropdowns) {
        if (c.key === 'Shape') continue;

        const value = c.options[i % c.options.length];
        cipherLog[c.key] = value;

        await this.page.locator(c.locator).selectOption({ value });

        if (c.key === 'CipherPattern') cipherPatternValue = value;
      }

      if (cipherPatternValue === '2') {
        const shapeDrop = cipherDropdowns.find(d => d.key === 'Shape');
        shapeValue = shapeDrop.options[i % shapeDrop.options.length];
        await this.page.locator(shapeDrop.locator).selectOption({ value: shapeValue });
      }

      const selectedValues = {
        mode: 'Cipher Text Only',
        cipher: cipherLog,
        shape: shapeValue
      };
      console.log('SELECTED VALUES:', selectedValues);

      await this.previewButton.click();
      await this.page.waitForTimeout(2000);
      await this.closePreview.click();
      await this.saveButton.click();
      await this.confirmPopupButton.click();

      await this.page.click(this.createLink);
      const sendCipher = new SendPage(this.page);
      await sendCipher.selectL2Security();
      await this.identifyLeakersCheckbox.click();
      await expect(this.cipherTextTab).toHaveCSS('pointer-events', 'auto');
      await expect(this.floatingTextTab).toHaveCSS('pointer-events', 'none');
      await generate.validateIdLeakersValues(selectedValues);
      await this.goBackButton.click();
      await generate.IdLeakers(selectedValues);
      await this.page.bringToFront();

      await this.settingsMenu.click();
      await this.accessibilityTab.click();
      await this.contentSecurityTab.click();
    }

    /* ====================================================
       FLOATING TEXT ONLY
       ==================================================== */

    await this.page.locator('#IDLeakersType').selectOption('Floating Text Only');
    console.log('MODE → FLOATING ONLY');
    await expect(this.cipherTextTab).toHaveCSS('pointer-events', 'none');
    await expect(this.floatingTextTab).toHaveCSS('pointer-events', 'auto');

    for (let i = 0; i < floatingIterations; i++) {

      let floatingLog = {};

      await this.floatingTextTab.click();

      for (const f of floatingDropdowns) {
        const value = f.options[i % f.options.length];
        floatingLog[f.key] = value;

        await this.page.locator(f.locator).selectOption({ value });

        if (f.textboxLocator) {
          await this.page.locator(f.textboxLocator).fill(`Sampleeeee ${value}`);
        }
      }

      const selectedValues = {
        mode: 'Floating Text Only',
        floating: floatingLog
      };
      console.log('SELECTED VALUES:', selectedValues);

      await this.previewButton.click();
      await this.page.waitForTimeout(2000);
      await this.closePreview.click();
      await this.saveButton.click();
      await this.confirmPopupButton.click();
      await this.page.click(this.createLink);
      const sendFloating = new SendPage(this.page);
      await sendFloating.selectL2Security();
      await this.identifyLeakersCheckbox.click();
      await expect(this.cipherTextTab).toHaveCSS('pointer-events', 'none');
      await expect(this.floatingTextTab).toHaveCSS('pointer-events', 'auto');
      await generate.validateIdLeakersValues(selectedValues);
      await this.goBackButton.click();
      await generate.IdLeakers(selectedValues);
      await this.page.bringToFront();

      await this.settingsMenu.click();
      await this.accessibilityTab.click();
      await this.contentSecurityTab.click();
    }

    /* ====================================================
       CIPHER + FLOATING
       ==================================================== */

    await this.page.locator('#IDLeakersType').selectOption('Cipher and Floating Text');
    console.log('MODE → CIPHER + FLOATING');
    await expect(this.cipherTextTab).toHaveCSS('pointer-events', 'auto');
    await expect(this.floatingTextTab).toHaveCSS('pointer-events', 'auto');

    const totalIterations = Math.max(cipherIterations, floatingIterations);

    for (let i = 0; i < totalIterations; i++) {

      let cipherLog = {};
      let floatingLog = {};
      let shapeValue = null;

      await this.cipherTextTab.click();
      let cipherPatternValue = null;

      for (const c of cipherDropdowns) {
        if (c.key === 'Shape') continue;

        const value = c.options[i % c.options.length];
        cipherLog[c.key] = value;

        await this.page.locator(c.locator).selectOption({ value });

        if (c.key === 'CipherPattern') cipherPatternValue = value;
      }

      if (cipherPatternValue === '2') {
        const shapeDrop = cipherDropdowns.find(d => d.key === 'Shape');
        shapeValue = shapeDrop.options[i % shapeDrop.options.length];
        await this.page.locator(shapeDrop.locator).selectOption({ value: shapeValue });
      }

      await this.floatingTextTab.click();

      for (const f of floatingDropdowns) {
        const value = f.options[i % f.options.length];
        floatingLog[f.key] = value;

        await this.page.locator(f.locator).selectOption({ value });

        if (f.textboxLocator) {
          await this.page.locator(f.textboxLocator).fill(`Sampleeeee ${value}`);
        }
      }

      const selectedValues = {
        mode: 'Cipher + Floating',
        cipher: cipherLog,
        shape: shapeValue,
        floating: floatingLog
      };
      console.log('SELECTED VALUES:', selectedValues);

      await this.previewButton.click();
      await this.page.waitForTimeout(2000);
      await this.closePreview.click();
      await this.saveButton.click();
      await this.confirmPopupButton.click();

      await this.page.click(this.createLink);
      const sendBoth = new SendPage(this.page);
      await sendBoth.selectL2Security();
      await this.identifyLeakersCheckbox.click();
      await expect(this.cipherTextTab).toHaveCSS('pointer-events', 'auto');
      await expect(this.floatingTextTab).toHaveCSS('pointer-events', 'auto');
      await generate.validateIdLeakersValues(selectedValues);
      await this.goBackButton.click();
      await generate.IdLeakers(selectedValues);
      await this.page.bringToFront();
      await this.settingsMenu.click();
      await this.accessibilityTab.click();
      await this.contentSecurityTab.click();
    }
  }


  async DDSRestore() {
    await this.defaultDocumentSettingsTab.click();
   if(await this.cancelPopupButton.isVisible({timeout: 3000}))
     await this.cancelPopupButton.click();
    else{
    await this.restorebutton.click();
  }
    const ac = await this.accessControl.inputValue();
    expect(ac).toBe('L1');
    await expect(this.bannedregions).toHaveValue("");
    const ip = await this.allowedipaddresses.inputValue();
    expect(ip).toBe('');
    const ld = await this.launchesDropdown.inputValue();
    expect(ld).toBe('0');
    const expiresValue = await this.expires.inputValue();
    expect(expiresValue).toBe('365');
    const rd = await this.restrictToDomains.inputValue();
    expect(rd).toBe('');
    await expect(this.watermark).toHaveValue('0');
    const wm = await this.watermark.inputValue();
    expect(wm).toBe('0');
    await expect(this.maxViewsPerDocument).toHaveValue('');
    await expect(this.maxReadsPerReader).toHaveValue('');
    await expect(this.sideNote).toHaveValue('');

    for (let i = 1; i <= 9; i++) {
      const checkbox = this.page.locator(`(//*[text()='Pre-Select'])[${i}]`);
      await expect(checkbox).not.toBeChecked();
    }
    const radioButtons = [
      this.page.locator("#Disabled_PageLevelRestrictions_common"),
      this.page.locator("#Disabled_SMSAuthentication_common")
    ];
    for (const radioButton of radioButtons) {
      await expect(radioButton).toBeChecked();
    }
    // await this.saveButton.click();
    // await this.confirmPopupButton.click();
  }

  async GeneralRestore() {
    await this.generalTab.click();
    await this.restorebutton.click();
    const df = await this.dateformat.inputValue();
    expect(df).toBe('US: MM/dd/yyyy');
    const tz = await this.timezone.inputValue();
    expect(tz).toBe('(UTC) — Coordinated Universal Time_UTC');
    const sl = await this.serviceLanguageDropdown.inputValue();
    expect(sl).toBe('en-US');
    const al = await this.applanguage.inputValue();
    expect(al).toBe('en-US');
    const lp = await this.landingpage.inputValue();
    expect(lp).toBe('Send');
    // await this.saveButton.click();
    // await this.confirmPopupButton.click();
  }

  async advanceRestore() {
    await this.advanceTab.click();
  if(await this.cancelPopupButton.isVisible({timeout: 3000})
  )  await this.cancelPopupButton.click();
    else{
    await this.restorebutton.click();
    }
    const pl = await this.passwordlength.inputValue();
    expect(pl).toBe('12 Characters');
    await expect(this.trackkilleddocuments).toBeChecked();
    await expect(this.edisclosuredisable).toBeChecked();
    const disabledcheckbox = this.page.locator("//*[@class='ps-0 disabledEDisclosureGroup']");
    await expect(disabledcheckbox).toHaveCount(3);
    await this.saveButton.click();
    await this.confirmPopupButton.click();
    const disabledGroup = this.page.locator("//*[@class='col-sm-5 disabledEDisclosureGroup']");
    await expect(disabledGroup).toBeVisible();
    // await this.saveButton.click();
    // await this.confirmPopupButton.click();
  }

  async contentSecurityRestore() {
    await this.contentSecurityTab.click();

    // Cipher Text Only
    await this.page.locator('#IDLeakersType').selectOption('Cipher Text Only');
    await this.restorebutton.click();
    const ct = await this.cipherTextDropdown.inputValue();
    expect(ct).toBe('0');
    const oc = await this.opacityCipherDropdown.inputValue();
    expect(oc).toBe('1');
    const cv = await this.cipherViewDropdown.inputValue();
    expect(cv).toBe('1');
    const cp = await this.cipherPatternDropdown.inputValue();
    expect(cp).toBe('2');
    const shape = await this.shapeDropdown.inputValue();
    expect(shape).toBe('3');

    // Floating Text Only
    await this.page.locator('#IDLeakersType').selectOption('Floating Text Only');
    await this.floatingTextTab.click();
    await this.restorebutton.click();
    const ft = await this.floatingTextDropdown.inputValue();
    expect(ft).toBe('0');
    const sp = await this.suffixPrefixDropdown.inputValue();
    expect(sp).toBe('0');
    const of = await this.opacityFloatDropdown.inputValue();
    expect(of).toBe('1');
    const nav = await this.navigationDropdown.inputValue();
    expect(nav).toBe('0');
    const fc = await this.fontColorDropdown.inputValue();
    expect(fc).toBe('0');
    const fs = await this.fontSizeDropdown.inputValue();
    expect(fs).toBe('2');
    const speed = await this.speedDropdown.inputValue();
    expect(speed).toBe('1');

     await this.page.locator('#IDLeakersType').selectOption('Cipher and Floating Text');
     await this.cipherTextTab.click();
    await this.restorebutton.click();
    const ct1 = await this.cipherTextDropdown.inputValue();
    expect(ct1).toBe('0');
    const oc1 = await this.opacityCipherDropdown.inputValue();
    expect(oc1).toBe('1');
    const cv1 = await this.cipherViewDropdown.inputValue();
    expect(cv1).toBe('1');
    const cp1 = await this.cipherPatternDropdown.inputValue();
    expect(cp1).toBe('2');
    const shape1 = await this.shapeDropdown.inputValue();
    expect(shape1).toBe('3');
    
    await this.floatingTextTab.click();
    await this.restorebutton.click();
    const ft1 = await this.floatingTextDropdown.inputValue();
    expect(ft1).toBe('0');
    const sp1 = await this.suffixPrefixDropdown.inputValue();
    expect(sp1).toBe('0');
    const of1 = await this.opacityFloatDropdown.inputValue();
    expect(of1).toBe('1');
    const nav1 = await this.navigationDropdown.inputValue();
    expect(nav1).toBe('0');
    const fc1 = await this.fontColorDropdown.inputValue();
    expect(fc1).toBe('0');
    const fs1 = await this.fontSizeDropdown.inputValue();
    expect(fs1).toBe('2');
    const speed1 = await this.speedDropdown.inputValue();
    expect(speed1).toBe('1');
  }

  async DSDRestore() {
    await this.directsendDefaultsTab.click();
   if(await this.cancelPopupButton.isVisible({timeout: 3000}))
     await this.cancelPopupButton.click();
    else {   
    await this.restorebutton.click();   }            //Gateway - protect views
    const sn = await this.sideNote.inputValue();
    expect(sn).toBe('');
    await expect(this.allowResponsesTol1).toBeChecked();
    await expect(this.proofOfSendingl1).toBeChecked();
    const launch = await this.launchesDropdown.inputValue();
    expect(launch).toBe('0');
    const exp = await this.expires.inputValue();
    expect(exp).toBe('365');
    const wm = await this.watermark.inputValue();
    expect(wm).toBe('0');
    const mv = await this.maxViewsPerDocument1.inputValue();
    expect(mv).toBe('');
    await expect(this.timestampl1).toBeChecked();
    await expect(this.canPrintl1).toBeChecked();
    const ip = await this.allowedipaddresses.inputValue();
    expect(ip).toBe('');
    await expect(this.bannedregions).toHaveValue("");
    await expect(this.trackkilleddocumentsl1).toBeChecked();
    await expect(this.edisclosurel1).toBeChecked();

    //Gateway - Control readers 
    await this.controlReaders.click();
    await this.restorebutton.click();
    const sn2 = await this.sideNote.inputValue();
    expect(sn2).toBe('');
    await expect(this.allowResponsesTol2).toBeChecked();
    await expect(this.proofOfSendingl2).toBeChecked();
    await expect(this.distributionListl2).toBeChecked();
    await expect(this.votingl2).toBeChecked();
    await expect(this.shareVotesl2).toBeChecked();
    await expect(this.notificationOfReadingl2).toBeChecked();
    const launch2 = await this.launchesDropdown.inputValue();
    expect(launch2).toBe('0');
    const exp2 = await this.expires.inputValue();
    expect(exp2).toBe('365');
    const rd2 = await this.restrictToDomains.inputValue();
    expect(rd2).toBe('');
    const wm2 = await this.watermark.inputValue();
    expect(wm2).toBe('0');
    const mvr = await this.maxReadsPerReaderl2.inputValue();
    expect(mvr).toBe('');
    const mv2 = await this.maxViewsPerDocument1.inputValue();
    expect(mv2).toBe('');
    await expect(this.timestampl2).toBeChecked();
    await expect(this.canPrintl2).toBeChecked();
    const ip2 = await this.allowedipaddresses.inputValue();
    expect(ip2).toBe('');
    await expect(this.bannedregions).toHaveValue("");
    await expect(this.trackkilleddocumentsl2).toBeChecked();
    await expect(this.textauthenticationl2).toBeChecked();
    await expect(this.edisclosurel2).toBeChecked();

    //Gateway - Restrict readers
    await this.restrictReaders.click();
    await this.restorebutton.click();
    const sn3 = await this.sideNote.inputValue();
    expect(sn3).toBe('');
    await expect(this.allowResponsesTol3).toBeChecked();
    await expect(this.proofOfSendingl3).toBeChecked();
    await expect(this.distributionListl3).toBeChecked();
    await expect(this.votingl3).toBeChecked();
    await expect(this.shareVotesl3).toBeChecked();
    await expect(this.notificationOfReadingl3).toBeChecked();
    const launch3 = await this.launchesDropdown.inputValue();
    expect(launch3).toBe('0');
    const exp3 = await this.expires.inputValue();
    expect(exp3).toBe('365');
    const rd3 = await this.restrictToDomains.inputValue();
    expect(rd3).toBe('');
    const wm3 = await this.watermark.inputValue();
    expect(wm3).toBe('0');
    const mvr3 = await this.maxReadsPerReaderl2.inputValue();
    expect(mvr3).toBe('');
    const mv3 = await this.maxViewsPerDocument1.inputValue();
    expect(mv3).toBe('');
    await expect(this.timestampl3).toBeChecked();
    await expect(this.canPrintl3).toBeChecked();
    const ip3 = await this.allowedipaddresses.inputValue();
    expect(ip3).toBe('');
    await expect(this.bannedregions).toHaveValue("");
    await expect(this.trackkilleddocumentsl3).toBeChecked();
    await expect(this.textauthenticationl3).toBeChecked();
    await expect(this.edisclosurel3).toBeChecked();
    // await this.saveButton.click();
    // await this.confirmPopupButton.click();

    // Select RAPP default settings
    await this.defaultsettingsfor.selectOption("1");
    await this.protectViews.click();
    await this.restorebutton.click();
    const sn4 = await this.sideNote.inputValue();
    expect(sn4).toBe('');
    await expect(this.allowResponsesTol1).toBeChecked();
    await expect(this.proofOfSendingl1).toBeChecked();
    const launch4 = await this.launchesDropdown.inputValue();
    expect(launch4).toBe('0');
    const exp4 = await this.expires.inputValue();
    expect(exp4).toBe('365');
    const wm4 = await this.watermark.inputValue();
    expect(wm4).toBe('0');
    const mv4 = await this.maxViewsPerDocument1.inputValue();
    expect(mv4).toBe('');
    await expect(this.timestampl1).toBeChecked();
    await expect(this.canPrintl1).toBeChecked();
    const ip4 = await this.allowedipaddresses.inputValue();
    expect(ip4).toBe('');
    await expect(this.bannedregions).toHaveValue("");
    await expect(this.trackkilleddocumentsl1).toBeChecked();
    await expect(this.edisclosurel1).toBeChecked();

    // Select RAPP - Control readers
    await this.controlReaders.click();
    await this.restorebutton.click();
    const sn5 = await this.sideNote.inputValue();
    expect(sn5).toBe('');
    await expect(this.allowResponsesTol2).toBeChecked();
    await expect(this.proofOfSendingl2).toBeChecked();
    await expect(this.distributionListl2).toBeChecked();
    await expect(this.votingl2).toBeChecked();
    await expect(this.shareVotesl2).toBeChecked();
    await expect(this.notificationOfReadingl2).toBeChecked();
    const launch5 = await this.launchesDropdown.inputValue();
    expect(launch5).toBe('0');
    const exp5 = await this.expires.inputValue();
    expect(exp5).toBe('365');
    const rd5 = await this.restrictToDomains.inputValue();
    expect(rd5).toBe('');
    const wm5 = await this.watermark.inputValue();
    expect(wm5).toBe('0');
    const mvr5 = await this.maxReadsPerReaderl2.inputValue();
    expect(mvr5).toBe('');
    const mv5 = await this.maxViewsPerDocument1.inputValue();
    expect(mv5).toBe('');
    await expect(this.timestampl2).toBeChecked();
    await expect(this.canPrintl2).toBeChecked();
    const ip5 = await this.allowedipaddresses.inputValue();
    expect(ip5).toBe('');
    await expect(this.bannedregions).toHaveValue("");
    await expect(this.trackkilleddocumentsl2).toBeChecked();
    await expect(this.textauthenticationl2).toBeChecked();
    await expect(this.edisclosurel2).toBeChecked();

    // Select RAPP - Restrict readers
    await this.restrictReaders.click();
    await this.restorebutton.click();
    const sn6 = await this.sideNote.inputValue();
    expect(sn6).toBe('');
    await expect(this.allowResponsesTol3).toBeChecked();
    await expect(this.proofOfSendingl3).toBeChecked();
    await expect(this.distributionListl3).toBeChecked();
    await expect(this.votingl3).toBeChecked();
    await expect(this.shareVotesl3).toBeChecked();
    await expect(this.notificationOfReadingl3).toBeChecked();
    const launch6 = await this.launchesDropdown.inputValue();
    expect(launch6).toBe('0');
    const exp6 = await this.expires.inputValue();
    expect(exp6).toBe('365');
    const rd6 = await this.restrictToDomains.inputValue();
    expect(rd6).toBe('');
    const wm6 = await this.watermark.inputValue();
    expect(wm6).toBe('0');
    const mvr6 = await this.maxReadsPerReaderl2.inputValue();
    expect(mvr6).toBe('');
    const mv6 = await this.maxViewsPerDocument1.inputValue();
    expect(mv6).toBe('');
    await expect(this.timestampl3).toBeChecked();
    await expect(this.canPrintl3).toBeChecked();
    const ip6 = await this.allowedipaddresses.inputValue();
    expect(ip6).toBe('');
    await expect(this.bannedregions).toHaveValue("");
    await expect(this.trackkilleddocumentsl3).toBeChecked();
    await expect(this.textauthenticationl3).toBeChecked();
    await expect(this.edisclosurel3).toBeChecked();
    // await this.saveButton.click();
    // await this.confirmPopupButton.click();


  }
}