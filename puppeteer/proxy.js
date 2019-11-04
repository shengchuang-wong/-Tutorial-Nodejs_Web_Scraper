const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    // please do not use pubic proxy server for any sensitive data
    args: ['--proxy-server=223.204.70.152:8080']
  });

  const page = await browser.newPage();
  await page.goto('https://httpbin.org/ip');

  // await browser.close();
})();