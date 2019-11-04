const puppeteer = require('puppeteer');

// (async () => {
//   const browser = await puppeteer.launch({
//     headless: false,
//     // devtools: true
//   });
//   const page = await browser.newPage();
//   await page.goto('https://google.com');
//   await page.type('#tsf > div:nth-child(2) > div.A8SBwf > div.RNNXgb > div > div.a4bIc > input', 'Udemy Tutorials', {delay: 100});
//   await page.keyboard.press('Enter');
//   await page.waitForNavigation();
  
//   await page.screenshot({path: 'example.png'});

//   await browser.close();
// })();

(async () => {

  // 1. Creating a PDF from the website
  // const browser = await puppeteer.launch({ headless: true });
  // const page = await browser.newPage();
  // await page.goto('https://learnscraping.com');
  // await page.pdf({
  //   path: './page.pdf',
  //   format: 'A4'
  // });

  // await browser.close()

  // 2. Getting the URL or the Title of the current page
  // const browser = await puppeteer.launch({ headless: false });
  // const page = await browser.newPage();
  // await page.goto('https://learnscraping.com');

  // let title = await page.title();
  // console.log(`Title of the page is ${title}`);

  // let url = await page.url();
  // console.log(`URL of the page is ${url}`)

  // await browser.close()

  // 3. Emulate a phone
  // const devices = require('puppeteer/DeviceDescriptors');

  // const browser = await puppeteer.launch({ headless: false });
  // const page = await browser.newPage();
  // await page.emulate(devices['iPhone X']);

  // await page.goto('https://learnscraping.com');

  // await browser.close()

})();