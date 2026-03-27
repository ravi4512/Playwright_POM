import { LoginPage } from "../Pages/login";
import { test } from '@playwright/test';
import { launchBrowser } from '../Utils/browser.js';
import { PerformancePage } from "../Pages/performance.js";



test('Performance test', async () => {
  const { page } = await launchBrowser();
  const login = new LoginPage(page);
  const performance = new PerformancePage(page);
 // await login.stagingLogin();
  //    await login.productionLogin();
   //    await login.stagingSSOLogin();
      await login.prodSSOLogin();

  // 5KB - 5 Pages
  for (let i = 1; i <= 3; i++) {
    console.log(`******** Metrics for 5 KB - 5 Pages document - iteration  ${i} *******`);
    await performance.performance("../../Files/Demo.pdf", "5KB - 5 pages");
  }

  // 127 KB - 97 Pages
  for (let i = 1; i <= 3; i++) {
    console.log(`******** Metrics for 127 KB - 97 Pages document - iteration  ${i}  *******`);
    await performance.performance("../../Files/100 pages.docx", "127KB - 97 pages");
  }

  //297 KB - 2 Pages
  for (let i = 1; i <= 3; i++) {
    console.log(`******** Metrics for 297 KB - 2 Pages document - iteration  ${i}  *******`);
    await performance.performance("../../Files/Do.pdf", "297KB - 2 pages");
  }

  // 5 MB - 61 Pages
  for (let i = 1; i <= 3; i++) {
    console.log(`******** Metrics for 5 MB - 61 Pages document - iteration  ${i}  *******`);
    await performance.performance("../../Files/5MB.pptx", "5MB - 61 pages");
  }

  // 10 MB - 113 Pages
  for (let i = 1; i <= 3; i++) {
    console.log(`******** Metrics for 10 MB - 113 Pages document - iteration  ${i}  *******`);
    await performance.performance("../../Files/10MB.pptx", "10MB - 113 pages");
  }

  // 15 MB - 154 Pages
  for (let i = 1; i <= 3; i++) {
    console.log(`******** Metrics for 15 MB - 154 Pages document - iteration  ${i}  *******`);
    await performance.performance("../../Files/15MB.pptx", "15MB - 154 pages");
  }     

  // 20 MB - 218 Pages
  for (let i = 1; i <= 3; i++) {
    console.log(`******** Metrics for 20 MB - 218 Pages document - iteration  ${i}  *******`);
    await performance.performance("../../Files/20MB.pptx", "20MB - 218 pages");
  }

  })

  // 25 MB - 232 Pages
  // for (let i = 1; i <= 3; i++) {
  //   console.log(`******** Metrics for 25 MB - 232 Pages document - iteration  ${i}  *******`);
  //   await performance.performance("../../Files/25MB.pptx", "25MB - 232 pages");
  // }

