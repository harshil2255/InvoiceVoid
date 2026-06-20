const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 393, height: 852, isMobile: true });
  await page.goto('http://localhost:5173/dashboard', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: 'mobile-test-dashboard.png' });
  await browser.close();
})();
