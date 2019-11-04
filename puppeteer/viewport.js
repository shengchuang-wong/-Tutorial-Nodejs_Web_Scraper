const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    ignoreHTTPSErrors: true, // to ignore any https errors
    defaultViewport: {
      // by default its 800 x 600
      width: 1920,
      height: 1080
    }
  });
  const page = await browser.newPage();

  await page.goto('https://google.com');

  // await browser.close();
})();