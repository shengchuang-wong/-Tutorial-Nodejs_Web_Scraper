const puppeteer = require('puppeteer');

let browser = null;
let page = null;

// Constants
const BASE_URL = 'https://amazon.com/'

const amazon = {
  initialize: async () => {
    console.log('Starting the scrapper...');
    browser = await puppeteer.launch({
      headless: false
    })

    page = await browser.newPage();
    page.on('console', message => {
      console.log(`Message from browser: ${message.text()}`);
    })

    await page.goto(BASE_URL, { waitUntil: 'networkidle2' });
    console.log('Initialization completed.');
  },
  getProductDetails: async (link) => {
    console.log(`Going to product page.. ( ${link} )`);

    await page.goto(link, { waitUntil: 'networkidle2' });

    let details = await page.evaluate(() => {
        return {
          title: document.querySelector('#productTitle').textContent.trim(),
          manufacturer: document.querySelector('#bylineInfo').textContent.trim(),
          price: document.querySelector('#priceblock_ourprice,#priceblock_dealprice').textContent.trim(),
          rating: document.querySelector('.a-icon-alt').textContent.trim(),
          totalRating: document.querySelector('div[data-hook="total-review-count"] span').textContent.trim(),
        }
    });

    return details;
  },
  end: async () => {
    console.log('Stopping the scrapper...');
    await browser.close();
  }
}

module.exports = amazon;