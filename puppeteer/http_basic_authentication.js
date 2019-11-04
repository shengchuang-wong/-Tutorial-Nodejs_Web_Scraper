const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    // devtools: true
  });
  const page = await browser.newPage();

  await page.authenticate({ username: 'admin', password: 'password' });
  await page.goto('https://httpbin.org/basic-auth/admin/password');

  await browser.close();
})();